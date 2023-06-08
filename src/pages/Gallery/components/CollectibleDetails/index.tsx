import React from 'react';
import { NFT } from 'services/types';
import styled from 'styled-components';
import { utils } from 'ethers';
import { GRAY, LIGHT_GRAY, NO_IMAGE_URL, REACT_GRAY } from '../../../../constants';
import FadeIn from 'components/FadeIn';
import SendCollectible from '../SendCollectible';

const NFTDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
  padding: 1rem;
  gap: 1rem;
`;

const BackButton = styled.button`
  background-color: ${REACT_GRAY};
  width: 70px;
  cursor: pointer;
  border: none;
`;

const CollectionCard = styled.div`
  background-color: ${LIGHT_GRAY};
  border-radius: 0.3rem;
  p {
    padding: 0.5rem;
    word-break: break-all;
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

const CollectibleDetails = ({ nft, onBack }: { nft: NFT; onBack: () => void }) => {
  const { name, chainData, media, collection } = nft;
  const imageUrl = media?.image.url ?? NO_IMAGE_URL;
  const hasPrice = Boolean(nft.collection.floorPrice?.price);

  return (
    <FadeIn>
      <NFTDetails>
        <BackButton onClick={onBack}> &#8592; Back </BackButton>
        <Title>{name}</Title>
        <img src={imageUrl} alt={name} />
        {/* Only allow transfer for ERC721 collectibles */}
        {chainData?.standard === 'ERC721' ? (
          <SendCollectible tokenId={chainData.id} contractAddress={chainData.contract} />
        ) : null}
        <CollectionCard>
          <Label>Description</Label>
          <p>{collection.description}</p>
          <Divider />
          <Label>Collection</Label>
          <p>{collection.name}</p>
          {hasPrice && (
            <>
              <Divider />
              <Label>Floor Price</Label>
              <p>{utils.formatEther(BigInt(collection.floorPrice?.price))} ETH</p>
            </>
          )}
          {chainData?.contract && (
            <>
              <Divider />
              <Label>Contract</Label>
              <p>{chainData.contract}</p>
            </>
          )}
        </CollectionCard>
      </NFTDetails>
    </FadeIn>
  );
};

export default CollectibleDetails;
