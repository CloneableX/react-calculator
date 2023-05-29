import { Button, Grid } from '@mui/material';

type KeyProps = {
  value: number;
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
