import styled, { keyframes } from 'styled-components';
import { PURPLE } from '../../constants';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid ${PURPLE};
  border-right: 2px solid ${PURPLE};
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

export default Spinner;
