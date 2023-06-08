import { utils, providers, Contract } from 'ethers';
import { PhantomEthereumProvider } from '../types';
import numToHexString from './numToHexString';

const collectiblesFunctionSignatures = {
  balanceOf: 'function balanceOf(address owner) view returns (uint256)',
  ownerOf: 'function ownerOf(uint256 tokenId) view returns (address)',
  approve: 'function approve(address to, uint256 tokenId)',
  getApproved: 'function getApproved(uint256 tokenId) view returns (address)',
  transferFrom: 'function transferFrom(address from, address to, uint256 tokenId)',
  safeTransferFrom: 'function safeTransferFrom(address from, address to, uint256 tokenId)',
};

const abi = Object.values(collectiblesFunctionSignatures);

const iface = new utils.Interface(abi);
/**
 * Trigger transfer of a collectible on ethereum
 * @param provider a Phantom ethereum provider
 * @returns a transaction hash
 */
const transferCollectibleOnEthereum = async (
  provider: PhantomEthereumProvider,
  contractAddress: string,
  tokenId: string,
  fromAddress: string,
  transferToAddress: string
): Promise<string> => {
  try {
    //
    const ethersProvider = new providers.Web3Provider(provider as any);
    const contract = new Contract(contractAddress, iface, ethersProvider);
    /**
     * Building the transfer token transaction
     */
    const transferParams = {
      from: fromAddress.toLowerCase(),
      to: contractAddress,
      gas: numToHexString(30000), // the max amount of gas to be used in the tx
      data: contract.interface.encodeFunctionData('transferFrom', [
        fromAddress.toLowerCase(),
        transferToAddress,
        tokenId,
      ]),
    };

    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [transferParams],
    });
    if (typeof txHash === 'string') return txHash;
    throw new Error('did not get back a transaction hash');
  } catch (error) {
    console.warn(error);
    throw new Error(error.message);
  }
};

export default transferCollectibleOnEthereum;
