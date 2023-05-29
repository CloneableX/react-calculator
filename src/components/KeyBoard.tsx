import { useConsole } from '@/contexts/ConsoleContext';
import { Key } from '@/components/Key';

export const KeyBoard = () => {
  const { onChange: handleInputText } = useConsole();
  const keys = [];
  for (let i = 0; i < 10; i++) {
    keys[i] = (
      <Key value={i} xs={4} onClick={handleInputText}>
        {i}
      </Key>
    );
  }
  return <>{...keys}</>;
};
