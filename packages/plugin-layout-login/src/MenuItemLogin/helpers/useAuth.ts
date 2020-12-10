import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { redirectLogin } from '@grfe/utils/dist/tool';
import { UserInfo } from './typing';
// import { setUserInfo } from '../../../utils/microInit';

const apiUrl = '/portalapi/api/1/auth/portal_profile_info?app=portal';

const clearCookie = () => {
  const cookieDomain: string[] = [];

  const { host } = window.location;
  cookieDomain.push(
    host,
    host.replace(/^\w+/, ''), // 这里 将 xx.zy.com => 改为 xx.zy.com  uae同理
  );

  // 获取所有的cookie
  const CookiesKeys = Object.keys(Cookies.get());
  CookiesKeys.forEach(name => {
    cookieDomain.forEach(domain => {
      Cookies.remove(name, {
        domain,
        path: '/',
      });
    });
  });
};

async function fetchPortalAuth(): Promise<UserInfo | null> {
  try {
    const response = await fetch(apiUrl);
    const {
      data: { user },
      code,
    } = await response.json();
    if (code !== 0) {
      throw 'code is not 0';
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const defaultRedirectTime = 2;
const sto = {
  set: (times = defaultRedirectTime, key = 'redirectTime') =>
    sessionStorage.setItem(key, times.toString()),
  get: (key = 'redirectTime') => Number(sessionStorage.getItem(key)),
};

export function useAuth(onCb: (u: UserInfo) => void) {
  const [user, setUser] = useState<null | UserInfo>(null);
  useEffect(() => {
    sto.set();
    fetchPortalAuth().then(res => {
      let remainingTime = sto.get();
      if (remainingTime <= 0) return;
      if (!res) {
        redirectLogin();
        return;
      }
      setUser(res);

      if (typeof onCb === 'function') {
        onCb(res);
      }
    });
  }, []);
  return {
    user,
    clearUser() {
      clearCookie();
      setUser(null);
      redirectLogin();
    },
  };
}
