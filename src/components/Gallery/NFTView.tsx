import React from 'react';
import { NFT } from '../../services/type';
import styled from 'styled-components';
import { utils } from 'ethers';
import { DARK_GRAY, GRAY, LIGHT_GRAY, REACT_GRAY } from '../../constants';

const NFTDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
  padding: 1rem;
`;

const BackButton = styled.button`
  background-color: ${REACT_GRAY};
  width: 70px;
  cursor: pointer;
  border: none;
`;

const CollectionCard = styled.div`
  background-color: ${LIGHT_GRAY};
  margin-top: 1rem;
  border-radius: 0.3rem;
  p {
    padding: 0.5rem;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: auto;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const Label = styled.p`
  font-color: ${GRAY};
  font-size: 12px;
  font-weight: 600;
  margin: 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${REACT_GRAY};
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const NFTView = ({ nft, onBack }: { nft: NFT; onBack: () => void }) => {
  return (
    <NFTDetails>
      <BackButton onClick={onBack}> &#8592; Back </BackButton>
      <Title>{nft.name}</Title>
      <img src={nft.media.image.url} alt={nft.name} />
      <CollectionCard>
        <Label>Description</Label>
        <p>{nft.collection.description}</p>
        <Divider />
        <Label>Collection</Label>
        <p>{nft.collection.name}</p>
        {nft.collection.floorPrice?.price && (
          <>
            <Divider />
            <Label>Floor Price</Label>
            <p>{utils.formatEther(BigInt(nft.collection.floorPrice?.price))} ETH</p>
          </>
        )}
      </CollectionCard>
    </NFTDetails>
  );
};

export default NFTView;
