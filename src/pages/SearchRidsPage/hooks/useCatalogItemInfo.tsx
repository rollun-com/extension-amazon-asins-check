import { RequestState, useLazyQuery } from 'hooks';
import { CatalogItemInfo } from 'pages/SearchRidsPage/hooks/useItemInfo';

export type SrInfo = {
  csn: string;
  dealer_price: number;
  retail_price: string;
  supplier_name: string;
};
type CatalogItem = {
  rid: string;
  brand: string;
  mpn: string;
  image: string;
  sr_info: SrInfo[];
  title: string;
  description: string | null;
};
type UseCatalogItemInfo = () => [
  RequestState<CatalogItem[]>,
  (url: string) => Promise<CatalogItemInfo | null>,
];

const useCatalogItemInfo: UseCatalogItemInfo = () => {
  const [res, getByUrl] = useLazyQuery<CatalogItem[]>();

  const formatCatalogData = (data: CatalogItem): CatalogItemInfo | null => {
    const { rid, description, sr_info, mpn, image, title, brand } = data;

    return {
      brand,
      description,
      image,
      mpn,
      rid,
      suppliers: sr_info,
      title,
    };
  };

  const getItemInfoByUrl = async (
    url: string,
  ): Promise<CatalogItemInfo | null> => {
    const data = await getByUrl(url);

    if (data === null) {
      return null;
    }

    return formatCatalogData(data[0]);
  };

  return [res, getItemInfoByUrl];
};

export { useCatalogItemInfo };
