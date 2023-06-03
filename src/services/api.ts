import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

export const API_URL = process.env.REACT_APP_BASE_API_URL;

export enum Endpoints {
  Collectibles = '/collectibles/v1',
}

export const apiUrl = (path:Endpoints) => `${API_URL}${path}`;