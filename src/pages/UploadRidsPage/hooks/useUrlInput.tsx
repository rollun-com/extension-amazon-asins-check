import { ChangeEvent, useState } from 'react';

type UseUrlInput = (initialValue: string) => {
  url: string;
  setUrl: (e: ChangeEvent<HTMLInputElement>) => void;
  isUrlValid: boolean;
};

const useUrlInput: UseUrlInput = (initialValue?: string) => {
  const [url, setUrl] = useState(initialValue ?? '');
  const [isUrlValid, setIsUrlValid] = useState(true);

  const setUrlFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setIsUrlValid(
      /^https:\/\/rollun\.net\/api\/datastore\/AmazonMsinRidCheck/.test(value),
    );
    setUrl(value);
  };

  return { url, setUrl: setUrlFromEvent, isUrlValid };
};

export { useUrlInput };
