import { useQuery } from '@tanstack/react-query';
import { Endpoints, apiUrl } from './api';
import { Token } from './types';

type TokenDataInput = {
  pubKey: string;
  page?: number;
  perPage?: number;
}

type TokenDataOutput = {
  records: Token[];
  perPage: number;
  page: number;
  total: number;
}

const useGetTokenData = ({ pubKey, page = 1, perPage = 5}: TokenDataInput) => {

  return useQuery<TokenDataOutput>({
    queryKey: [pubKey, page, perPage],
    queryFn: () =>
    fetch(`${apiUrl(Endpoints.TokenData)}?publicKey=${pubKey}&page=${page}&perPage=${perPage}`, {}).then((res) => res.json()),
  })
}

export default useGetTokenData;
