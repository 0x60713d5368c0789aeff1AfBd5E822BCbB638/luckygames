import Decimal from 'decimal.js'
import { ethers } from 'ethers'
import useSWR, { mutate as globalMutate } from 'swr'
import { useAddress } from './address'
import { useApprove } from './approve'
import { getErrorMsg, toDecimal } from './utils'
import { useWallet } from './wallet'

export const useLucky = () => {
  const {
    Contracts: { lucky },
    signer,
    address,
    connect,
  } = useWallet()

  const Addresses = useAddress()

  const fetcher = async () => {
    const resp = await lucky.status(address ?? ethers.constants.AddressZero)
    return {
      income: toDecimal(resp.info.income),
      dividends: toDecimal(resp.info.dividends),
      bonus: toDecimal(resp.info.bonus),
      totalDividends: toDecimal(resp.info.totalDividends),
      totalBonus: toDecimal(resp.info.totalBonus),
      totalPay: toDecimal(resp.info.totalPay),
      invited: resp.invited.toNumber(),
      burned: toDecimal(resp.burned),
      balance: toDecimal(resp.balance),
    }
  }

  const { data, mutate } = useSWR(`${lucky.address}/status/${address}`, fetcher)

  const join = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = lucky.connect(signer)
    const tx = await writeable.join().catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate()
    globalMutate(`${Addresses.Pool}/status/${address}`)
    globalMutate(`${Addresses.Rank}/status/${address}`)
    globalMutate(`${Addresses.Fdao}/balanceOf/${address}`)
    globalMutate(`${Addresses.Fdao}/balanceOf/${Addresses.Rank}`)
    return receipt
  }

  const active = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = lucky.connect(signer)
    const tx = await writeable.active().catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate()
    globalMutate(`${Addresses.Fdao}/balanceOf/${address}`)
    globalMutate(`${Addresses.Fdao}/balanceOf/${Addresses.Rank}`)
    return receipt
  }

  const claim = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = lucky.connect(signer)
    const tx = await writeable.harvest().catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate()
    globalMutate(`${Addresses.Fdao}/balanceOf/${address}`)
    return receipt
  }

  return {
    ...(data ?? {
      income: new Decimal(0),
      dividends: new Decimal(0),
      bonus: new Decimal(0),
      totalDividends: new Decimal(0),
      totalBonus: new Decimal(0),
      totalPay: new Decimal(0),
      invited: 0,
      burned: new Decimal(0),
      balance: new Decimal(0),
    }),
    join,
    active,
    claim,
  }
}
