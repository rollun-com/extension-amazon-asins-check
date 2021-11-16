import { useLazyQuery } from 'common/hooks';

export type RidWithAsin = {
  id: string;
  date: string;
  rid: string;
  asin: string;
  asinist: number;
  notes: string;
  decision: number;
  operator: 'manager' | 'auto';
};

const useGetRidsWithAsins = () => useLazyQuery<RidWithAsin[]>();

export { useGetRidsWithAsins };
