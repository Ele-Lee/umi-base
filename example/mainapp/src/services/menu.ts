// TODO 废弃
const url = '/portalapi/api/1/business_config/get_config_by_key?key=portal_interim_menus';
const fetchCache = new Map();
export const getMenuFromConfigTB = async () => {
  const cachePro = fetchCache.get(url);
  if (cachePro) {
    return cachePro;
  }
  const fetchPromise = fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    cache: 'reload',
  });

  let res = await fetchPromise;
  res = await res.json();
  // @ts-ignore
  if (res.code !== 0) {
    return Promise.resolve();
  }
  fetchCache.set(url, fetchPromise);
  // @ts-ignore
  return res.data.data.map((item, idx) => ({
    title: item.name,
    path: '/' + (item.path || idx),
    children: Array.isArray(item.menus)
      ? item.menus.map((child: { name: any; path: any }) => ({
          title: child.name,
          path: '/' + (child.path || 'child' + idx),
        }))
      : undefined,
  }));
};
