import { AdditionKey, EqualityKey, NumberKey } from '@/components/Key';

export const KeyBoard = () => {
  const keys = [];
  for (let i = 0; i < 10; i++) {
    keys[i] = (
      <NumberKey value={i} xs={4}>
        {i}
      </NumberKey>
    );
  }
  keys.push(<AdditionKey xs={4} />);
  keys.push(<EqualityKey xs={4} />);
  return <>{...keys}</>;
};
