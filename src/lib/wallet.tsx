import detectEthereumProvider from '@metamask/detect-provider'
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ExternalProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import ABI from './abis'
import { ERC20, Fomo, Inviters, TierMint } from './typechain'
import { AddressesMainnet, AddressesTestnet } from './address'
import { Buyer } from './typechain/Buyer'

interface IWalletContext {
  address?: string
  connect: () => Promise<boolean>
  disconnect: () => void
  signer?: JsonRpcSigner
  Contracts: {
    fdao: ERC20
    fomo: Fomo
    inviters: Inviters
    tierMint: TierMint
    buyer: Buyer
  }
  provider: ethers.providers.Provider
  chainId: number
}

const WalletContext = createContext<IWalletContext>({
  connect: () => Promise.reject('not init'),
  disconnect: () => {},
  Contracts: {
    fdao: {} as ERC20,
    fomo: {} as Fomo,
    inviters: {} as Inviters,
    tierMint: {} as TierMint,
    buyer: {} as Buyer,
  },
  provider: ethers.getDefaultProvider(),
  chainId: 56,
})

interface WalletProviderProps {
  name: string
  chainId?: 56 | 97 | 31337
  chainUrl?: string
}

const chains = {
  56: {
    name: 'Binance Smart Chain Mainnet',
    url: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com/',
  },
  97: {
    name: 'BSC Testnet',
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorer: 'https://testnet.bscscan.com/',
  },
  31337: {
    name: 'Hardhat',
    url: 'http://localhost:8545',
    explorer: '',
  },
}

export const WalletProvider: FC<WalletProviderProps> = ({ children, name, chainId = 56 }) => {
  const connecting = useRef(false)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined)
  const provider = useMemo(() => {
    if (signer !== undefined) {
      return signer.provider
    }
    return new ethers.providers.StaticJsonRpcProvider(chains[chainId].url, { name: 'bsc', chainId })
  }, [chainId, signer])

  const handleAccountsChanged = async (accounts: Array<string>) => {
    if (accounts.length == 0) {
      return window.location.reload()
    }
    setAddress(accounts[0])
    setSigner((s) => s?.provider.getSigner(accounts[0]))
  }

  const Addresses = chainId == 56 ? AddressesMainnet : AddressesTestnet

  // init contracts
  const Contracts = useMemo(() => {
    return {
      fdao: new ethers.Contract(Addresses.Fdao, ABI.ERC20, provider) as ERC20,
      fomo: new ethers.Contract(Addresses.Fomo, ABI.Fomo, provider) as Fomo,
      inviters: new ethers.Contract(Addresses.Inviters, ABI.Inviters, provider) as Inviters,
      tierMint: new ethers.Contract(Addresses.TierMint, ABI.TierMint, provider) as TierMint,
      buyer: new ethers.Contract(Addresses.Buyer, ABI.Buyer, provider) as Buyer,
    }
  }, [provider, Addresses])

  const connect = useCallback(async () => {
    const dp = (await detectEthereumProvider()) as (ExternalProvider & { on: Function }) | null
    if (!dp?.request) return false
    await dp.request({ method: 'eth_requestAccounts' })
    let provider = new Web3Provider(dp)
    const network = await provider.getNetwork()
    if (network.chainId !== chainId) {
      try {
        await dp.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + chainId.toString(16) }],
        })
      } catch (err) {
        if ((err as any).code === 4902) {
          await dp.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x' + chainId.toString(16),
                chainName: chains[chainId].name,
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: [chains[chainId].url],
                blockExplorerUrls: [chains[chainId].explorer],
              },
            ],
          })
        } else {
          return false
        }
      }
      provider = new Web3Provider(dp)
    }
    const accounts = await provider.listAccounts()
    if (!accounts[0]) return false
    setAddress(accounts[0])
    setSigner(provider.getSigner())
    localStorage.setItem(`${name}login`, 'true')
    dp.on('accountsChanged', handleAccountsChanged)
    return true
  }, [setAddress, setSigner, chainId, name])

  useEffect(() => {
    if (!connecting.current) {
      connecting.current = true
      connect()
    }
  }, [])

  const disconnect = () => {
    localStorage.removeItem(`${name}login`)
    setAddress(undefined)
    setSigner(undefined)
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        signer,
        connect,
        disconnect,
        Contracts,
        provider,
        chainId,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const ctx = useContext(WalletContext)
  return ctx
}
