import { useWallet } from './wallet'

// EDIT

export const Params = {
  // CD: 86400,
  // rankCD: 86400,
  CD: 120,
  rankCD: 1800,
}

export const AddressesMainnet = {
  Fdao: '0xa56E678acE0a15Beb98C493DbB4eC626d58b8F1E',
  Lucky: '0xD82DfA646E1AC85fd5052CF5A04aE1d43149Ba56',
  Pool: '0x69Ea72460D68a0FB14b12cDf7976087E8603F3e3',
  Rank: '0x654B91c7F9216FAA91F7abF10dd4AC797B4E5179',
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
