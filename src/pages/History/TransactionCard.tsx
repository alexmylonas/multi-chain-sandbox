import React from 'react';
import { Transaction, TransactionsTypes } from 'services/types';
import styled from 'styled-components';
import { DARK_GRAY, GRAY } from '../../constants';

const TransactionMain = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  margin: 1rem auto;
  margin-bottom: 0;
  width: 300px;
  // @media (max-width: 756px) {
  //   width: 90%;
  // }
`;

const TransactionDate = styled.div`
  font-size: 1rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const TxBody = styled.div`
  display: flex;
  // flex-wrap: wrap;
  align-content: center;
  gap: 0.5rem;
  background-color: ${DARK_GRAY};
  border-radius: 0.2rem;
  max-height: 5rem;
  min-height: 80px;
  padding: 0.5rem;
`;

const formartDate = (date: number) => {
  return new Date(date * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
type Props = {
  tx: Transaction;
};

const SquareImage = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  border-radius: 1rem;
`;

const TxInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
`;

const TxTitle = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  word-break: break-all;
`;

const TxAddress = styled.p`
  font-size: 0.8rem;
  color: ${GRAY};
`;

const formatAddress = (address = '') => {
  console.log(address, address.split('address:')[1]);
  const addr = address.split('address:')[1] ?? '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const TransactionCard = React.memo(({ tx }: Props) => {
  switch (tx.interactionData.transactionType) {
    case TransactionsTypes.TokenSend:
      return (
        <TransactionMain>
          <TransactionDate>{formartDate(tx.timestamp)}</TransactionDate>
          <TxBody>
            <SquareImage src={tx.interactionData.balanceChanges[0]?.token.logoURI} height="60px" />
            <TxInfo>
              {tx.interactionData.balanceChanges[0]?.to !== tx.owner ? (
                <>
                  <TxTitle>Sent: {tx.interactionData.balanceChanges[0]?.token.displayName}</TxTitle>
                  <TxAddress>To {formatAddress(tx.interactionData.balanceChanges[0]?.to)}</TxAddress>
                </>
              ) : (
                <TxTitle>Received: {tx.interactionData.balanceChanges[0]?.token.displayName}</TxTitle>
              )}
            </TxInfo>
          </TxBody>
        </TransactionMain>
      );
    case TransactionsTypes.CollectibleBuyItem:
      return (
        <TransactionMain>
          <TransactionDate>{formartDate(tx.timestamp)}</TransactionDate>
          <TxBody>
            <SquareImage src={tx.interactionData.item.logoURI} height="60px" />
            <TxInfo>
              <>
                <TxTitle>Bought: {tx.interactionData.item.displayName}</TxTitle>
                {/* <TxAddress>To {formatAddress(tx.interactionData.balanceChanges[0]?.to)}</TxAddress> */}
              </>
            </TxInfo>
          </TxBody>
        </TransactionMain>
      );
    case TransactionsTypes.Unclassified:
      return (
        <TransactionMain>
          <TransactionDate>{formartDate(tx.timestamp)}</TransactionDate>
          <TxBody>App Interaction</TxBody>
        </TransactionMain>
      );
    default:
      return (
        <TransactionMain>
          <TransactionDate>{formartDate(tx.timestamp)}</TransactionDate>
          <TxBody>txType: {tx.interactionData.transactionType}</TxBody>
        </TransactionMain>
      );
  }
});

export default TransactionCard;
