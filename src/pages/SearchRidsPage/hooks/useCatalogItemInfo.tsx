import { RequestState, useLazyQuery } from 'common/hooks';
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
};
type UseCatalogItemInfo = () => [
  RequestState<CatalogItem[]>,
  (url: string) => Promise<CatalogItemInfo | null>,
];

const useCatalogItemInfo: UseCatalogItemInfo = () => {
  const [res, getByUrl] = useLazyQuery<CatalogItem[]>();

  const formatCatalogData = (data: CatalogItem[]): CatalogItemInfo | null => {
    return data.reduce<CatalogItemInfo | null>((acc, curr) => {
      const { brand, mpn, rid, image, csn, price, sr_name, title } = curr;
      const supplierInfo = {
        csn,
        price,
        sr_name,
      };

      return {
        brand,
        mpn,
        rid,
        image,
        title,
        suppliers: [...(acc?.suppliers || []), supplierInfo],
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
