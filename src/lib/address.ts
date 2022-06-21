import { useWallet } from './wallet'

// EDIT
export const AddressesMainnet = {
  Fomo: '',
  TierMint: '',
  Inviters: '0x83048F0182FBd3845eff1AfBd5F4D2BDe3f03328',
  Fdao: '',
  Buyer: '',
}

export const AddressesTestnet = {
  Fomo: '0xf72393176CE5423a703b095600c23ccA790f4419',
  TierMint: '0x7Eb5d36284B46D29440196ba1F74B2DdE6f95054',
  Inviters: '0x2a5480c25649aAe2058e9701dBBe0c1e187C9FD7',
  Fdao: '0x8c48355548890c0Cb973aCbBCf4ce5b5B8c85b66',
  Buyer: '0xe64d3fe8daC38E035206f16e28fBF62cd92C076F',
}

export const useAddress = () => {
  const { chainId } = useWallet()
  return chainId == 56 ? AddressesMainnet : AddressesTestnet
}
