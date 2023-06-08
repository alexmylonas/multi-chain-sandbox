export enum ChainIds {
  Ethereum = 'eip155:1',
  Goerli = 'eip155:5',
}

export type AddressInput = {
  address: string;
  chainId: ChainIds;
};

export type GetNFTsInput = {
  addresses: AddressInput[];
};

export type NFT = {
  id: string;
  chain: {
    id: ChainIds;
    name: string;
    symbol: string;
    imageUrl: string;
  };
  name: string;
  description: string;

  // Collection data
  collection: {
    id: string;
    name: string;
    description: string;
    // If floor price is null, no item is for sale
    floorPrice?: {
      price: number;
    };
  };

  media?: {
    type: 'image' | 'video';
    image: {
      url: string;
    };
  };

  chainData?: {
    id: string;
    contract: string;
    standard: 'ERC721' | 'ERC1155';
  };

  balance: string;
  tokenCount: number;
};

export type GetNFTsOutput = {
  collectibles: NFT[];
};
