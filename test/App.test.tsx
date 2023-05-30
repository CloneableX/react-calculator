import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import App from '@/App';

it('should add numbers', async () => {
  render(<App />);
  const button0 = screen.queryByTestId('key-0')!;
  const button1 = screen.queryByTestId('key-1')!;
  const buttonAdd = screen.queryByTestId('key-addition')!;
  const buttonEql = screen.queryByTestId('key-equality')!;

  await user.click(button1);
  await user.click(buttonAdd);
  await user.click(button1);
  await user.click(button0);
  await user.click(buttonEql);

  const consoleEle = screen.queryByTestId('console')!;
  expect(consoleEle.innerHTML).toBe('11');
});
