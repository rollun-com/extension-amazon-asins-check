import React from 'react';
import { RidWithAsin } from 'pages/UploadRidsPage/hooks';

interface SearchRidsContext {
  isSearchInProgress: boolean;
  stopSearch: () => void;
  startSearch: () => void;
  currentSearchItem: RidWithAsin;
  nextSearchItem: () => void;
  totalSearchCount: number;
  currentSearchIndex: number;
}

const SearchRidsContext = React.createContext<SearchRidsContext | null>(null);

export default SearchRidsContext;
