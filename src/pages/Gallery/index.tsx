import React from 'react';
import { utils } from 'ethers';
import styled from 'styled-components';
import { ConnectionProps } from 'components/Sidebar';
import { NFT } from 'services/types';
import useGetNFTs from 'services/useGetNFTs';
import { FadeIn, Breath, TabTitle } from 'components';
import { DARK_GRAY } from '../../constants';
import CollectibleCard from './components/CollectibleCard';
import CollectibleDetails from './components/CollectibleDetails';

const Body = styled.div`
  padding: 1rem;
  height: 100vh;
  min-width: 350px;
`;

const GalleryView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  margin-top: 20px;
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
    <FadeIn>
      <Body>
        <TabTitle>Gallery</TabTitle>
        <Worth>Total Estimated Worth: {utils.formatEther(BigInt(totalWorth))} ETH</Worth>
        <GalleryView>
          {data.collectibles?.map((nft) => (
            <CollectibleCard key={nft.id} nft={nft} onClick={() => onNFTClick(nft)} />
          ))}
        </GalleryView>
      </Body>
    </FadeIn>
  );
});

export default Gallery;
