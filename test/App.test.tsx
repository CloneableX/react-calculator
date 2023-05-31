import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import App from '@/App';

it('should add numbers', async () => {
  render(<App />);
  const button0 = screen.queryByTestId('key-0')!;
  const button1 = screen.queryByTestId('key-1')!;
  const button2 = screen.queryByTestId('key-2')!;
  const buttonAdd = screen.queryByTestId('key-addition')!;
  const buttonSub = screen.queryByTestId('key-subtraction')!;
  const buttonMul = screen.queryByTestId('key-multiplication')!;
  const buttonDiv = screen.queryByTestId('key-division')!;
  const buttonEql = screen.queryByTestId('key-equality')!;

  await user.click(button1);
  await user.click(buttonAdd);
  await user.click(button1);
  await user.click(button0);
  await user.click(buttonSub);
  await user.click(button1);
  await user.click(buttonMul);
  await user.click(button2);
  await user.click(buttonAdd);
  await user.click(button2);
  await user.click(buttonDiv);
  await user.click(button1);
  await user.click(buttonEql);

  const consoleEle = screen.queryByTestId('console')!;
  expect(consoleEle.innerHTML).toBe('11');
});
