import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';

export { UserInfo } from '../MenuItemLogin/helpers/typing';
export interface LoginItemProps {
  key?: string | number;
  headerSubMenuForLogin?: any[];
  onGetUserInfoSuc: (UserInfo) => void;
}

// export declare const LoginItem: React.FC<LoginItemProps & TNodeParams>;
// export declare const getUserInfo: Function;

// declare module '@@/elelee-layout-login/MenuItemLogin' {
//   const LoginItem: React.FC<LoginItemProps & TNodeParams>;
//   const getUserInfo: Function;
//   export default LoginItem;
// }
