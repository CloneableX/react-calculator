import { Button, Grid } from '@mui/material';

import { useConsole } from '@/contexts/ConsoleContext';

type KeyProps = {
  value: number | string;
  onClick: (value: number | string) => void;
} & Record<string, any>;

export const Key = ({ value, children, onClick: clickHandle, ...props }: KeyProps) => {
  return (
    <Grid
      item
      key={value}
      onClick={() => clickHandle(value)}
      component={Button}
      {...props}
      data-testid={`key-${value}`}
    >
      {children}
    </Grid>
  );
};

type NumberKeyProps = {
  value: number | string;
  onClick?: (value: number | string) => void;
} & Record<string, any>;

export const NumberKey = ({ onClick: clickHandle = () => {}, ...props }: NumberKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      onClick={(value: number | string) => {
        handleInputText(
          (currentText: string) => `${currentText}${value}`,
          (currentText: string) => currentText === '0' || /\D0$/.test(currentText),
        );
        clickHandle(value);
      }}
      {...props}
    />
  );
};

type OperatorKeyProps = {
  onClick?: (value: number | string) => void;
} & Record<string, any>;

export const AdditionKey = ({ onClick: clickHandle = () => {}, ...props }: OperatorKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      value="addition"
      onClick={(value: number | string) => {
        handleInputText(
          (currentText: string) => `${currentText}+`,
          (currentText: string) => /\D$/.test(currentText),
        );
        clickHandle(value);
      }}
      {...props}
    >
      +
    </Key>
  );
};

export const SubtractionKey = ({ onClick: clickHandle = () => {}, ...props }: OperatorKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      value="subtraction"
      onClick={(value: number | string) => {
        handleInputText(
          (currentText: string) => `${currentText}-`,
          (currentText: string) => /\D$/.test(currentText),
        );
        clickHandle(value);
      }}
      {...props}
    >
      -
    </Key>
  );
};

export const EqualityKey = ({ onClick: clickHandle = () => {}, ...props }: OperatorKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      value="equality"
      onClick={(value: number | string) => {
        handleInputText(
          // eslint-disable-next-line no-eval
          (currentText: string) => eval(currentText),
          (currentText: string) => /\D$/.test(currentText),
        );
        clickHandle(value);
      }}
      {...props}
    >
      =
    </Key>
  );
};
