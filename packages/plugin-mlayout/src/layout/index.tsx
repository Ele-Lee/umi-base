import React, { useState, useEffect } from 'react';
// @ts-ignore
import { IRouteComponentProps, Link, connect, getUserInfo } from 'umi';
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
  'https://static.guorou.net/course-static/22a23e8987c449708948925fab439ad3.svg';

interface BaseLayoutProps extends IRouteComponentProps {
  dvaConfig: MainAppModelState;
  userConfig: IUserConfig;
  userComp: {
    headerMenu?: Array<HeaderMenuItem>;
    headerTabs?: React.Component;
    pluginItems?: Array<ItemFC>;
    hideHeader?: boolean;
    hideSideMenu?: boolean;
  };
  umircConfig?: {
    headerTitle?: string;
    menus?: MenuConfig[];
  };
  dispatch: Function;
}

function BaseLayout({
  children,
  location,
  // route,
  // history,
  // match,
  umircConfig,
  dvaConfig,
  userConfig,
  userComp = {},
  dispatch,
}: BaseLayoutProps) {
  const {
    menus: menusFromDva,
    headerTitle: headerTitleFromDva,
    hideSideMenu: hideSideMenuFromDva,
    hideContentByLogging,
  } = dvaConfig || {};
  const {
    menuConfig,
    headerTitle: headerTitleFromConfig,
    headerLogo = defaultImgLogo,
    globalHeaderHeight = headerHeight,
    hideHeader, // TODO this
  } = userConfig;
  const hideSideMenu =
    hideSideMenuFromDva !== undefined ? hideSideMenuFromDva : userConfig.hideSideMenu;
  const menus = menusFromDva || umircConfig?.menus;
  const headerTitle =
    headerTitleFromDva || umircConfig?.headerTitle || headerTitleFromConfig || '果肉运营后台基座';
  const { headerTabs, headerMenu = [], pluginItems = [] } = userComp;

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

  const renderChildren = () => {
    if (hideContentByLogging) {
      return null;
    }
    return children;
  };

  if (isInMain) {
    return renderChildren();
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideHeader && (
        <PublicHeader
          logo={headerLogo}
          title={headerTitle}
          headerMenuList={headerMenu.concat(pluginItems)}
          globalHeaderHeight={globalHeaderHeight}
          headerTabs={headerTabs}
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
          {renderChildren()}
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
    const dvaConfig = {
      menus: microLayout.menus,
      headerTitle: microLayout.headerTitle,
      hideSideMenu: microLayout.hideSideMenu,
      hideContentByLogging: microLayout.hideContentByLogging,
    };
    return { dvaConfig };
  }
  return {};
})(BaseLayout);

type MainAppModelState = {
  menus: MenuConfig[] | null;
  headerTitle: string;
  hideContentByLogging?: boolean;
  hideSideMenu?: boolean;
};
