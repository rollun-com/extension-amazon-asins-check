import { RequestState, useLazyQuery } from 'hooks';
import { CatalogItemInfo } from 'pages/SearchRidsPage/hooks/useItemInfo';

type CatalogItem = {
  rid: string;
  brand: string;
  mpn: string;
  image: string;
  price: string;
  csn: string;
  sr_name: string;
  title: string;
  description: string | null;
};
type UseCatalogItemInfo = () => [
  RequestState<CatalogItem[]>,
  (url: string) => Promise<CatalogItemInfo | null>,
];

const useCatalogItemInfo: UseCatalogItemInfo = () => {
  const [res, getByUrl] = useLazyQuery<CatalogItem[]>();

  const formatCatalogData = (data: CatalogItem[]): CatalogItemInfo | null => {
    return data.reduce<CatalogItemInfo | null>((acc, curr) => {
      const { csn, price, sr_name, description, ...rest } = curr;
      const supplierInfo = {
        csn,
        price,
        sr_name,
      };
      const supplierDescriptionInfo = {
        sr_name,
        text: description,
      };

      return {
        ...rest,
        suppliers: [...(acc?.suppliers || []), supplierInfo],
        descriptions: [...(acc?.descriptions || []), supplierDescriptionInfo],
      };
    }, null);
  };

  const getItemInfoByUrl = async (
    url: string,
  ): Promise<CatalogItemInfo | null> => {
    const data = await getByUrl(url);

    if (data === null) {
      return null;
    }

    return formatCatalogData(data);
  };

  return [res, getItemInfoByUrl];
};

export { useCatalogItemInfo };
