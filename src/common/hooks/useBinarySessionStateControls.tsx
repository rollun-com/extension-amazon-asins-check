import { createBinaryStateControls } from 'common/binaryStateConrolsFactory';
import { useSessionStorageState } from 'common/hooks';

type UseBinarySessionStateControls = (
  variableName: string,
  initialState?: boolean,
) => {
  state: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

const useBinarySessionStateControls: UseBinarySessionStateControls = (
  variableName,
  initialState,
) => {
  const [state, setState] = useSessionStorageState<boolean>(
    variableName,
    initialState ?? false,
  );

  return {
    state,
    ...createBinaryStateControls(setState),
  };
};

export { useBinarySessionStateControls };
