import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CatalogItemInfo } from 'pages/SearchRidsPage/hooks';
import CatalogCsnsInfo from 'pages/SearchRidsPage/components/CatalogCsnsInfo';

interface CatalogInfoProps {
  catalogInfo: CatalogItemInfo | null | undefined;
  asinist: number | undefined;
  notes: string | undefined;
}

const CatalogInfo: FC<CatalogInfoProps> = ({ catalogInfo, asinist, notes }) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
      <Typography variant="h6">
        <Box fontWeight="bold">Catalog info: </Box>
      </Typography>
      <Typography>{catalogInfo?.title || 'no title'}</Typography>
      <Typography>Rid: {catalogInfo?.rid || '-'}</Typography>
      <Typography>Brand: {catalogInfo?.brand || '-'}</Typography>
      <Typography>Mpn: {catalogInfo?.mpn || '-'}</Typography>
      <Typography>Asinist: {asinist || '-'}</Typography>
      <Typography>Notes: {notes || '-'}</Typography>
      <CatalogCsnsInfo suppliers={catalogInfo?.suppliers} />
    </Box>
  );
};

export default CatalogInfo;
