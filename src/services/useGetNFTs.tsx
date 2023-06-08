import { useQuery } from '@tanstack/react-query';
import { Endpoints, apiUrl } from './api';
import { ChainIds, GetNFTsInput, GetNFTsOutput } from './types';

const useGetNFTs = (address: string) => {
  const input: GetNFTsInput = {
    addresses: [
      {
        address,
        chainId: ChainIds.Goerli,
      },
    ],
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ['nfts', address],
    queryFn: () =>
      fetch(apiUrl(Endpoints.Collectibles), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }).then((res) => res.json()),
  });

  return { isLoading, error, data: data as GetNFTsOutput };
};

export default useGetNFTs;
