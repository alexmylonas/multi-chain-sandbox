import React from 'react';
import styled from 'styled-components';
import { ConnectionProps } from '../Sidebar';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  button {
    margin-bottom: 15px;
  }
`;

const Gallery = React.memo((props: ConnectionProps) => {
  return <Body>Gallery</Body>;
});

export default Gallery;
