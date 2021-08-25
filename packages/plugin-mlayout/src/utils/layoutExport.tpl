import { HeaderMenuItem } from '@grfe/plugin-sub-utils/es/typing';
import MicroStore from '@grfe/micro-store';

export function setTopMenuList(setHandler: (oldList: HeaderMenuItem[]) => HeaderMenuItem[]) {
  const layoutStore = new MicroStore({ state: {}, name: '__layout__' });
  const list = layoutStore.get('headerMenuList').concat();
  layoutStore.set('headerMenuList', setHandler(list));
}
