import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { useSelectDecision } from 'pages/SearchRidsPage/hooks';
import { RequestStatus } from 'common/hooks';
import LinearProgress from '@mui/material/LinearProgress';

interface SelectDecisionProps {
  rid: string | undefined;
  id: string | undefined;
}

const SelectDecision: FC<SelectDecisionProps> = ({ rid, id }) => {
  const {
    status,
    description,
    handlers: { handleEmpty, handleNo, handleYes },
  } = useSelectDecision();

  if (!rid || !id) {
    console.error(`SelectDecision: rid or id prop was not provided`);
    return null;
  }

  if (status === RequestStatus.Error) {
    alert(description);
  }

  if (status === RequestStatus.Loaded) {
    alert(`Item with rid ${rid} has been process, you can move to next one`);
  }

  return (
    <>
      <Button
        fullWidth
        disabled={status === RequestStatus.Loading}
        color="error"
        variant="contained"
        onClick={() => handleNo(id, rid)}
      >
        No
      </Button>
      <Button
        fullWidth
        disabled={status === RequestStatus.Loading}
        color="warning"
        variant="contained"
        onClick={() => handleEmpty(id, rid)}
      >
        Empty
      </Button>
      <Button
        fullWidth
        disabled={status === RequestStatus.Loading}
        color="success"
        variant="contained"
        onClick={() => handleYes(id, rid)}
      >
        Yes
      </Button>
      {status === RequestStatus.Loading && <LinearProgress />}
    </>
  );
};

export default SelectDecision;
