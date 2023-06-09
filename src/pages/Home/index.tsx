import React from 'react';
import styled from 'styled-components';
import { DARK_GRAY, GRAY, PURPLE, REACT_GRAY, WHITE } from '../../constants';
import { SupportedChainIcons, SupportedChainNames, SupportedEVMChainIds } from '../../types';
import { hexToRGB } from '../../utils';
import Button from '../../components/Button';
import { ConnectionProps } from '../../components/Sidebar';
import FadeIn from '../../components/FadeIn';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  button {
    margin-bottom: 15px;
  }
  overflow-y: scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${REACT_GRAY};
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const Link = styled.a.attrs({
  href: 'https://phantom.app/',
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-decoration: none;
  margin-bottom: 15px;
  // margin-bottom: 30px;
  padding: 5px;

  &:focus-visible {
    outline: 2px solid ${hexToRGB(GRAY, 0.5)};
    border-radius: 6px;
  }
`;

const Subtitle = styled.h5`
  color: ${GRAY};
  font-weight: 400;
`;

const Pre = styled.pre`
  margin-bottom: 5px;
  margin-right: auto;
`;

const AccountRow = styled.div`
  display: flex;
  margin-bottom: 8px;

  :last-of-type {
    margin-bottom: 0;
  }
`;

const Badge = styled.div`
  margin: 0;
  padding: 10px;
  width: 100%;
  color: ${PURPLE};
  background-color: ${hexToRGB(PURPLE, 0.2)};
  font-size: 14px;
  border-radius: 0 6px 6px 0;
  @media (max-width: 400px) {
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 320px) {
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ::selection {
    color: ${WHITE};
    background-color: ${hexToRGB(PURPLE, 0.5)};
  }

  ::-moz-selection {
    color: ${WHITE};
    background-color: ${hexToRGB(PURPLE, 0.5)};
  }
`;

const Divider = styled.div`
  border: 1px solid ${DARK_GRAY};
  height: 1px;
  margin: 20px 0;
`;

const Tag = styled.p`
  text-align: center;
  color: ${GRAY};

  a {
    color: ${PURPLE};
    text-decoration: none;

    ::selection {
      color: ${WHITE};
      background-color: ${hexToRGB(PURPLE, 0.5)};
    }

    ::-moz-selection {
      color: ${WHITE};
      background-color: ${hexToRGB(PURPLE, 0.5)};
    }
  }

  @media (max-width: 320px) {
    font-size: 14px;
  }

  ::selection {
    color: ${WHITE};
    background-color: ${hexToRGB(PURPLE, 0.5)};
  }

  ::-moz-selection {
    color: ${WHITE};
    background-color: ${hexToRGB(PURPLE, 0.5)};
  }
`;

const ChainIcon = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  border-radius: 6px 0 0 6px;
`;

const ChainHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0 10px;
`;

const Home = React.memo((props: ConnectionProps) => {
  const { connectedAccounts, connectedMethods } = props;
  return (
    <FadeIn>
      <Body>
        <Link>
          <img src="https://phantom.app/img/phantom-logo.svg" alt="Phantom" width="200" />
          <Subtitle>Multi-chain Sandbox</Subtitle>
        </Link>
        <>
          <div>
            <Pre>Connected as</Pre>
            <AccountRow>
              <ChainIcon src={SupportedChainIcons.Ethereum} height="36px" />
              <Badge>{connectedAccounts?.ethereum}</Badge>
            </AccountRow>
            <AccountRow>
              <ChainIcon src={SupportedChainIcons.Polygon} height="36px" />
              <Badge>{connectedAccounts?.ethereum}</Badge>
            </AccountRow>
            <AccountRow>
              <ChainIcon src={SupportedChainIcons.Solana} height="36px" />
              <Badge>{connectedAccounts?.solana?.toBase58()}</Badge>
            </AccountRow>
            <Divider />
          </div>
          <ChainHeader>
            <ChainIcon
              src={SupportedChainIcons.Ethereum}
              height="16px"
              style={{ marginRight: '6px', borderRadius: '6px' }}
            />
            <Tag>{SupportedChainNames.EthereumGoerli}</Tag>
          </ChainHeader>
          {connectedMethods
            .filter((method) => method.chain === 'ethereum')
            .map((method, i) => (
              <Button
                data-test-id={`ethereum-goerli-${method.name}`}
                key={`${method.name}-${i}`}
                onClick={() => method.onClick(SupportedEVMChainIds.EthereumGoerli)}
              >
                {method.name}
              </Button>
            ))}
          <ChainHeader>
            <ChainIcon
              src={SupportedChainIcons.Polygon}
              height="16px"
              style={{ marginRight: '6px', borderRadius: '6px' }}
            />
            <Tag>{SupportedChainNames.PolygonMumbai}</Tag>
          </ChainHeader>
          {connectedMethods
            .filter((method) => method.chain === 'ethereum')
            .map((method, i) => (
              <Button
                data-test-id={`polygon-mumbai-${method.name}`}
                key={`${method.name}-${i}`}
                onClick={() => method.onClick(SupportedEVMChainIds.PolygonMumbai)}
              >
                {method.name}
              </Button>
            ))}
          <ChainHeader>
            <ChainIcon
              src={SupportedChainIcons.Solana}
              height="16px"
              style={{ marginRight: '6px', borderRadius: '6px' }}
            />
            <Tag>{SupportedChainNames.SolanaDevnet}</Tag>
          </ChainHeader>
          {connectedMethods
            .filter((method) => method.chain === 'solana')
            .map((method, i) => (
              <Button data-test-id={`solana-${method.name}`} key={`${method.name}-${i}`} onClick={method.onClick}>
                {method.name}
              </Button>
            ))}
        </>
        <Tag>
          Made with{' '}
          <span role="img" aria-label="Red Heart Emoji">
            ❤️
          </span>{' '}
          by the <a href="https://phantom.app">Phantom</a> team
        </Tag>
      </Body>
    </FadeIn>
  );
});

export default Home;
