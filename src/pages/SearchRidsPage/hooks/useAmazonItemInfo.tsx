import { RequestState, useLazyQuery } from 'hooks';

export type AmazonItemInfo = {
  bsr: string;
  mpn: string;
  brand: string;
};

type UseAmazonItemInfo = () => [
  RequestState<any>,
  (url: string) => Promise<AmazonItemInfo | null>,
];
const useAmazonItemInfo: UseAmazonItemInfo = () => {
  const [res, getByUrl] = useLazyQuery<string>();

  const getRankString = (page: Document) => {
    const innerText = page.body.innerText;
    const match =
      innerText.match(/Amazon Best Sellers Rank:?\s+?#(?<rank>[0-9,]+)/i) ||
      innerText.match(/Best Sellers Rank:?\s+?#(?<rank>[0-9,]+)/i);
    return match?.groups?.rank || '-- not found --';
  };

  const getBrand = (data: string) => {
    //Find a Best Sellers Rank string
    const result = data.match(/bylineInfo.*href.*">(.*)<\/a>/);
    // Check for null
    return result ? result[1].toUpperCase() : '-- not found --';
  };

  const getMPN = (page: Document) => {
    const innerText = page.body.innerText;
    const matches =
      innerText.matchAll(/Manufacturer Part Number[\s:]+(?<mpn>.+)/gi) ||
      innerText.matchAll(/Item model number[\s:]+(?<mpn>.+)/gi);

    for (const match of matches) {
      if (!(match && match.groups)) {
        continue;
      }

      let mpn = match.groups.mpn.trim();
      mpn = mpn[0] === ':' ? mpn.slice(1) : mpn;
      const [splitedMpn] = mpn.split(/("|,|)\s+/);

      if (splitedMpn.length >= 20) {
        continue;
      }

      return splitedMpn.trim();
    }
    return '-- not found --';
  };

  const getItemInfoFromAmazonListing = (data: string): AmazonItemInfo => {
    const page = new DOMParser().parseFromString(data, 'text/html');

    return {
      bsr: getRankString(page),
      mpn: getMPN(page),
      brand: getBrand(data),
    };
  };

  const getItemInfoByUrl = async (
    url: string,
  ): Promise<AmazonItemInfo | null> => {
    const data = await getByUrl(url);

    if (data === null) {
      return null;
    }

    return getItemInfoFromAmazonListing(data);
  };

  return [res, getItemInfoByUrl];
};

export { useAmazonItemInfo };
