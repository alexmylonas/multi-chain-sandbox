import { render, screen } from '@testing-library/react';
import CollectibleCard from '../';
import { mockedCollectible } from '__tests__/utils';

describe('CollectibleCard', () => {
  it('renders correctly', () => {
    const nft = mockedCollectible();
    render(<CollectibleCard nft={nft} onClick={() => {}} />);
    expect(screen.getByText(nft.collection.name)).toBeInTheDocument();
  });
});
