import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import SearchRidsContext from 'pages/SearchRidsPage/SearchRidsContext';

const StartSearchButton = () => {
  const context = useContext(SearchRidsContext);

  const startSearch = () => {
    context?.startSearch();
    context?.nextSearchItem();
  };

  return (
    <Button onClick={startSearch} color="success" variant="contained">
      Start search
    </Button>
  );
};

export default StartSearchButton;
