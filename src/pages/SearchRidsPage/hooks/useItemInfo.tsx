import { useCallback, useContext, useEffect, useState } from 'react';
import { useCatalogItemInfo } from 'pages/SearchRidsPage/hooks/useCatalogItemInfo';
import {
  AmazonItemInfo,
  useAmazonItemInfo,
} from 'pages/SearchRidsPage/hooks/useAmazonItemInfo';
import { Eq, GroupBy, Query, QueryStringifier, Select } from 'rollun-ts-rql';
import SearchRidsContext from 'pages/SearchRidsPage/SearchRidsContext';

export type CatalogItemInfo = {
  rid: string;
  brand: string;
  mpn: string;
  image: string;
  suppliers: {
    price: string;
    csn: string;
    sr_name: string;
  }[];
};

export type ItemInfo = {
  id: string | undefined;
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
        `https://rollun.net/api/datastore/ItemInfoWithSupplierInfoView?${QueryStringifier.stringify(
          new Query()
            .setQuery(new Eq('rid', context?.currentSearchItem.rid))
            .setGroupBy(new GroupBy(['csn', 'price', 'sr_name']))
            .setSelect(
              new Select([
                'csn',
                'rid',
                'image',
                'brand',
                'mpn',
                'price',
                'sr_name',
              ]),
            ),
        )}`,
      ),
      getAmazonItemByUrl(
        `https://www.amazon.com/dp/${context?.currentSearchItem.asin}/`,
      ),
    ]);

    const catalogInfoFormatted =
      catalogInfo.status === 'rejected'
        ? null
        : catalogInfo.value?.reduce<CatalogItemInfo | null>((acc, curr) => {
            const { brand, mpn, rid, image, csn, price, sr_name } = curr;
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
              suppliers: [...(acc?.suppliers || []), supplierInfo],
            };
          }, null);

    setResult({
      id: context?.currentSearchItem.id,
      catalog: catalogInfoFormatted || null,
      amazon: amazonInfo.status === 'rejected' ? null : amazonInfo.value,
    });
    console.log(catalogInfo, amazonInfo);
  }, []);

  useEffect(() => {
    getItemInfo();
  }, []);

  return { ...catalogResult, result };
};

export { useItemInfo };
