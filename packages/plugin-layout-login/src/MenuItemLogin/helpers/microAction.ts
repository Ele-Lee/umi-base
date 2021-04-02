import MicroStore from '@grfe/micro-store';
import { keyForStorageAuth } from './constant';

export const storageUserInfo = (res: any) => {
  new MicroStore({ state: Object.freeze(res), name: keyForStorageAuth, isCover: true });
};
