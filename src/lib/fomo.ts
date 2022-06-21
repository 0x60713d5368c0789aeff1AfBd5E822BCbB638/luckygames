import Decimal from 'decimal.js'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useAddress } from './address'
import { useBalance } from './balance'
import { toDecimal } from './utils'
import { useWallet } from './wallet'

export const useFomo = () => {
  const {
    Contracts: { fomo, fdao },
    address,
  } = useWallet()

  // EDIT
  const countdown = 72 * 3600
  // const countdown = 2 * 3600

  const fetcher = async () => {
    const resp = await fomo.info(address ?? '')
    return {
      value: toDecimal(resp.value),
      lastTime: resp.lastTime.toNumber(),
      total: toDecimal(resp.total),
      amount: toDecimal(resp.amount),
    }
  }

  const { data } = useSWR(address ? `${fomo.address}/info/${address}` : null, fetcher)
  const Addresses = useAddress()
  const burned = useBalance(fdao, '0x000000000000000000000000000000000000dead')
  const tierMintBalance = useBalance(fdao, Addresses.TierMint)
  const totalSupply = new Decimal('21000000')
  const circleSupply = useMemo(() => {
    if (!burned || !tierMintBalance) {
      return new Decimal(0)
    }
    return totalSupply.sub(burned).sub(tierMintBalance)
  }, [burned, tierMintBalance])

  return {
    ...(data ?? {
      value: new Decimal(0),
      lastTime: 0,
      total: new Decimal(0),
      amount: new Decimal(0),
    }),
    burned: burned ?? new Decimal(0),
    tierMintBalance: tierMintBalance ?? new Decimal(0),
    circleSupply,
    totalSupply,
    countdown,
  }
}
