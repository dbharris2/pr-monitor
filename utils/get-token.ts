const getToken = () => {
  const localStorage =
    typeof window !== 'undefined' ? window.localStorage : null;
  const item = localStorage?.getItem('pr-monitor-gh-token') ?? null;
  return item && JSON.parse(item);
};

export default getToken;
