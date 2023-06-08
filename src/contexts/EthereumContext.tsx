import React from 'react';
import { PhantomEthereumProvider, SupportedEVMChainIds, TLog } from 'types';
import { getChainName, pollEthereumTransactionReceipt } from 'utils';
import { ensureEthereumChain } from 'utils/ensureEthereumChain';
import transferCollectibleOnEthereum from 'utils/transferCollectibleOnEthereum';

type HandleCollectibleTransferOnEthereum = {
  chainId: SupportedEVMChainIds.EthereumMainnet | SupportedEVMChainIds.EthereumGoerli;
  contractAddress: string;
  tokenId: string;
  fromAddress: string;
  transferToAddress: string;
};

type EthereumContextValue = {
  address: string;
  transferToken: (params: HandleCollectibleTransferOnEthereum) => void;
};

const EthereumContext = React.createContext<EthereumContextValue>(null);

type EthereumContextProps = {
  createLog: (log: TLog) => void;
  address: string;
  ethProvider: PhantomEthereumProvider | undefined;
};

const EthereumProvider = ({ children, address, createLog, ethProvider }: PropsWithChildren<EthereumContextProps>) => {
  /**
   * Transfer a collectible on Ethereum
   * @param chainId
   * @param contractAddress
   * @param tokenId
   * @param fromAddress
   * @param transferToAddress
   * @returns {Promise<void>}
   */
  const handleCollectibleTransferOnEthereum = React.useCallback(
    async ({
      chainId,
      contractAddress,
      tokenId,
      transferToAddress,
      fromAddress,
    }: HandleCollectibleTransferOnEthereum) => {
      if (!ethProvider) return;
      // set ethereum provider to the correct chainId
      const ready = await ensureEthereumChain(ethProvider, chainId, createLog);
      if (!ready) return;
      try {
        // send the transaction up to the network
        const txHash = await transferCollectibleOnEthereum(
          ethProvider,
          contractAddress,
          tokenId,
          fromAddress,
          transferToAddress
        );
        createLog({
          providerType: 'ethereum',
          status: 'info',
          method: 'eth_sendTransaction',
          message: `Sending transfer transaction ${txHash} on ${chainId ? getChainName(chainId) : 'undefined'}`,
        });
        // poll tx status until it is confirmed in a block, fails, or 30 seconds pass
        pollEthereumTransactionReceipt(txHash, ethProvider, createLog).catch((error) => {
          throw error;
        });
      } catch (error) {
        createLog({
          providerType: 'ethereum',
          status: 'error',
          method: 'eth_sendTransaction',
          message: `Failed to transfer token(${tokenId}) with error ${error.message}`,
        });
      }
    },
    [ethProvider, createLog]
  );

  // memoize the value so that it only changes when the address changes
  const value = React.useMemo(
    () => ({
      address,
      transferToken: handleCollectibleTransferOnEthereum,
    }),
    [address, handleCollectibleTransferOnEthereum]
  );
  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
};

const EthereumConsumer = EthereumContext.Consumer;

export { EthereumProvider, EthereumContext, EthereumConsumer };
