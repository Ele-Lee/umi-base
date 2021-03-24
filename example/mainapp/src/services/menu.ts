import { list2Tree } from '../../src/utils/list2Tree';

const _url = '/portalapi/api/1/protal-micro/get_interim_menus';
const fetchCache = new Map();
export const getMenuFromConfigTB = async () => {
  try {
    const url = `${_url}?${new URLSearchParams({
      project: 'portal-home',
    })}`;
    const cachePro = fetchCache.get(url);
    const fetchPromise =
      cachePro ||
      fetch(url, {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        cache: 'reload',
      });

    let res = await fetchPromise;
    res = await res.clone().json();
    // @ts-ignore
    if (res.code !== 0) {
      return Promise.reject();
    }
    fetchCache.set(url, fetchPromise);
    return list2Tree(
      res.data.map(item => ({
        id: item.id,
        title: item.title,
        path: item.url,
        parent_id: item.parent_id,
      })),
    );
  } catch (error) {
    return [];
  }
};
