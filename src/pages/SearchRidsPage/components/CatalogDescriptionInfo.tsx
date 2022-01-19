import React, { FC } from 'react';
import { SupplierDescriptions } from 'pages/SearchRidsPage/hooks';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CatalogDescriptionInfoProps {
  descriptions?: SupplierDescriptions[];
}

const CatalogDescriptionInfo: FC<CatalogDescriptionInfoProps> = ({
  descriptions,
}) => {
  return descriptions ? (
    <>
      <Typography variant="h6">
        <Box fontWeight="bold">Descriptions for this item: </Box>
      </Typography>

      {descriptions.map(({ sr_name, text }) => (
        <Typography>{`${sr_name}: ${text}`}</Typography>
      ))}
    </>
  ) : null;
};

export default CatalogDescriptionInfo;
