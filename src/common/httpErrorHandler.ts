import _ from 'lodash';

const httpErrorHandler = (
  err: any,
  callback: (code: number, text: string) => void,
) => {
  if (err.isAxiosError) {
    const {
      response: { statusText, data = '' },
    } = err;
    const stringResponseBody =
      typeof data === 'string'
        ? data
        : Object.entries(data)
            .map((row) => row.join(': '))
            .join(', ');
    callback(
      err?.response?.status || 0,
      `${statusText ? `${statusText}. ` : ''}${
        data.message || stringResponseBody
      }`,
    );
  } else if (_.isFunction(err.text)) {
    err.text().then((e: string) => {
      try {
        const json = JSON.parse(e);
        callback(err.status, json.error || e);
      } catch (parsingError) {
        callback(err.status, e);
      }
    });
  } else if (err.message) {
    callback(0, err.message);
  } else if (err.error) {
    callback(500, err.error);
  } else {
    callback(0, 'Unknown error');
  }
};

const httpErrorHandlerPromised = (
  err: any,
): Promise<{ code: number; text: string }> =>
  new Promise((resolve) =>
    httpErrorHandler(err, (code, text) =>
      resolve({
        code,
        text,
      }),
    ),
  );

export { httpErrorHandlerPromised, httpErrorHandler };
