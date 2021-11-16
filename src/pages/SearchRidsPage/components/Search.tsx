import React, { useContext } from 'react';
import SearchRidsContext from 'pages/SearchRidsPage/SearchRidsContext';
import ItemPreview from 'pages/SearchRidsPage/components/ItemPreview';
import StartSearchButton from 'pages/SearchRidsPage/components/StartSearchButton';
import SearchControls from 'pages/SearchRidsPage/components/SearchControls';

const Search = () => {
  const context = useContext(SearchRidsContext);

  return context?.isSearchInProgress ? (
    <>
      <SearchControls />
      <ItemPreview />
    </>
  ) : (
    <StartSearchButton />
  );
};

export default Search;
