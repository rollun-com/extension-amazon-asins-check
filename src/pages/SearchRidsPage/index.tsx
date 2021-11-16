import React, { FC } from 'react';
import SearchRidsContext from 'pages/SearchRidsPage/SearchRidsContext';
import { RidWithAsin } from 'pages/UploadRidsPage/hooks';
import {
  useSearchDataWithControls,
  useSearchState,
} from 'pages/SearchRidsPage/hooks';
import Search from 'pages/SearchRidsPage/components/Search';

interface SearchRidsPageProps {
  search: RidWithAsin[];
}

const SearchRidsPage: FC<SearchRidsPageProps> = ({ search }) => {
  const searchDataWithControls = useSearchDataWithControls(search);
  const searchState = useSearchState();

  return (
    <SearchRidsContext.Provider
      value={{
        ...searchState,
        ...searchDataWithControls,
      }}
    >
      <Search />
    </SearchRidsContext.Provider>
  );
};

export default SearchRidsPage;
