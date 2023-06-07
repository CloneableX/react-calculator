import { queryByText, render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import App from '@/App';
import { CONSOLE_INIT_TEXT } from '@/contexts/ConsoleContext';

it('should calculate numbers', async () => {
  render(<App />);
  const button0 = screen.queryByTestId('key-0')!;
  const button1 = screen.queryByTestId('key-1')!;
  const button2 = screen.queryByTestId('key-2')!;
  const buttonAdd = screen.queryByTestId('key-addition')!;
  const buttonSub = screen.queryByTestId('key-subtraction')!;
  const buttonMul = screen.queryByTestId('key-multiplication')!;
  const buttonDiv = screen.queryByTestId('key-division')!;
  const buttonDot = screen.queryByTestId('key-dot')!;
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
  await user.click(buttonAdd);
  await user.click(button1);
  await user.click(buttonDot);
  await user.click(button1);
  await user.click(buttonEql);

  const consoleEle = screen.queryByTestId('console')!;
  expect(consoleEle.innerHTML).toBe('12.1');

  const buttonBack = screen.queryByTestId('key-backspace')!;
  const buttonClear = screen.queryByTestId('key-clear')!;

  await user.click(buttonBack);
  expect(consoleEle.innerHTML).toBe('12.');

  await user.click(buttonClear);
  expect(consoleEle.innerHTML).toBe(CONSOLE_INIT_TEXT);
});

it('should operate calculation histories', async () => {
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

  const historyEle = screen.queryByTestId('history')!;
  expect(queryByText(historyEle, '1+10')).not.toBeNull();
});
