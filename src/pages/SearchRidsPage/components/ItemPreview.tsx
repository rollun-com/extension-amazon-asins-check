import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import { useItemInfo } from 'pages/SearchRidsPage/hooks';
import { RequestStatus } from 'common/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorText from 'UI/ErrorText';
import { formatImageUrl } from 'common/formatImageUrl';
import Box from '@mui/material/Box';
import SelectDecision from 'pages/SearchRidsPage/components/SelectDecision';
import CatalogInfo from 'pages/SearchRidsPage/components/CatalogInfo';
import AmazonInfo from 'pages/SearchRidsPage/components/AmazonInfo';

const ItemPreview = () => {
  const { status, result, description } = useItemInfo();

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: 'rgb(254, 189, 105)' }}>
      {status === RequestStatus.Loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : status === RequestStatus.Error ? (
        <ErrorText text={description} />
      ) : (
        <>
          <CardMedia
            component="img"
            sx={{ backgroundColor: 'white' }}
            height="280"
            image={formatImageUrl(result?.catalog?.image)}
            alt="item image"
          />
          <CardContent>
            <AmazonInfo amazonInfo={result?.amazon} />
            <CatalogInfo
              catalogInfo={result?.catalog}
              asinist={result?.asinist}
              notes={result?.notes}
            />
          </CardContent>
          <CardActions>
            <SelectDecision id={result?.id} rid={result?.catalog?.rid} />
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ItemPreview;
