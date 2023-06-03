import React from 'react';
import { ConnectionProps } from '../Sidebar';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Trading = React.memo((props: ConnectionProps) => {
  return <Body>Trading</Body>;
});

export default Trading;
