import React from 'react';
import styled from 'styled-components';
import { ConnectionProps } from '../Sidebar';
import useGetNFTs from '../../services/useGetNFTs';
import NFTCard from './NFTCard';
import { NFT } from '../../services/types';
import NFTView from './NFTView';
import { utils } from 'ethers';
import { DARK_GRAY } from '../../constants';
import Breathe from '../Loader/Breathe';
import FadeIn from '../FadeIn';

const Body = styled.div`
  padding: 1rem;
  height: 100%;
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
    return <Breathe />;
  }

  if (!nfts?.length) {
    return <FadeIn>No NFTs yet!</FadeIn>;
  }

  if (selectedNft) {
    return (
      <NFTView
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
        Gallery
        <Worth>Total Estimated Worth: {utils.formatEther(BigInt(totalWorth))} ETH</Worth>
        <GalleryView>
          {data.collectibles?.map((nft) => (
            <NFTCard key={nft.id} nft={nft} onClick={() => onNFTClick(nft)} />
          ))}
        </GalleryView>
      </Body>
    </FadeIn>
  );
});

export default Gallery;
