import React from 'react';
import { RidWithAsin } from 'pages/UploadRidsPage/hooks';

type RootContext = {
  searchData: RidWithAsin[] | null;
  setSearchData: (data: RidWithAsin[] | null) => void;
};
const RootContext = React.createContext<RootContext | null>(null);

export default RootContext;
