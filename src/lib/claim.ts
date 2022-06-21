import Decimal from 'decimal.js'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import useSWR, { mutate } from 'swr'
import { useAddress } from './address'
import { useFomo } from './fomo'
import { useInviters } from './inviters'
import { useMint } from './mint'
import { getErrorMsg, toDecimal } from './utils'
import { useWallet } from './wallet'

export const useClaim = () => {
  const {
    Contracts: { tierMint, fomo, inviters },
    address,
    signer,
    connect,
  } = useWallet()
  const Addresses = useAddress()

  // EDIT
  const _today = () => {
    // return (((Date.now() / 1000) << 0) / 60) << 0
    return (((Date.now() / 1000) << 0) / 86400) << 0
  }

  const fetcher = async () => {
    const resp = await tierMint.getTiers(address ?? '')
    let totalMint = BigNumber.from(0)
    let pending = BigNumber.from(0)
    let remain = BigNumber.from(0)
    const today = _today()
    for (let tier of resp) {
      totalMint = totalMint.add(tier.amount)
      const day = today > tier.endDay.toNumber() ? tier.endDay.toNumber() : today
      const diff = day > tier.lastHarvestDay.toNumber() ? day - tier.lastHarvestDay.toNumber() : 0
      pending = pending.add(tier.amount.mul(diff).div(300))
      remain = remain.add(tier.amount.mul(tier.endDay.toNumber() - day).div(300))
    }
    return {
      totalMint: toDecimal(totalMint),
      pending: toDecimal(pending),
      remain: toDecimal(remain),
      released: toDecimal(totalMint.sub(remain)),
    }
  }

  const { data } = useSWR(address ? `${tierMint.address}/getTiers/${address}` : null, fetcher)

  const claim = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = tierMint.connect(signer)
    const tx = await writeable.harvest().catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate(`${tierMint.address}/getTiers/${address}`)
    mutate(`${Addresses.Fdao}/balanceOf/${address}`)
    return receipt
  }

  const fomoClaim = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = fomo.connect(signer)
    const tx = await writeable.harvest().catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate(`${fomo.address}/info/${address}`)
    mutate(`getBalance/${address}`)
    return receipt
  }

  const fomoInfo = useFomo()

  const fomoStatus = useMemo(() => {
    let prize = new Decimal(0)
    if (fomoInfo.lastTime > 0) {
      const ts = (Date.now() / 1000) << 0
      if (ts - fomoInfo.lastTime >= fomoInfo.countdown && fomoInfo.amount.gt(0)) {
        prize = fomoInfo.value.mul(fomoInfo.amount).div(fomoInfo.total)
      }
    }
    const weight = fomoInfo.total.isZero() ? new Decimal(0) : fomoInfo.amount.div(fomoInfo.total)
    return {
      prize,
      amount: fomoInfo.amount,
      weight: weight.mul(100),
      projected: fomoInfo.value.mul(weight),
    }
  }, [fomoInfo])

  const inviter = useInviters()
  const { totalBuyBonus, totalMintBonus } = useMint()

  return {
    ...(data ?? {
      totalMint: new Decimal(0),
      pending: new Decimal(0),
      remain: new Decimal(0),
      released: new Decimal(0),
    }),
    claim,
    fomoStatus,
    fomoClaim,
    ...inviter,
    totalBuyBonus,
    totalMintBonus,
  }
}
