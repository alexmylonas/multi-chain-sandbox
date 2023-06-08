import React from 'react';
import { EthereumContext } from '../contexts/EthereumContext';

const useEthereum = () => {
  const context = React.useContext(EthereumContext);
  if (context === undefined || context === null) {
    throw new Error('useEthereum must be used within a EthereumProvider');
  }
  return context;
};

export default useEthereum;
