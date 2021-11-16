const useResetSearch = () => () => {
  window.sessionStorage.clear();
  window.location.reload();
};

export { useResetSearch };
