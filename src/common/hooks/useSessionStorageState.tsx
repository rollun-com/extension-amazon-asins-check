import { useState } from 'react';

type UseSessionStorageState = <T>(
  variableName: string,
  defaultValue?: T,
) => [
  T extends undefined ? T | null : T,
  (newState: T extends undefined ? T | null : T) => void,
];

const useSessionStorageState: UseSessionStorageState = <T extends any>(
  variableName: string,
  defaultValue?: T,
) => {
  const [state, setState] = useState<T extends undefined ? T | null : T>(
    JSON.parse(
      sessionStorage.getItem(variableName) ||
        JSON.stringify(defaultValue) ||
        'null',
    ),
  );

  const setSessionState = (newState: T extends undefined ? T | null : T) => {
    setState(() => {
      sessionStorage.setItem(variableName, JSON.stringify(newState));
      return newState;
    });
  };

  return [state, setSessionState];
};

export { useSessionStorageState };
