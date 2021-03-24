import React, { useState, useEffect } from 'react';
// @ts-ignore
import { IRouteComponentProps, MainAppModelState, Link, connect } from 'umi';
import { Layout } from 'antd';
import _omit from 'lodash/omit';
import { HeaderMenuItem, ItemFC } from '@grfe/plugin-sub-utils/es/typing';
import LayoutMenu from '../components/LayoutMenu';
import { MenuConfig, IUserConfig } from '../typings';
import PublicHeader from '../components/PublicHeader';
import './style.less';
import { findActiveSubMenu, renderMenuListHandler } from './helper/utils';

const { Content } = Layout;
const headerHeight = 60;
const defaultImgLogo =
  'https://static.guorou.net/course-static/b0d31533cc2943beacb86c2ae878d895.png';

interface BaseLayoutProps extends IRouteComponentProps {
  menus: MenuConfig[];
  headerTitle: string;
  userConfig: IUserConfig;
  userComp: {
    headerMenu?: Array<HeaderMenuItem>;
    pluginItems?: Array<ItemFC>;
  };
  hideHeader?: boolean;
  hideSideMenu?: boolean;
  umircConfig?: {
    headerTitle?: string;
    menus?: MenuConfig[];
  };
}

function BaseLayout({
  children,
  location,
  // route,
  // history,
  // match,
  umircConfig,
  menus: menusFromDva,
  headerTitle: headerTitleFromDva,
  userConfig,
  userComp = {},
  hideHeader,
  hideSideMenu,
}: BaseLayoutProps) {
  const {
    menuConfig,
    headerTitle: headerTitleFromConfig,
    headerLogo = defaultImgLogo,
    globalHeaderHeight = headerHeight,
  } = userConfig;
  const menus = menusFromDva || umircConfig?.menus;
  const headerTitle =
    headerTitleFromDva || umircConfig?.headerTitle || headerTitleFromConfig || '果肉运营后台基座';
  const { headerMenu = [], pluginItems = [] } = userComp;

  const curPathname = location.pathname;
  const [menuItemKey, setMenuItemKey] = useState(curPathname);
  const [activeSubMenu, setActiveSubMenu] = useState<string | undefined>(undefined);

  if (!menuItemKey) {
    throw Error('路由没有name 或者 path');
  }

  const isInMain = window !== undefined && !!window.__POWERED_BY_QIANKUN__;
  const isMainApp = window.__isMainApp__;

  const [menuRoutes, setMenuRoutes] = useState<MenuConfig[]>([]);

  useEffect(() => {
    if (!isMainApp && Array.isArray(menuConfig)) {
      setMenuRoutes(menuConfig);
      return;
    }
    if (Array.isArray(menus)) {
      setMenuRoutes(menus);
    }
  }, [menus, menuConfig]);

  useEffect(() => {
    setActiveSubMenu(findActiveSubMenu(curPathname, menuRoutes));
  }, [curPathname, menuRoutes]);

  if (isInMain) {
    return children;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideHeader && (
        <PublicHeader
          logo={headerLogo}
          title={headerTitle}
          headerMenuList={headerMenu.concat(pluginItems)}
          globalHeaderHeight={globalHeaderHeight}
        />
      )}
      <Layout className="site-layout">
        {!hideSideMenu && (
          <LayoutMenu
            selectedKey={menuItemKey}
            activeSubMenu={activeSubMenu}
            renderMenuList={menuObjParams => {
              return renderMenuListHandler(menuRoutes, menuObjParams);
            }}
            onMenuClick={({ key }) => {
              let _key = String(key);
              setMenuItemKey(_key);
            }}
          />
        )}

        <Content
          // className="site-layout-background"
          style={{
            margin: 16,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

// function findNameByPath($path: string, $apps: any[]) {
//   const appNameRegRes = $path.match(/^\/([\w-]+)\b/);
//   if (!appNameRegRes) console.error('解析子应用名字出错');
//   if (appNameRegRes) {
//     const appName = appNameRegRes[1];
//     const findRes = $apps.find((item) => item.name === appName);
//     if (findRes) {
//       return findRes.name;
//     }
//   }
//   return void 0;
// }

const __connect = connect
  ? connect
  : (props: any) => {
      return (BaseComp: any) => {
        return BaseComp;
      };
    };

export default __connect(({ microLayout }: { microLayout: MainAppModelState }) => {
  if (microLayout) {
    return { menus: microLayout.menus, headerTitle: microLayout.headerTitle };
  }
  return {};
})(BaseLayout);
