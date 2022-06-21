import Decimal from 'decimal.js'
import useSWR from 'swr'
import { toDecimal } from './utils'
import { useWallet } from './wallet'

export const useBurn = () => {
  const {
    Contracts: { buyer },
  } = useWallet()

  const fetcher = async () => {
    const resp = await buyer.info()
    return {
      balance: toDecimal(resp.balance),
      auto: {
        fdao: toDecimal(resp.autoBurnedFdao),
        bnb: toDecimal(resp.autoBurnedBnb),
      },
      manual: {
        fdao: toDecimal(resp.manualBurnedFdao),
        bnb: toDecimal(resp.manualBurnedBnb),
      },
    }
  }

  const { data } = useSWR(`${buyer.address}/info`, fetcher)

  return (
    data ?? {
      balance: new Decimal(0),
      auto: {
        fdao: new Decimal(0),
        bnb: new Decimal(0),
      },
      manual: {
        fdao: new Decimal(0),
        bnb: new Decimal(0),
      },
    }
  )
}
