import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from './wallet'

export const useInvited = (page: number) => {
  const {
    Contracts: { lucky },
    address,
  } = useWallet()
  const fetcher = async (url: string) => {
    const parts = url.split('/')
    const p = parts[parts.length - 1]
    const resp = await lucky.getInvitedUsers(address ?? ethers.constants.AddressZero, p)
    return resp
  }

  const { data } = useSWR(`${lucky.address}/getInvitedUsers/${address}/${page}`, fetcher)

  return data ?? []
}
