import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';

export interface LoginItemProps {
  key?: string | number;
  headerSubMenuForLogin?: any[];
}

export declare const LoginItem: React.FC<LoginItemProps & TNodeParams>;

declare module '@@/elelee-layout-login/MenuItemLogin' {
  const LoginItem: React.FC<LoginItemProps & TNodeParams>;
  export default LoginItem;
}
