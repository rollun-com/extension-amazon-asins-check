import { useCallback, useContext, useEffect, useState } from 'react';
import {
  SrInfo,
  useCatalogItemInfo,
} from 'pages/SearchRidsPage/hooks/useCatalogItemInfo';
import {
  AmazonItemInfo,
  useAmazonItemInfo,
} from 'pages/SearchRidsPage/hooks/useAmazonItemInfo';
import { Eq, Limit, Query, QueryStringifier, Select } from 'rollun-ts-rql';
import SearchRidsContext from 'pages/SearchRidsPage/SearchRidsContext';

export type SupplierInfo = {
  price: string;
  csn: string;
  sr_name: string;
};

export type SupplierDescriptions = {
  sr_name: string;
  text: string | null;
};

export type CatalogItemInfo = {
  rid: string;
  brand: string;
  mpn: string;
  image: string;
  title: string;
  description: string | null;
  suppliers: SrInfo[];
};

export type ItemInfo = {
  id: string | undefined;
  asinist: number | undefined;
  notes: string | undefined;
  catalog: CatalogItemInfo | null;
  amazon: AmazonItemInfo | null;
};

const useItemInfo = () => {
  const context = useContext(SearchRidsContext);

  const [catalogResult, getCatalogInfoByUrl] = useCatalogItemInfo();
  const [, getAmazonItemByUrl] = useAmazonItemInfo();
  const [result, setResult] = useState<ItemInfo | null>(null);

  const getItemInfo = useCallback(async () => {
    const [catalogInfo, amazonInfo] = await Promise.allSettled([
      getCatalogInfoByUrl(
        `https://rollun.net/api/datastore/AmazonMsinRidCheckData?${QueryStringifier.stringify(
          new Query()
            .setQuery(new Eq('rid', context?.currentSearchItem.rid))
            .setLimit(new Limit(1))
            .setSelect(
              new Select([
                'rid',
                'image',
                'brand',
                'mpn',
                'title',
                'sr_info',
                'description',
              ]),
            ),
        )}`,
      ),
      getAmazonItemByUrl(
        `https://www.amazon.com/dp/${context?.currentSearchItem.asin}/`,
      ),
    ]);

    setResult({
      id: context?.currentSearchItem.id,
      notes: context?.currentSearchItem.notes,
      asinist: context?.currentSearchItem.asinist,
      catalog: catalogInfo.status === 'rejected' ? null : catalogInfo.value,
      amazon: amazonInfo.status === 'rejected' ? null : amazonInfo.value,
    });
  }, []);

  useEffect(() => {
    getItemInfo();
  }, []);

  return { ...catalogResult, result };
};

export { useItemInfo };
