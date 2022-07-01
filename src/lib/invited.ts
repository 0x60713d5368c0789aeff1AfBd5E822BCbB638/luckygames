import { ethers } from 'ethers'
import useSWR from 'swr'
import { useWallet } from './wallet'

export const useInvited = (page: number) => {
  const {
    Contracts: { lucky },
    address,
  } = useWallet()
  const fetcher = async () => {
    const resp = await lucky.getInvitedUsers(address ?? ethers.constants.AddressZero, page)
    return resp
  }

  const { data } = useSWR(address ? `${lucky.address}/getInvitedUsers/${address}/${page}` : null, fetcher)

  return data ?? []
}
