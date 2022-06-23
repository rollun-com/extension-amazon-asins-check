const formatImageUrl = (url: string | null | undefined) => {
  const baseCdnUrl = 'https://rollun.s3.eu-central-1.amazonaws.com';
  return url === '-1' || !url ? `${baseCdnUrl}/images/no-image.png` : url;
};

export { formatImageUrl };
