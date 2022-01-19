import { useBinarySessionStateControls } from 'hooks';

const useSearchState = (initialSearchState?: boolean) => {
  const { state, setTrue, setFalse } = useBinarySessionStateControls(
    'searchState',
    initialSearchState ?? false,
  );

  return {
    isSearchInProgress: state,
    startSearch: setTrue,
    stopSearch: setFalse,
  };
};

export { useSearchState };
