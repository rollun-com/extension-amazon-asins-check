import { createBinaryStateControls } from 'common/binaryStateConrolsFactory';
import { useState } from 'react';

type UseBinaryStateControls = (initialState?: boolean) => {
  state: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

const useBinaryStateControls: UseBinaryStateControls = (initialState) => {
  const [state, setState] = useState<boolean>(initialState ?? false);

  return {
    state,
    ...createBinaryStateControls(setState),
  };
};

export { useBinaryStateControls };
