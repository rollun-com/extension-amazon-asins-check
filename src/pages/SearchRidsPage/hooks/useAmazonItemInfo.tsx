import { RequestState, useLazyQuery } from 'common/hooks';

export type AmazonItemInfo = {
  bcp: string;
  mpn: string;
  price: string;
};

type UseAmazonItemInfo = () => [
  RequestState<any>,
  (url: string) => Promise<AmazonItemInfo | null>,
];
const useAmazonItemInfo: UseAmazonItemInfo = () => {
  const [res, getByUrl] = useLazyQuery();

  const getItemInfoByUrl = async (
    url: string,
  ): Promise<AmazonItemInfo | null> => {
    const data = await getByUrl(url);

    if (data === null) {
      return null;
    }

    return {
      bcp: '',
      mpn: '',
      price: '',
    };
  };

  return [res, getItemInfoByUrl];
};

export { useAmazonItemInfo };
