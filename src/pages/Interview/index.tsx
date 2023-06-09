import React from 'react';
import styled, { keyframes } from 'styled-components';
import FadeIn from 'components/FadeIn';
import TabTitle from 'components/TabTitle';
import { DARK_GRAY, GRAY, REACT_GRAY, WHITE } from '../../constants';
import useGetTokenData from 'services/useGetTokenData';
import useGetTokensWithPrice from 'services/useGetTokensWithPrice';
import { getCalculateToken, normalizedTokens } from './utils';
import { ImageWithFallback, Loader } from 'components';
import TokenPrice from './components/TokenPrice';

const InterviewMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  gap: 1rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
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

const TokenList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
`;

const fadeIn = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const TokenCard = styled.div`
  display: flex;
  background-color: ${DARK_GRAY};
  border-radius: 0.5rem;
  padding: 0.8rem 0.5rem;
  gap: 1rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

const TokenValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TokenQuantity = styled.p`
  color: ${GRAY};
  font-size: 0.8rem;
`;

const TokenMeta = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Total = styled.p`
  color: ${WHITE};
  font-size: 1.5rem;
  font-weight: bold;
`;

const formatAddress = (address = '') => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const WalletId = styled.h2`
  color: ${WHITE};
  font-size: 1.2rem;
  font-weight: bold;
  > span {
    color: ${GRAY};
    font-size: 1rem;
    font-weight: normal;
  }
`;

type Props = {};

const staticPubKey = '7XdanWCMkgkwtn7fYvgkhv3bu8cL31QrKQpmhdZ4EfvS';
const History = React.memo((props: Props) => {
  const { data: tokenData, isLoading } = useGetTokenData({
    pubKey: staticPubKey,
    perPage: 1000,
  });
  const normTokenData = normalizedTokens(tokenData?.records);
  const { data: priceData, isLoading: isPricesLoading } = useGetTokensWithPrice(normTokenData.map((t) => t.symbol));

  const total = normTokenData.reduce((acc, token) => {
    return acc + getCalculateToken(token, priceData);
  }, 0);

  if (isLoading || isPricesLoading) {
    return <Loader />;
  }
  return (
    <Body>
      <FadeIn>
        <TabTitle>Alex Mylonas Interview</TabTitle>
        <InterviewMain>
          <WalletId>
            Account 1 <span>({formatAddress(staticPubKey)})</span>
          </WalletId>
          <Total>${total.toFixed(2)}</Total>
          <TokenList>
            {normTokenData.map((token) => (
              <TokenCard key={token.mintAddress}>
                {token.imageUrl ? (
                  <ImageWithFallback src={token.imageUrl} alt={token.name} height="40px" />
                ) : (
                  <div style={{ height: '40px' }}>{token.name}</div>
                )}
                <TokenMeta>
                  <TokenValue>
                    <div>{token.name || token.symbol}</div>
                    <TokenQuantity>
                      {token.amount} {token.symbol.toUpperCase()}
                    </TokenQuantity>
                  </TokenValue>
                  <TokenPrice symbol={token.symbol} amount={token.amount} priceData={priceData} />
                </TokenMeta>
              </TokenCard>
            ))}
          </TokenList>
        </InterviewMain>
      </FadeIn>
    </Body>
  );
});

export default History;
