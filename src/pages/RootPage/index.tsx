import RootContext from 'pages/RootPage/RootContext';
import UploadRidsPage from 'pages/UploadRidsPage';
import SearchRidsPage from 'pages/SearchRidsPage';
import { RidWithAsin } from 'pages/UploadRidsPage/hooks';
import { useSessionStorageState } from 'common/hooks';

const Root = () => {
  const [searchData, setSearchData] = useSessionStorageState<
    RidWithAsin[] | null
  >('searchData', null);

  return (
    <RootContext.Provider
      value={{
        searchData,
        setSearchData,
      }}
    >
      {searchData === null ? (
        <UploadRidsPage />
      ) : (
        <SearchRidsPage search={searchData} />
      )}
    </RootContext.Provider>
  );
};

export default Root;
