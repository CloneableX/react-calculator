import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ConsoleContext = createContext<Array<any>>([]);

export const ConsoleProvider = ({ initValue = '0', children }: Record<string, any>) => {
  const [text, setText] = useState(initValue);
  const contextValue = useMemo(() => [text, setText], [text, setText]);
  return <ConsoleContext.Provider value={contextValue}>{children}</ConsoleContext.Provider>;
};

export const useConsole = () => {
  const [text, setText] = useContext(ConsoleContext);

  const handleInputText = useCallback(
    (
      operateCallback: (currentText: string) => string,
      isNeedFormat: (currentText: string) => boolean,
    ) => {
      let formattedText = text;
      if (isNeedFormat(formattedText)) {
        formattedText = formattedText.slice(0, formattedText.length - 1);
      }
      const newText = operateCallback(formattedText);
      setText(newText);
    },
    [text],
  );

  return { value: text, onChange: handleInputText };
};
