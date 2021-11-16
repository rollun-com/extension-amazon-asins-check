import React from 'react';
import Typography from '@mui/material/Typography';
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
import { Grid } from '@mui/material';
import SelectDecision from 'pages/SearchRidsPage/components/SelectDecision';

const ItemPreview = () => {
  const { status, result, description } = useItemInfo();

  return (
    <Card sx={{ maxWidth: 345 }}>
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
            height="280"
            image={formatImageUrl(result?.catalog?.image)}
            alt="item image"
          />
          <CardContent>
            <Typography>Rid: {result?.catalog?.rid}</Typography>
            <Typography>Brand: {result?.catalog?.brand}</Typography>
            <Typography>Mpn: {result?.catalog?.mpn}</Typography>

            {result?.catalog?.mpn ? (
              <Grid container spacing={1}>
                <Grid item lg={2}>
                  <Box fontWeight="bold">Csns for this item: </Box>
                </Grid>

                {result.catalog.suppliers.map(({ sr_name, price, csn }) => (
                  <Grid item lg={2}>
                    <Typography>{`${sr_name}: ${csn} ($${(+price).toFixed(
                      2,
                    )})`}</Typography>
                  </Grid>
                ))}
              </Grid>
            ) : null}
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
