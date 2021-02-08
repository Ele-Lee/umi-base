import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';

export { UserInfo } from '../MenuItemLogin/helpers/typing';
export interface LoginItemProps {
  key?: string | number;
  headerSubMenuForLogin?: any[];
  onGetUserInfoSuc: (UserInfo) => void;
}
