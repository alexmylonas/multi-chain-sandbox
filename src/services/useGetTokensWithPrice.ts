import { useQuery } from '@tanstack/react-query';
import { PriceDataOutput } from './types';

const useGetTokensWithPrice = (ids: string[] = []) => {
  const queryIds = ids.join(',');

  return useQuery<PriceDataOutput>({
    queryKey: [queryIds],
    queryFn: () =>
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?include_24hr_change=true&vs_currencies=usd&ids=${queryIds}`,
        {}
      ).then((res) => res.json()),
    enabled: ids.length > 0,
  });
};

export default useGetTokensWithPrice;
