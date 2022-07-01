import Decimal from 'decimal.js'
import { ethers } from 'ethers'
import { useEffect } from 'react'
import useSWR, { mutate as globalMutate } from 'swr'
import { useAddress } from './address'
import { getErrorMsg, toDecimal } from './utils'
import { useWallet } from './wallet'

export const usePool = () => {
  const {
    Contracts: { pool },
    address,
    signer,
    connect,
  } = useWallet()

  const Addresses = useAddress()

  const fetcher = async () => {
    const resp = await pool.status(address ?? ethers.constants.AddressZero)
    return {
      balance: toDecimal(resp.balance),
      income: resp.pos.toNumber() > 0 ? toDecimal(resp.estimateBonus) : new Decimal(0),
      isClosed: resp.isClosed,
    }
  }

  const { data, mutate } = useSWR(`${pool.address}/status/${address}`, fetcher)

  const claim = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = pool.connect(signer)
    const tx = await writeable.claim().catch(getErrorMsg)
    const receipt = await tx.wait().catch(getErrorMsg)
    mutate()
    globalMutate(`${Addresses.Fdao}/balanceOf/${address}`)
    return receipt
  }

  return {
    ...(data ?? {
      balance: new Decimal(0),
      income: new Decimal(0),
      isClosed: false,
    }),
    claim,
  }
}
