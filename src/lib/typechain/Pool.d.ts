/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumber, BigNumberish, BaseContract, ContractTransaction, Overrides, CallOverrides } from 'ethers'
import { Provider } from '@ethersproject/providers'

export class Pool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  claim(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

  close(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

  initialize(
    _fdao: string,
    _lucky100: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  status(
    user: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, boolean, BigNumber] & {
      pos: BigNumber
      balance: BigNumber
      isClosed: boolean
      estimateBonus: BigNumber
    }
  >

  update(user: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>
}
