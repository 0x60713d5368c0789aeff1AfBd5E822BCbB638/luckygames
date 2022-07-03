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
  Lucky: '0x549FA62aCDfe7545d2e416e26A89c9ebe4fFDb21',
  Pool: '0x6671eDB406422e19336c838C0AC27B1097c6d258',
  Rank: '0x38Ee5eb895529a291c426Bf4d3EdDff7ab6b57c2',
}

// export const AddressesMainnet = {
//   Fdao: '0x7371f453a20B18D21c9D0DabE822BC417408aB02',
//   Lucky: '0xeFa24A2430bdBc2389456A0c6b79793ae39a820F',
//   Pool: '0xA937544eF400d2b8595aA24F9fAbDFd78D717220',
//   Rank: '0x63CC97fEa84b5ee7011EEc243099C1863789C74E',
// }

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
