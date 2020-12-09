import React, { useState, useEffect } from 'react';
// @ts-ignore
import { IRouteComponentProps, MainAppModelState, Link, connect } from 'umi';
import { Layout } from 'antd';
import _omit from 'lodash/omit';
import { HeaderMenuItem, ItemFC } from '@grfe/plugin-sub-utils/es/typing';
import LayoutMenu from '../components/LayoutMenu';
import iconFormatter from '../utils/iconFormatter';
import { MenuConfig, IUserConfig } from '../typings';
import PublicHeader from '../components/PublicHeader';
import './style.less';

const { Content } = Layout;
const headerHeight = 60;
const defaultImgLogo =
  'https://static.guorou.net/course-static/b0d31533cc2943beacb86c2ae878d895.png';

interface BaseLayoutProps extends IRouteComponentProps {
  menus: MenuConfig[];
  // apps: AppOption[];
  userConfig: IUserConfig;
  userComp: {
    headerMenu?: Array<HeaderMenuItem>;
    pluginItems?: Array<ItemFC>;
  };
  hideHeader?: boolean;
  hideSideMenu?: boolean;
}

function BaseLayout({
  children,
  location,
  // route,
  // history,
  // match,
  menus,
  // apps = [],
  userConfig,
  userComp = {},
  hideHeader,
  hideSideMenu,
}: BaseLayoutProps) {
  const {
    menuConfig,
    headerTitle = '果肉运营后台基座',
    headerLogo = defaultImgLogo,
    globalHeaderHeight = headerHeight,
  } = userConfig;
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
    if (!isMainApp) {
      setMenuRoutes(menuConfig);
      return;
    }
    if (menus) {
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
        {/* TODO */}
        {!hideSideMenu && (
          <LayoutMenu
            selectedKey={menuItemKey}
            headerHeight={headerHeight}
            activeSubMenu={activeSubMenu}
            menuItemList={(LayoutMenuItem, SubMenu) => {
              function renderItemByItem(routesArr: any[], pathPrefix = '/') {
                return routesArr.map(({ name, title, icon, path, children }) => {
                  const menuProps = {
                    key: pathPrefix + path,
                    icon:
                      typeof icon === 'string'
                        ? React.createElement(iconFormatter(icon))
                        : undefined,
                    title: title,
                  };
                  menuProps.key = menuProps.key.replace(/\/{2,}/g, '/');

                  if (Array.isArray(children)) {
                    return (
                      <SubMenu {...menuProps}>{renderItemByItem(children, menuProps.key)}</SubMenu>
                    );
                  }
                  return (
                    <LayoutMenuItem {...menuProps}>
                      {title}
                      {/* 使用key作为跳转路径 */}
                      <Link to={menuProps.key}></Link>
                    </LayoutMenuItem>
                  );
                });
              }
              return renderItemByItem(menuRoutes);
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

function findActiveSubMenu($pathname: string, $routesConfig: any[]): string | undefined {
  if ($pathname === '/') return $pathname;

  let activeSubMenu: string | undefined = undefined;

  for (const iterator of $routesConfig) {
    const { children, name, path, title } = iterator;

    activeSubMenu = name ? '/' + name : path;
    if (Array.isArray(children) && children.some(item => item.path === activeSubMenu)) {
      break;
    }
    if ($pathname === `/${name}` || $pathname === path) {
      activeSubMenu = $pathname;
    }
  }
  return activeSubMenu;
}

const __connect = connect
  ? connect
  : (props: any) => {
      return (BaseComp: any) => {
        return BaseComp;
      };
    };

export default __connect(({ microLayout }: { microLayout: MainAppModelState }) => {
  if (microLayout) {
    return { menus: microLayout.menus, apps: microLayout.apps };
  }
  console.error('no microLayout in main app dva');
  return {};
})(BaseLayout);
