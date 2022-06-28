import Decimal from 'decimal.js'
import { ethers } from 'ethers'
import useSWR from 'swr'
import { toDecimal } from './utils'
import { useWallet } from './wallet'

export const useRank = () => {
  const {
    Contracts: { rank },
    address,
  } = useWallet()

  const fetcher = async () => {
    const resp = await rank.status(address ?? ethers.constants.AddressZero)
    return {
      lastRound: resp.last
        .filter((a) => a.count.toNumber() > 0)
        .map((a) => ({
          user: a.user,
          count: a.count.toNumber(),
        })),
      thisRound: resp.current
        .filter((a) => a.count.toNumber() > 0)
        .map((a) => ({
          user: a.user,
          count: a.count.toNumber(),
        })),
      invitedInRound: resp.info.invitedInRound.toNumber(),
      invited: resp.info.invited.toNumber(),
      totalReward: toDecimal(resp.info.totalReward),
    }
  }

  const { data } = useSWR(`${rank.address}/status/${address}`, fetcher)

  return (
    data ?? {
      lastRound: [],
      thisRound: [],
      invitedInRound: 0,
      invited: 0,
      totalReward: new Decimal(0),
    }
  )
}
