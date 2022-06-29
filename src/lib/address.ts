import { useWallet } from './wallet'

// EDIT
export const AddressesMainnet = {
  Fdao: '0xa56E678acE0a15Beb98C493DbB4eC626d58b8F1E',
  Lucky: '0x73Ff620fD6DaCD45E46243762B3DCe7a9d343b37',
  Pool: '0x0d83F787F258621C339c371503B5aee70367A437',
  Rank: '0x08C908457030d058Dc489610fe5c8c7C9CacED98',
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
