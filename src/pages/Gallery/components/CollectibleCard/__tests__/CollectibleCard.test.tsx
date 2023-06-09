import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollectibleCard from '../';
import { mockedCollectible } from '__tests__/utils';

describe('CollectibleCard', () => {
  it('renders correctly', async () => {
    const mockOnClick = jest.fn();
    const nft = mockedCollectible();
    render(<CollectibleCard nft={nft} onClick={mockOnClick} />);
    expect(screen.getByText(nft.collection.name)).toBeInTheDocument();
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
