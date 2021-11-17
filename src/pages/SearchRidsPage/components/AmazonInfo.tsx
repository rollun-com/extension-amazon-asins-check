import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AmazonItemInfo } from 'pages/SearchRidsPage/hooks';

interface AmazonInfoProps {
  amazonInfo: AmazonItemInfo | null | undefined;
}

const AmazonInfo: FC<AmazonInfoProps> = ({ amazonInfo }) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
      <Typography variant="h6">
        <Box fontWeight="bold">Amazon info: </Box>
      </Typography>
      <Typography>Mpn: {amazonInfo?.bsr || '-'}</Typography>
      <Typography>Asinist: {amazonInfo?.mpn || '-'}</Typography>
      <Typography>Notes: {amazonInfo?.brand || '-'}</Typography>
    </Box>
  );
};

export default AmazonInfo;
