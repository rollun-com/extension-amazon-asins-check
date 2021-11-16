import React from 'react';
import Box from '@mui/material/Box';
import NextItemButton from 'pages/SearchRidsPage/components/NextItemButton';
import ResetSearchButton from 'pages/SearchRidsPage/components/ResetSearchButton';

const SearchControls = () => {
  return (
    <Box
      sx={{
        gap: 1,
        mb: 1,
      }}
      display="flex"
    >
      <NextItemButton />
      <ResetSearchButton />
    </Box>
  );
};

export default SearchControls;
