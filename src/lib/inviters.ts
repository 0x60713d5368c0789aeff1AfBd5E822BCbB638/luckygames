import { ethers } from 'ethers'
import useSWR, { mutate } from 'swr'
import { getErrorMsg } from './utils'
import { useWallet } from './wallet'

export const useInviters = () => {
  const {
    Contracts: { inviters },
    address,
    signer,
    connect,
  } = useWallet()

  const inviterFetcher = async () => {
    const resp = await inviters.inviters(address ?? '')
    if (resp == ethers.constants.AddressZero) {
      return undefined
    }
    return resp
  }

  const { data: inviter } = useSWR(address ? `${inviters.address}/inviters/${address}` : null, inviterFetcher)

  const invitedFetcher = async () => {
    return await inviters.invited(address ?? '').then((i) => i.toNumber())
  }

  const { data: invited } = useSWR(address ? `${inviters.address}/invited/${address}` : null, invitedFetcher)

  const setInviter = async (account: string) => {
    account = account.trim()
    if (!ethers.utils.isAddress(account)) return Promise.reject('invalid address')
    if (!signer) await connect()
    if (!signer) return Promise.reject('no wallet')
    const writeable = inviters.connect(signer)
    const tx = await writeable.setInviter(account).catch(getErrorMsg)
    const receipt = await tx.wait()
    mutate(`${inviters.address}/inviters/${address}`)
    return receipt
  }

  return {
    inviter,
    invited: invited ?? 0,
    setInviter,
  }
}
