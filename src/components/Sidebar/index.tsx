import React from 'react';
import styled from 'styled-components';
import { REACT_GRAY } from '../../constants';
import Button from '../Button';
import { ConnectedAccounts, ConnectedMethods } from '../../App';
import ConnectedRoutes from '../ConnectedRoutes';

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
}

// =============================================================================
// Main Component
// =============================================================================

const Sidebar = React.memo((props: ConnectionProps) => {
  const { connectedAccounts, connect } = props;
  return (
    <Main>
      {connectedAccounts?.solana ? (
        <ConnectedRoutes {...props} />
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
