import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import SearchRidsContext from 'pages/SearchRidsPage/SearchRidsContext';

const NextItemButton = () => {
  const context = useContext(SearchRidsContext);

  return (
    <Button onClick={context?.nextSearchItem} variant="contained">
      Next Item
    </Button>
  );
};

export default NextItemButton;
