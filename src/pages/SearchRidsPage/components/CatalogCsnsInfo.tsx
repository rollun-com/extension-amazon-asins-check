import React, { FC } from 'react';
import { SrInfo } from 'pages/SearchRidsPage/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CatalogCsnsInfoProps {
  suppliers: SrInfo[] | undefined;
}

const ItemPrice: FC<SrInfo> = ({
  supplier_name,
  retail_price,
  dealer_price,
  csn,
}) => (
  <Typography>{`${supplier_name}: ${csn} ($${(+retail_price).toFixed(
    2,
  )}) - dealer price($${dealer_price})`}</Typography>
);

const CatalogCsnsInfo: FC<CatalogCsnsInfoProps> = ({ suppliers }) => {
  return suppliers ? (
    <>
      <Typography variant="h6">
        <Box fontWeight="bold">Csns for this item: </Box>
      </Typography>

      {suppliers.map((item) => (
        <ItemPrice {...item} key={item.csn} />
      ))}
    </>
  ) : null;
};

export default CatalogCsnsInfo;
