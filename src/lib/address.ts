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
  Lucky: '0xF6B1Cc75873E399C5887D3cfE7908264B822f7Db',
  Pool: '0x9f5DDDd775458a2E045BA8E783AD25682e2E37eb',
  Rank: '0x53C0eB6eCd7Ee2AA2552C29E93f4a5f723d4Bf59',
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
