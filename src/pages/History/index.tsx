import Loader from 'components/Loader';
import useEthereum from 'hooks/useEthereum';
import React from 'react';
import useListHistory from 'services/useListHistory';
import styled from 'styled-components';
import TransactionCard from './TransactionCard';
import FadeIn from 'components/FadeIn';
import TabTitle from 'components/TabTitle';

const HistoryMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
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
        <TabTitle>Recent Activity</TabTitle>
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
