import Loader from 'components/Loader';
import useEthereum from 'hooks/useEthereum';
import React from 'react';
import useListHistory from 'services/useListHistory';
import styled from 'styled-components';
import TransactionCard from './TransactionCard';
import FadeIn from 'components/FadeIn';

const HistoryMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
`;

type Props = {};

const History = React.memo((props: Props) => {
  const { address } = useEthereum();
  const { isLoading, data } = useListHistory(address);
  if (isLoading) {
    return (
      <HistoryMain>
        Recent Activity
        <Loader />
      </HistoryMain>
    );
  }
  return (
    <Body>
      <FadeIn>
        <Title>Recent Activity</Title>
        <HistoryMain>
          {data?.results.map((item) => {
            return <TransactionCard key={item.id} tx={item} />;
          })}
        </HistoryMain>
      </FadeIn>
    </Body>
  );
});

export default History;
