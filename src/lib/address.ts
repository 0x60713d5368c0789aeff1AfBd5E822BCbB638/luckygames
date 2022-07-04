import { useWallet } from './wallet'

// EDIT

export const Params = {
  CD: 86400,
  rankCD: 86400,
  offset: 50400,
  // CD: 120,
  // rankCD: 1800,
  // offset: 0,
}

export const AddressesMainnet = {
  Fdao: '0x7371f453a20B18D21c9D0DabE822BC417408aB02',
  Lucky: '0x0D224dc00F86Be876637AdbDb164269B6E1A1Eb4',
  Pool: '0x22Ea9D99d1bc81EC1825e3F00e63046Fb829AD80',
  Rank: '0x3C0ce68c30064D0bFb9C2Eb2Df9aAaA1282A5298',
}

export const AddressesTestnet = {
  Lucky: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  Pool: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  Rank: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  Fdao: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
}

export const useAddress = () => {
  const { chainId } = useWallet()
  return chainId == 56 ? AddressesMainnet : AddressesTestnet
}
