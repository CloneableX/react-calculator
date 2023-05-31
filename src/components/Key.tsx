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
          (currentText, isCalculated) => (isCalculated ? `${value}` : `${currentText}${value}`),
          (currentText: string) => currentText === '0' || /\D0$/.test(currentText),
        );
        clickHandle(value);
      }}
      {...props}
    />
  );
};

type OperatorKeyProps = {
  value: string;
  onClick?: (value: number | string) => void;
  operateCallback: (currentText: string) => string;
  isCalculated?: boolean;
} & Record<string, any>;

export const OperatorKey = ({
  onClick: clickHandle = () => {},
  operateCallback,
  isCalculated = false,
  ...props
}: OperatorKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      onClick={(value: number | string) => {
        handleInputText(
          operateCallback,
          (currentText: string) => /\D$/.test(currentText),
          isCalculated,
        );
        clickHandle(value);
      }}
      {...props}
    />
  );
};

export const AdditionKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="addition"
      operateCallback={(currentText: string) => `${currentText}+`}
      {...props}
    >
      +
    </OperatorKey>
  );
};

export const SubtractionKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="subtraction"
      operateCallback={(currentText: string) => `${currentText}-`}
      {...props}
    >
      -
    </OperatorKey>
  );
};

export const MultiplicationKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="multiplication"
      operateCallback={(currentText: string) => `${currentText}*`}
      {...props}
    >
      -
    </OperatorKey>
  );
};

export const DivisionKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="division"
      operateCallback={(currentText: string) => `${currentText}/`}
      {...props}
    >
      /
    </OperatorKey>
  );
};

export const EqualityKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="equality"
      operateCallback={(currentText: string) => {
        // eslint-disable-next-line no-eval
        return eval(currentText);
      }}
      isCalculated
      {...props}
    >
      =
    </OperatorKey>
  );
};
