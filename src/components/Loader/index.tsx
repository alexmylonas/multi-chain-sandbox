import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PURPLE } from '../../constants';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${PURPLE};
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
};

export default LoadingComponent;
