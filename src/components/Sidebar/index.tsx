import React from 'react';
import styled from 'styled-components';
import { REACT_GRAY } from '../../constants';
import Button from '../Button';
import { ConnectedAccounts, ConnectedMethods } from '../../App';
import ConnectedRoutes from '../ConnectedRoutes';
import { EthereumProvider } from '../../contexts/EthereumContext';
import { PhantomEthereumProvider, TLog } from 'types';

// =============================================================================
// Styled Components
// =============================================================================

const Main = styled.main`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${REACT_GRAY};

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

export interface ConnectionProps {
  connectedMethods: ConnectedMethods[];
  connectedAccounts: ConnectedAccounts;
  connect: () => Promise<void>;
  createLog: (l: TLog) => void;
  ethProvider: PhantomEthereumProvider | undefined;
}

// =============================================================================
// Main Component
// =============================================================================

const Sidebar = React.memo((props: ConnectionProps) => {
  const { connectedAccounts, connect, createLog, ethProvider } = props;
  return (
    <Main>
      {connectedAccounts?.ethereum ? (
        <EthereumProvider address={connectedAccounts.ethereum} createLog={createLog} ethProvider={ethProvider}>
          <ConnectedRoutes {...props} />
        </EthereumProvider>
      ) : (
        // not connected
        <Button data-testid="connect-to-phantom" onClick={connect} style={{ marginTop: '15px' }}>
          Connect to Phantom
        </Button>
      )}
    </Main>
  );
});

export default Sidebar;
