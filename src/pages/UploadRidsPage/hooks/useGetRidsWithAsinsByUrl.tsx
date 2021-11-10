import { useState } from 'react';
import { httpErrorHandlerPromised } from 'common/httpErrorHandler';
import { httpClient } from 'common/httpClient';

type UseGetRidsWithAsinsByUrl = () => [RequestState, (url: string) => void];
enum RequestStatus {
  Loading = 'loading',
  Idle = 'idle',
  Error = 'error',
  Loaded = 'loaded',
}
type RequestState = {
  status: RequestStatus;
  description: string;
  result: any | null;
};

const useGetRidsWithAsinsByUrl: UseGetRidsWithAsinsByUrl = () => {
  const [requestState, setRequestState] = useState<RequestState>({
    status: RequestStatus.Idle,
    result: null,
    description: '',
  });

  const changeRequestState = (state: Partial<RequestState>) => {
    setRequestState((prevState) => ({
      ...prevState,
      ...state,
    }));
  };

  const fetchByUrl = async (url: string) => {
    try {
      changeRequestState({
        status: RequestStatus.Loading,
      });
      const { data } = await httpClient.get(url);

      changeRequestState({
        status: RequestStatus.Loaded,
        result: data,
      });
    } catch (e) {
      const { text } = await httpErrorHandlerPromised(e);

      changeRequestState({
        status: RequestStatus.Error,
        description: text,
      });
    }
  };

  return [requestState, fetchByUrl];
};

export { useGetRidsWithAsinsByUrl, RequestStatus };
