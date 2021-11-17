import React, { FC } from 'react';
import { SupplierInfo } from 'pages/SearchRidsPage/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CatalogCsnsInfoProps {
  suppliers: SupplierInfo[] | undefined;
}

const CatalogCsnsInfo: FC<CatalogCsnsInfoProps> = ({ suppliers }) => {
  return suppliers ? (
    <>
      <Typography variant="h6">
        <Box fontWeight="bold">Csns for this item: </Box>
      </Typography>

      {suppliers.map(({ sr_name, price, csn }) => (
        <Typography>{`${sr_name}: ${csn} ($${(+price).toFixed(
          2,
        )})`}</Typography>
      ))}
    </>
  ) : null;
};

export default CatalogCsnsInfo;
