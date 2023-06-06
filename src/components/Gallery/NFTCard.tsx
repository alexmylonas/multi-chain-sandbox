import styled from 'styled-components';
import type { NFT } from '../../services/type';
import React from 'react';
import FadeIn from '../FadeIn';

const Collectible = styled.div<{ imageUrl: string }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  width: 100%;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const Name = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  margin: 0.5rem;
  padding: 0.3rem;
  background-color: rgba(0, 0, 0, 0.7);
`;

const NFTCard = React.memo((props: { nft: NFT; onClick: () => void }) => {
  const { nft, onClick } = props;
  return (
    <FadeIn>
      <Collectible imageUrl={nft.media.image.url} onClick={onClick}>
        <Name>{nft.collection.name}</Name>
      </Collectible>
    </FadeIn>
  );
});

export default NFTCard;
