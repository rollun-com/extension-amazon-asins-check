import { useState } from 'react';
import { httpErrorHandlerPromised } from 'common/httpErrorHandler';
import { httpClient } from 'common/httpClient';
import { AxiosResponse } from 'axios';

type UseLazyQuery = <T>() => [
  RequestState<T>,
  (
    url: string,
    options?: {
      method?: HttpRequestMethods;
      body: Record<string, any>;
    },
  ) => Promise<T | null>,
];

export type RequestState<T> = {
  status: RequestStatus;
  description: string;
  result: T | null;
};

enum RequestStatus {
  Loading = 'loading',
  Idle = 'idle',
  Error = 'error',
  Loaded = 'loaded',
}

enum HttpRequestMethods {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

const useLazyQuery: UseLazyQuery = <T extends any>() => {
  const [requestState, setRequestState] = useState<RequestState<T>>({
    status: RequestStatus.Idle,
    result: null,
    description: '',
  });

  const changeRequestState = (state: Partial<RequestState<T>>) => {
    setRequestState((prevState) => ({
      ...prevState,
      ...state,
    }));
  };

  const httpMethodStrategy: Record<
    HttpRequestMethods,
    (url: string, body?: Record<string, any>) => Promise<AxiosResponse<T>>
  > = {
    get: (url) => httpClient.get(url),
    post: (url, body) => httpClient.post(url, body),
    put: (url, body) => httpClient.put(url, body),
    delete: (url) => httpClient.get(url),
  };

  const fetchByUrl = async (
    url: string,
    options?: {
      method?: HttpRequestMethods;
      body: Record<string, any>;
    },
  ) => {
    try {
      changeRequestState({
        status: RequestStatus.Loading,
      });
      const method = options?.method || HttpRequestMethods.Get;
      const { data } = await httpMethodStrategy[method](url, options?.body);

      changeRequestState({
        status: RequestStatus.Loaded,
        result: data,
      });

      return data;
    } catch (e) {
      const { text } = await httpErrorHandlerPromised(e);

      changeRequestState({
        status: RequestStatus.Error,
        description: text,
      });
      return null;
    }
  };

  return [requestState, fetchByUrl];
};

export { useLazyQuery, RequestStatus, HttpRequestMethods };
