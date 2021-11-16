import { useBinarySessionStateControls } from 'common/hooks';

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
