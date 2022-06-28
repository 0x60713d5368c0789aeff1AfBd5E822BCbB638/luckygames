import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ERC20 } from './typechain'
import { getErrorMsg } from './utils'
import { useWallet } from './wallet'

export const useApprove = (token: ERC20, spender: string, owner?: string) => {
  const { signer, connect } = useWallet()
  const [approved, setApproved] = useState(false)
  const fetcher = async (): Promise<boolean> => {
    const a: ethers.BigNumber = await token.allowance(owner ?? '', spender, { from: owner })
    return !a.isZero()
  }
  const { data, mutate } = useSWR(!approved && owner ? `approve:${token}-${owner}-${spender}` : null, fetcher)
  useEffect(() => {
    if (data === true) {
      setApproved(true)
    }
  }, [data])
  const approve = async () => {
    if (!signer) await connect()
    if (!signer) return Promise.reject('wallet not connected')
    const writeable = token.connect(signer)
    const tx = await writeable.approve(spender, ethers.constants.MaxUint256).catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate()
    return receipt
  }

  return {
    approved,
    approve,
  }
}
