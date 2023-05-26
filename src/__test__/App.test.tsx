import { render, screen } from '@testing-library/react';
import App from '../App';
import user from '@testing-library/user-event';

it('should render main page', async () => {
  render(<App />);
  const buttonCount = await screen.findByRole('button');
  expect(buttonCount.innerHTML).toBe('count is 0');

  await user.click(buttonCount);
  await user.click(buttonCount);
  expect(buttonCount.innerHTML).toBe('count is 2');
  expect(screen.queryByText(/The count is now:/)).toBeInTheDocument();
});
