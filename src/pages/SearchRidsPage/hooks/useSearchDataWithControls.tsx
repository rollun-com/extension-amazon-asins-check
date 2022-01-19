import { RidWithAsin } from 'pages/UploadRidsPage/hooks';
import { useSessionStorageState } from 'hooks';

const useSearchDataWithControls = (search: RidWithAsin[]) => {
  const [searchIndex, setSearchIndex] = useSessionStorageState(
    'searchIndex',
    -1,
  );

  const nextSearchItem = () => {
    const newIndex = searchIndex + 1;

    if (newIndex === search.length) {
      return alert('This is the last item');
    }

    setSearchIndex(newIndex);
    window.location.href = `https://www.amazon.com/s?k=${search[newIndex].asin}&i=automotive-intl-ship&ref=nb_sb_noss`;
  };

  return {
    currentSearchItem: search[searchIndex],
    nextSearchItem,
    totalSearchCount: search.length,
    currentSearchIndex: searchIndex,
  };
};

export { useSearchDataWithControls };
