import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import { Key } from '@/components/Key';

describe('Keyboard', () => {
  it('should display single number', async () => {
    const mockHandleClick = jest.fn();

    render(
      <Key value={1} onClick={mockHandleClick}>
        1
      </Key>,
    );
    const key = await screen.findByTestId('key-1');
    await user.click(key);

    expect(mockHandleClick).toHaveBeenCalledWith(1);
  });
});
