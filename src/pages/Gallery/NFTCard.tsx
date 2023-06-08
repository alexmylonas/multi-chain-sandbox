import styled from 'styled-components';
import type { NFT } from '../../services/types';
import React from 'react';
import FadeIn from '../../components/FadeIn';
import { NO_IMAGE_URL } from '../../constants';

const Collectible = styled.div<{ imageUrl: string }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;
  background-image: url(${(props) => props.imageUrl});
  background-position: center center;
  background-repeat: no-repeat;
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
  const imageUrl = nft.media?.image.url ?? NO_IMAGE_URL;
  return (
    <FadeIn>
      <Collectible imageUrl={imageUrl} onClick={onClick}>
        <Name>{nft.collection.name}</Name>
      </Collectible>
    </FadeIn>
  );
});

export default NFTCard;
