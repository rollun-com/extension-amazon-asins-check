import React from 'react';
import Button from '@mui/material/Button';
import { useResetSearch } from 'pages/SearchRidsPage/hooks';

const ResetSearchButton = () => {
  const resetSearch = useResetSearch();

  return (
    <Button onClick={resetSearch} variant="contained" color="error">
      Reset
    </Button>
  );
};

export default ResetSearchButton;
