import React from 'react';
import styled from 'styled-components';
import { ConnectionProps } from '../Sidebar';
import useGetNFTs from '../../services/useGetNFTs';
import LoadingComponent from '../Loader';
import NFTCard from './NFTCard';
import { NFT } from '../../services/type';
import NFTView from './NFTView';
import { utils } from 'ethers';
import { DARK_GRAY } from '../../constants';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  const [selecteNft, setNFT] = React.useState<NFT>(null);
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
    return <LoadingComponent />;
  }

  if (!nfts?.length) {
    return <Body>No NFTs yet!</Body>;
  }

  if (selecteNft) {
    return (
      <NFTView
        nft={selecteNft}
        onBack={() => {
          setNFT(null);
        }}
      />
    );
  }

  return (
    <Body>
      Gallery
      <Worth>Total Estimated Worth: {utils.formatEther(BigInt(totalWorth))} ETH</Worth>
      <GalleryView>
        {data.collectibles?.map((nft) => (
          <NFTCard key={nft.id} nft={nft} onClick={() => onNFTClick(nft)} />
        ))}
      </GalleryView>
    </Body>
  );
});

export default Gallery;
