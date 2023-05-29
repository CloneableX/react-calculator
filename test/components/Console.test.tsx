import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import { ConsoleProvider, useConsole } from '@/contexts/ConsoleContext';
import { Console } from '@/components/Console';

const ButtonMock = ({ value }: { value: number }) => {
  const { onChange } = useConsole();
  return (
    <button onClick={() => onChange(value)} aria-label={`btn-${value}`}>
      {value}
    </button>
  );
};

describe('console display text', () => {
  it('should should display 0 as initial text', () => {
    render(
      <ConsoleProvider>
        <Console />
      </ConsoleProvider>,
    );

    const consoleEle = screen.queryByTestId('console')!;
    expect(consoleEle.innerHTML).toBe('0');
  });

  it('should display input text', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <ButtonMock value={1} />
      </ConsoleProvider>,
    );
    const button = screen.queryByRole('button')!;
    await user.click(button);
    await user.click(button);

    const consoleEle = screen.queryByTestId('console')!;
    expect(consoleEle.innerHTML).toBe('11');
  });

  it('should display input text suffix 0', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <ButtonMock value={1} />
        <ButtonMock value={0} />
      </ConsoleProvider>,
    );
    const button0 = screen.queryByRole('button', { name: 'btn-0' })!;
    const button1 = screen.queryByRole('button', { name: 'btn-1' })!;
    await user.click(button1);
    await user.click(button0);

    const consoleEle = screen.queryByTestId('console')!;
    expect(consoleEle.innerHTML).toBe('10');
  });

  it('should display 0 when current text is 0 and inputs 0', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <ButtonMock value={0} />
      </ConsoleProvider>,
    );
    const button = screen.queryByRole('button')!;
    await user.click(button);
    await user.click(button);

    const consoleEle = screen.queryByTestId('console')!;
    expect(consoleEle.innerHTML).toBe('0');
  });
});
