import Decimal from 'decimal.js'
import { BigNumber } from 'ethers'

export const toDecimal = (d: BigNumber | undefined) => {
  return new Decimal(d?.toString() ?? 0).div(10 ** 18)
}

const revertPrefix = 'VM Exception while processing transaction: revert '
const reasonPrefix = 'Error: VM Exception while processing transaction: reverted with custom error'
const reasonPrefix2 = 'Error: VM Exception while processing transaction: reverted with reason string'
export const getErrorMsg = (err: any) => {
  if (typeof err?.reason == 'string') {
    const msg = err.reason
    if (msg.startsWith(reasonPrefix)) {
      throw 'Error: ' + msg.slice(reasonPrefix.length)
    }
    if (msg.startsWith(reasonPrefix2)) {
      throw 'Error: ' + msg.slice(reasonPrefix2.length)
    }
    throw msg
  }
  if (typeof err?.data?.message == 'string') {
    const msg = err.data.message as string
    if (msg.startsWith(revertPrefix)) {
      throw msg.slice(revertPrefix.length)
    }
    throw msg
  }
  const msg: string = err?.message?.toString() ?? err?.data?.message?.toString() ?? err?.toString() ?? ('unknown error' as string)
  throw msg.length > 100 ? 'error' : msg
}
