import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import { AdditionKey, EqualityKey, Key, NumberKey } from '@/components/Key';
import { ConsoleProvider } from '@/contexts/ConsoleContext';
import { Console } from '@/components/Console';

describe('Key', () => {
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

const getConsoleText = () => {
  const consoleEle = screen.queryByTestId('console')!;
  return consoleEle.innerHTML;
};

describe('NumberKey', () => {
  it('should display input text', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <NumberKey value={1} />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-1')!;
    await user.click(button);
    await user.click(button);

    expect(getConsoleText()).toBe('11');
  });

  it('should display input text suffix 0', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <NumberKey value={1} />
        <NumberKey value={0} />
      </ConsoleProvider>,
    );
    const button0 = screen.queryByTestId('key-0')!;
    const button1 = screen.queryByTestId('key-1')!;
    await user.click(button1);
    await user.click(button0);

    expect(getConsoleText()).toBe('10');
  });

  it('should display 0 when current text is 0 and inputs 0', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <NumberKey value={0} />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-0')!;
    await user.click(button);
    await user.click(button);

    expect(getConsoleText()).toBe('0');
  });

  it('should replace 0 after clicking other number buttons when first digit of number is 0', async () => {
    render(
      <ConsoleProvider initValue="10+0">
        <Console />
        <NumberKey value={1} />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-1')!;
    await user.click(button);

    expect(getConsoleText()).toBe('10+1');
  });
});

describe('AdditionKey', () => {
  const clickAdditionKey = async () => {
    const button = screen.queryByTestId('key-addition')!;
    await user.click(button);
  };

  it('should display addition char when click addition button', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <AdditionKey />
      </ConsoleProvider>,
    );
    await clickAdditionKey();

    expect(getConsoleText()).toBe('0+');
  });

  it('should replace char when last char is operator and click addition button', async () => {
    render(
      <ConsoleProvider initValue="10+">
        <Console />
        <AdditionKey />
      </ConsoleProvider>,
    );
    await clickAdditionKey();

    expect(getConsoleText()).toBe('10+');
  });
});

describe('EqualityKey', () => {
  const clickEqualityKey = async () => {
    const button = screen.queryByTestId('key-equality')!;
    await user.click(button);
  };

  it('should print result when click equality button', async () => {
    render(
      <ConsoleProvider initValue="1+9">
        <Console />
        <EqualityKey />
      </ConsoleProvider>,
    );
    await clickEqualityKey();

    expect(getConsoleText()).toBe('10');
  });

  it('should cancel last operator without number after last operator when click equality button', async () => {
    render(
      <ConsoleProvider initValue="1+9+">
        <Console />
        <EqualityKey />
      </ConsoleProvider>,
    );
    await clickEqualityKey();

    expect(getConsoleText()).toBe('10');
  });
});
