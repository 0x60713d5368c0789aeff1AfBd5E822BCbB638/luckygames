import Decimal from 'decimal.js'
import { BigNumber, ethers } from 'ethers'
import { useCallback, useMemo } from 'react'
import useSWR, { mutate } from 'swr'
import { useAddress } from './address'
import { getErrorMsg, toDecimal } from './utils'
import { useWallet } from './wallet'

export const useMint = () => {
  const {
    Contracts: { tierMint },
    address,
    signer,
    connect,
  } = useWallet()

  // EDIT
  const finalRound = 359
  const finalTotal = '3945'
  // const finalBNB = '0.01333970111'
  const finalBNB = '1333.970111'
  const roundDiff = '245'
  const PRECISION = ethers.utils.parseEther('1') // 1e18

  const Addresses = useAddress()

  const fetcher = async () => {
    return await tierMint.info(address ?? '')
  }

  const { data } = useSWR(address ? `${tierMint.address}/info/${address}` : null, fetcher)

  const getFdaoOutput = useCallback(
    (bnb: string) => {
      if (!data || !bnb || data.round.toNumber() > finalRound) {
        return {
          output: new Decimal(0),
          price: new Decimal(0),
        }
      }
      let input = ethers.utils.parseEther(bnb)
      let isStop = false
      let { remain, price, total, bnbAmount } = { ...data }
      let round = data.round.toNumber()
      let output = BigNumber.from(0)
      while (!isStop && remain.mul(price).div(PRECISION).lte(input)) {
        round += 1
        output = output.add(remain)
        input = input.sub(remain.mul(price).div(PRECISION))
        if (round > finalRound) {
          isStop = true
          continue
        }
        if (round == finalRound) {
          total = ethers.utils.parseEther(finalTotal)
          bnbAmount = ethers.utils.parseEther(finalBNB)
        } else {
          total = total.sub(ethers.utils.parseEther(roundDiff))
          bnbAmount = bnbAmount.mul(102).div(100)
        }
        remain = total
        price = bnbAmount.mul(PRECISION).div(total)
      }
      if (!isStop) {
        output = output.add(input.mul(PRECISION).div(price))
      }
      return {
        output: toDecimal(output),
        price: toDecimal(output).div(bnb),
      }
    },
    [data]
  )

  const info = useMemo(() => {
    const getRate = (remain?: BigNumber, total?: BigNumber) => {
      if (!total || !remain || total.isZero()) return 0
      return total.sub(remain).mul(100).div(total).toNumber()
    }
    const price =
      data?.bnbAmount.gt(0) && data.round.toNumber() < 360 ? toDecimal(data?.total).div(toDecimal(data.bnbAmount)) : new Decimal(0)
    const current = {
      round: data?.round.toNumber() ?? 0,
      price,
      rate: getRate(data?.remain, data?.total),
    }
    if (current.round > finalRound) {
      current.round = finalRound
      current.rate = 100
    }
    const ret = {
      balance: toDecimal(data?.balance),
      current,
      next: undefined,
      totalMintBonus: toDecimal(data?.mintBonus),
      totalBuyBonus: toDecimal(data?.buyBonus),
    }
    if (current.round + 1 > finalRound) {
      return ret
    }
    if (current.round + 1 == finalRound) {
      return {
        ...ret,
        next: {
          round: finalRound,
          price: new Decimal(finalTotal).div(finalBNB),
          rate: 0,
        },
      }
    }
    const bnb = toDecimal(data?.bnbAmount.mul(102).div(100))
    return {
      ...ret,
      next: {
        round: current.round + 1,
        price: bnb.isZero() ? new Decimal(0) : toDecimal(data?.total.sub(ethers.utils.parseEther(roundDiff))).div(bnb),
        rate: 0,
      },
    }
  }, [data])

  const mint = async (bnb: string) => {
    if (!signer) await connect()
    if (!signer) throw 'no wallet'

    const writeable = tierMint.connect(signer)
    const tx = await writeable.tierMint({ value: ethers.utils.parseEther(bnb) }).catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate(`${tierMint.address}/info/${address}`)
    mutate(`getBalance/${address}`)
    mutate(`${Addresses.Fdao}/balanceOf/${address}`)
    mutate(`${Addresses.Fomo}/info/${address}`)
    return receipt
  }

  return {
    ...info,
    getFdaoOutput,
    mint,
  }
}
