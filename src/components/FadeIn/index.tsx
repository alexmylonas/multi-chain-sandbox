import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const FadeIn = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export default FadeIn;
