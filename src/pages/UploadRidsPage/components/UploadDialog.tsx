import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import UploadRidsContext from 'pages/UploadRidsPage/UploadRidsContext';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import DialogTitle from '@mui/material/DialogTitle';
import { useGetRidsWithAsins, useUrlInput } from 'pages/UploadRidsPage/hooks';
import { CircularProgress } from '@mui/material';
import ErrorText from 'UI/ErrorText';
import { RequestStatus } from 'common/hooks';

const UploadDialog = () => {
  const context = useContext(UploadRidsContext);
  const { url, setUrl, isUrlValid } = useUrlInput('');
  const [{ status, description }, getRidsWithAsinsByUrl] =
    useGetRidsWithAsins();

  return (
    <Dialog open={!!context?.isModalOpen} onClose={context?.closeModal}>
      {status === RequestStatus.Loading ? (
        <CircularProgress />
      ) : (
        <>
          {status === RequestStatus.Error && (
            <DialogTitle>
              <ErrorText variant="h3" text={description} />
            </DialogTitle>
          )}
          <DialogContent>
            <DialogContentText>
              Please, provide us with full url of
              <Link href="https://rollun.net/AmazonMsinRidCheck">
                {' this page '}
              </Link>
              with filter, that you want to check
            </DialogContentText>
            <TextField
              label="Url"
              name="url"
              fullWidth
              variant="outlined"
              autoFocus
              value={url}
              onChange={setUrl}
              error={!isUrlValid}
              helperText="Url must be from https://rollun.net/api/datastore/AmazonMsinRidCheck page"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={context?.closeModal}>Cancel</Button>
            <Button
              disabled={!isUrlValid}
              onClick={async () =>
                context?.setResult(await getRidsWithAsinsByUrl(url))
              }
            >
              Submit
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default UploadDialog;
