const formatImageUrl = (url: string | null | undefined) => {
  const baseCdnUrl = 'https://rollun-cdn.sfo2.digitaloceanspaces.com';
  return url === '-1' || !url ? `${baseCdnUrl}/images/no-image.png` : url;
};

export { formatImageUrl };
