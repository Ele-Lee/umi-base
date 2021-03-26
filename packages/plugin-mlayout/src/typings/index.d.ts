import { Menu } from 'antd';

export interface LayoutConfig {
  name?: string;
  logo?: string;
  theme?: string;
  locale?: any; // same with locale plugin
  showBreadcrumb?: boolean; // TODO 面包屑功能暂不支持
  layoutComponent?: Record<string, string>; // 自定义主题
}

export type MenuConfig = {
  title: string;
  name?: string;
  entry_dev?: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuConfig[];
};

// export type AppOption = {
//   title: string;
//   name: string;
//   entry_dev: string;
//   prefetch: boolean;
//   icon?: React.ReactNode;
// };

export interface IUserConfig {
  headerTitle: string;
  menuConfig: MenuConfig[];
  headerLogo?: string;
  globalHeaderHeight?: number;
  hideHeader?: boolean;
  hideSideMenu?: boolean;
}
