import React from 'react';
import { utils } from 'ethers';
import styled from 'styled-components';
import { ConnectionProps } from 'components/Sidebar';
import { NFT } from 'services/types';
import useGetNFTs from 'services/useGetNFTs';
import { FadeIn, Breath, TabTitle } from 'components';
import { DARK_GRAY, REACT_GRAY } from '../../constants';
import CollectibleCard from './components/CollectibleCard';
import CollectibleDetails from './components/CollectibleDetails';

const Body = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  min-width: 350px;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${REACT_GRAY};
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const GalleryView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 20px 0px;
  div {
    aspect-ratio: 1;
  }
`;

const Worth = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: auto;
  font-color: ${DARK_GRAY};
  margin-top: 1rem;
`;
const Gallery = React.memo((props: ConnectionProps) => {
  const address = props.connectedAccounts.ethereum;
  const [selectedNft, setNFT] = React.useState<NFT>(null);
  const { isLoading, data } = useGetNFTs(address);

  const onNFTClick = React.useCallback((nft) => {
    setNFT(nft);
  }, []);

  const nfts = data?.collectibles;

  const totalWorth = React.useMemo(() => {
    if (nfts?.length) {
      return nfts.reduce((acc, nft) => {
        return acc + (nft.collection.floorPrice?.price ?? 0);
      }, 0);
    }
    return 0;
  }, [nfts]);

  if (isLoading) {
    return <Breath />;
  }

  if (!nfts?.length) {
    return (
      <FadeIn>
        <Body>
          <TabTitle>Gallery</TabTitle>
          No NFTs yet!
        </Body>
      </FadeIn>
    );
  }

  if (selectedNft) {
    return (
      <CollectibleDetails
        nft={selectedNft}
        onBack={() => {
          setNFT(null);
        }}
      />
    );
  }

  return (
    <Body>
      <FadeIn>
        <TabTitle>Gallery</TabTitle>
        <Worth>Total Estimated Worth: {utils.formatEther(BigInt(totalWorth))} ETH</Worth>
        <GalleryView>
          {data.collectibles?.map((nft) => (
            <CollectibleCard key={nft.id} nft={nft} onClick={() => onNFTClick(nft)} />
          ))}
        </GalleryView>
      </FadeIn>
    </Body>
  );
});

export default Gallery;
