import Decimal from 'decimal.js'
import useSWR from 'swr'
import { ERC20 } from './typechain'
import { toDecimal } from './utils'
import { useWallet } from './wallet'

export const useBalance = (token: ERC20, account?: string) => {
  const fetcher = async () => {
    const bal = await token.balanceOf(account ?? '', { from: account })
    return toDecimal(bal)
  }
  const { data } = useSWR(account ? `${token.address}/balanceOf/${account}` : null, fetcher)
  return data
}

export const useBnbBalance = (account?: string) => {
  const { provider } = useWallet()
  const fetcher = async () => {
    const bal = await provider.getBalance(account ?? '')
    return toDecimal(bal)
  }
  const { data } = useSWR(account ? `getBalance/${account}` : null, fetcher)
  return data ?? new Decimal(0)
}
