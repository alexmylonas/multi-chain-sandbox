import { Token } from 'services/types';

export const normalizedTokens = (tokens: Token[] = []) => {
  return tokens
    .filter((token) => token.type === 'fungible' && token.symbol && token.amount !=='0')
    .map((token) => ({
      ...token,
      symbol: token.symbol.toLowerCase(),
    }));
}

export function getCalculateToken(token: Token, priceData) {
  if (!priceData || priceData[token.symbol] === undefined) {
    return 0;
  }
  return parseFloat(token.amount) * priceData[token.symbol].usd;
}