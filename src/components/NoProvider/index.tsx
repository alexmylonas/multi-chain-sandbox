import React from 'react';
import styled, { keyframes } from 'styled-components';

import { REACT_GRAY } from '../../constants';
import ImageWithFallback from 'components/ImageWithFallback';

// =============================================================================
// Styled Components
// =============================================================================

const pulsate = keyframes` {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
`;

const StyledMain = styled.main`
  padding: 20px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${REACT_GRAY};
  img {
    animation: ${pulsate} 2s ease-in-out infinite;
  }
`;

// =============================================================================
// Main Component
// =============================================================================

// TODO: @PHANTOM-TEAM: Let's improve this UI
const NoProvider = () => {
  return (
    <StyledMain>
      <ImageWithFallback src="https://phantom.app/img/phantom-logo.svg" alt="gif" height="400px" />
    </StyledMain>
  );
};

export default NoProvider;
