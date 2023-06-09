import { GRAY } from '../../../../constants';
import { PriceDataOutput, Token } from 'services/types';
import styled from 'styled-components';

const TokenPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  padding-left: 1rem;
`;

const PricePercent = styled.p<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? 'green' : 'red')};
  font-size: 0.8rem;
`;

const NoData = styled.p`
  color: ${GRAY};
  font-size: 0.8rem;
`;

type Props = {
  symbol: Token['symbol'];
  amount: Token['amount'];
  priceData: PriceDataOutput;
};

const TokenPrice = ({ symbol, amount, priceData }: Props) => {
  if (priceData?.[symbol]) {
    const { usd_24h_change, usd } = priceData[symbol];
    const amountInUsd = usd * parseFloat(amount);
    return (
      <TokenPriceWrapper>
        <div>${amountInUsd.toFixed(2)}</div>
        {usd_24h_change ? (
          <PricePercent isPositive={usd_24h_change >= 0}>{usd_24h_change?.toFixed(2)}%</PricePercent>
        ) : (
          <NoData>No data</NoData>
        )}
      </TokenPriceWrapper>
    );
  }
  return null;
};

export default TokenPrice;
