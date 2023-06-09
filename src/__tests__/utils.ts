import { ChainIds, NFT } from "services/types";


export function mockedCollectible(overrides?: Partial<NFT>) {
  // Function to generate mock data for tests
  const defaultCollectible: NFT = {
    id: overrides?.id ?? '1',
    name: 'Bored Ape #1',
    description: 'A bored ape',
    chain: mockedChain(),
    collection: mockedNFTCollection(),
    balance: '1',
    tokenCount: 1,
    chainData: mockedChainData(),
  };
  return { ...defaultCollectible, ...overrides };
}

export function mockedChain(overrides?: Partial<NFT['chain']>) {
  const defaultChain: NFT['chain'] = {
    id: ChainIds.Ethereum,
    name: 'Etherum',
    symbol: 'ETH',
    imageUrl: 'https://example.com/chain-image.png',
  };

  return { ...defaultChain, ...overrides };
}

export function mockedNFTCollection(overrides?: Partial<NFT['collection']>): NFT['collection'] {
  const defaultCollection: NFT['collection'] = {
    id: 'mock-collection-id',
    name: 'Mock Collection',
    description: 'This is a mock collection',
    floorPrice: {
      price: 0.1,
    },
  };

  return { ...defaultCollection, ...overrides };
}

export function mockedChainData(overrides?: Partial<NFT['chainData']>): NFT['chainData'] {
  const defaultChainData: NFT['chainData'] = {
    id: 'mock-chain-data-id',
    contract: 'mock-contract-address',
    standard: 'ERC721',
  };

  return { ...defaultChainData, ...overrides };
}