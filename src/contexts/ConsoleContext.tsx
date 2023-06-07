import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type History = {
  id: string;
  expression: string;
};

export const CONSOLE_INIT_TEXT = '0' as const;

const ConsoleContext = createContext<Array<any>>([]);

export const ConsoleProvider = ({
  initValue = CONSOLE_INIT_TEXT,
  initHistories = new Array<History>(),
  children,
}: Record<string, any>) => {
  const [text, setText] = useState(initValue);
  const [calculatedFlag, setCalculatedFlag] = useState(false);
  const [histories, setHistories] = useState(initHistories);
  const contextValue = useMemo(
    () => [text, setText, calculatedFlag, setCalculatedFlag, histories, setHistories],
    [text, setText, calculatedFlag, setCalculatedFlag, histories, setHistories],
  );
  return <ConsoleContext.Provider value={contextValue}>{children}</ConsoleContext.Provider>;
};

export const useConsole = () => {
  const [text, setText, calculatedFlag, setCalculatedFlag, histories, setHistories] =
    useContext(ConsoleContext);

  const handleInputText = useCallback(
    (
      operateCallback: (currentText: string, isCalculated: boolean) => string,
      isNeedFormat: (currentText: string) => boolean,
      isCalculated = false,
    ) => {
      let formattedText = text;
      if (isNeedFormat(formattedText)) {
        formattedText = formattedText.slice(0, formattedText.length - 1);
      }
      const newText = operateCallback(formattedText, calculatedFlag);
      if (isCalculated) {
        const time = new Date().getTime();
        setHistories([...histories, { id: time, expression: text }]);
      }
      setText(newText);
      setCalculatedFlag(isCalculated);
    },
    [text, calculatedFlag, histories],
  );

  const skipToHistory = useCallback(
    (historyId: string) => {
      const index = histories.findIndex((it: History) => it.id === historyId);
      setText(histories[index].expression);
      setHistories(histories.slice(0, index));
    },
    [histories],
  );

  const clearHistory = useCallback(() => setHistories(new Array<History>()), []);

  return { value: text, onChange: handleInputText, histories, skipToHistory, clearHistory };
};
