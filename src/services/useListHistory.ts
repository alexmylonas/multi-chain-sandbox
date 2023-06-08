import { useQuery } from '@tanstack/react-query';
import { Endpoints, apiUrl } from './api';
import { ChainIds, ListHistoryInput, ListHistoryOutput } from './types';

const useListHistory = (address: string) => {
  const input: ListHistoryInput = {
    accounts: [
      {
        address,
        chainId: ChainIds.Ethereum,
      },
      {
        address,
        chainId: ChainIds.Polygon,
      },
    ],
  };
  const { isLoading, error, data } = useQuery<ListHistoryOutput>({
    queryKey: ['transactions', address],
    queryFn: () =>
      fetch(apiUrl(Endpoints.History), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }).then((res) => res.json()),
  });

  return { isLoading, error, data: data };
};

export default useListHistory;
