import { useWallet } from './wallet'

// EDIT
export const AddressesMainnet = {
  Fdao: '0xa56E678acE0a15Beb98C493DbB4eC626d58b8F1E',
  Lucky: '0xcBd7e6EbCadB0f270fff2E05695D6F6A22fCBAae',
  Pool: '0x4A5C359C8beecE72B682fE21D1547dde63A08132',
  Rank: '0x6CFb42393bFEbE6E7Bbae305de0F8658F7e26052',
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
