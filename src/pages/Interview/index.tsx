import React from 'react';
import styled from 'styled-components';
import FadeIn from 'components/FadeIn';
import TabTitle from 'components/TabTitle';
import { REACT_GRAY } from '../../constants';

const InterviewMain = styled.div`
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

type Props = {};

const History = React.memo((props: Props) => {
  return (
    <Body>
      <FadeIn>
        <TabTitle>Interview Exercise</TabTitle>
        <InterviewMain>Hello there! This is my interview exercise. I hope you like it!</InterviewMain>
      </FadeIn>
    </Body>
  );
});

export default History;
