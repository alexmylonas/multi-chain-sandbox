import styled from 'styled-components';

import { WHITE, DARK_GRAY, LIGHT_GRAY, PURPLE } from '../../constants';

import { hexToRGB } from '../../utils';

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  color: ${WHITE};
  background-color: ${DARK_GRAY};
  padding: 15px 10px;
  font-weight: 600;
  outline: 0;
  border: 0;
  border-radius: 6px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    background-color: ${hexToRGB(LIGHT_GRAY, 0.9)};
  }
  &:focus-visible&:not(:hover) {
    background-color: ${hexToRGB(LIGHT_GRAY, 0.8)};
  }
  &:active {
    background-color: ${LIGHT_GRAY};
  }

  &.secondary {
    background-color: ${PURPLE};
  }
  &.secondary:hover {
    background-color: ${hexToRGB(PURPLE, 0.9)};
  }
  &.secondary:focus-visible&:not(:hover) {
    background-color: ${hexToRGB(PURPLE, 0.8)};
  }
`;

export default Button;
