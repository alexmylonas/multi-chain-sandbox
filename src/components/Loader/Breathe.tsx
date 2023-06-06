import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PURPLE } from '../../constants';
const Breathe = () => {
  return (
    <Container>
      <CircleContainer>
        <Circle />
      </CircleContainer>
    </Container>
  );
};

const breatheAnimation = keyframes`
 0% { height: 25%; width: 25%; }
 30% { height: 95%; width: 95%; opacity: 0.6 }
 40% { height: 100%; width: 100%; opacity: 0.3; }
 100% { height: 25%; width: 25%; opacity: 0.6; }
`;

const CircleContainer = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Circle = styled.div`
  height: 100px;
  width: 100px;
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  border-color: ${PURPLE};
  animation-name: ${breatheAnimation};
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100px;
`;

export default Breathe;
