import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ConsoleContext = createContext<Array<any>>([]);

export const ConsoleProvider = ({ children }: Record<string, any>) => {
  const [text, setText] = useState('0');
  const contextValue = useMemo(() => [text, setText], [text, setText]);
  return <ConsoleContext.Provider value={contextValue}>{children}</ConsoleContext.Provider>;
};

export const useConsole = () => {
  const [text, setText] = useContext(ConsoleContext);

  const handleInputText = useCallback(
    (value: any) => {
      if (value === 0 && text === '0') {
        return;
      }
      setText((currentText: string) => {
        if (currentText === '0') return `${value}`;
        return `${currentText}${value}`;
      });
    },
    [text],
  );

  return { value: text, onChange: handleInputText };
};
