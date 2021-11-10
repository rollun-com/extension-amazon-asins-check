import React, { useContext } from 'react';
import { Button } from '@mui/material';
import UploadRidsContext from 'pages/UploadRidsPage/UploadRidsContext';

const UploadButton = () => {
  const context = useContext(UploadRidsContext);

  return (
    <Button color="warning" variant="contained" onClick={context?.openModal}>
      Upload
    </Button>
  );
};

export default UploadButton;
