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

export type ListHistoryInput = {
  accounts: AddressInput[];
} | { next: string };

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

export type ListHistoryOutput = {
  next?: string;
  results: Transaction[];
}

export type Transaction = {
  id: string;
  timestamp: number;
  owner: string;
  interactionData: {
    transactionType: TransactionsTypes;
    dapp?: Dapp;
    balanceChanges: BalanceChange[]
    // Item and forAmount are only present for CollectibleBuyItem
    item?: {
      id: string;
      displayName: string;
      logoURI: string;
    }
    forAmount?: string;
    forAsset?: EthAsset;
  }
  chainMeta: {
    networkFee: string;
    networkFeePayer: string; // Address of the user who paid the fee
    status: TxStatus;
    errorMessage?: string,
    blockNumber: string,
    chainId: ChainIds,
    transactionId: string,
}
};

export type Dapp = {
  displayName: string;
  logoURI: string;
}

export enum TransactionsTypes {
  TokenSend = 'TOKEN_SEND',
  Unclassified = 'UNCLASSIFIED_APP_INTERACTION',
  CollectibleBuyItem = 'COLLECTIBLE_BUY_ITEM',
}

export enum TxStatus {
  Success = 'success',
}

export type EthAsset = {
  id: string;
  displayName: string;
  symbol: string;
  logoURI: string;
  tokenType: 'Native';
  decimals: number;
}

export type BalanceChange = {
  amount: string,
  to: string,
  from: string,
  token: {
      id: string;
      displayName: string
      symbol: string,
      logoURI: string,
      // "tokenType": "NonFungible"
  }
}