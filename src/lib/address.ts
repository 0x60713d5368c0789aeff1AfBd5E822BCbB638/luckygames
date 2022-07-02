import { useWallet } from './wallet'

// EDIT

export const Params = {
  // CD: 86400,
  // rankCD: 86400,
  // rankOffset: 50400,
  CD: 120,
  rankCD: 1800,
  rankOffset: 0,
}

export const AddressesMainnet = {
  Fdao: '0xa56E678acE0a15Beb98C493DbB4eC626d58b8F1E',
  Lucky: '0x64b6F0bd9411f8DC0790F75d0ddD6Db3557D8f9f',
  Pool: '0x5F0c44393f193525cBF6e33fFDe3266d16F90Caf',
  Rank: '0x4eA04D62379D1DA8F513270dE2b7AE17186aA70d',
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
