import {
  AdditionKey,
  DivisionKey,
  EqualityKey,
  MultiplicationKey,
  NumberKey,
  SubtractionKey,
} from '@/components/Key';

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
  keys.push(<SubtractionKey xs={4} />);
  keys.push(<MultiplicationKey xs={4} />);
  keys.push(<DivisionKey xs={4} />);
  keys.push(<EqualityKey xs={4} />);
  return <>{...keys}</>;
};
