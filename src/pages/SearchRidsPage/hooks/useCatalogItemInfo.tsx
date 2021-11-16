import { useLazyQuery } from 'common/hooks';

type CatalogItem = {
  rid: string;
  brand: string;
  mpn: string;
  image: string;
  price: string;
  csn: string;
  sr_name: string;
};

const useCatalogItemInfo = () => {
  return useLazyQuery<CatalogItem[]>();
};

export { useCatalogItemInfo };
