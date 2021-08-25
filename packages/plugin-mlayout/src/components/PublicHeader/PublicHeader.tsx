import React, { useState, useMemo, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { HeaderMenuItem } from '@grfe/plugin-sub-utils/es/typing';
import MicroStore from '@grfe/micro-store';
import { renderCustomMenu, deliveryMenuNode } from '@grfe/plugin-sub-utils/es';

// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import { globalHeaderHeight } from 'config/settings';

const { Header } = Layout;

interface Props {
  headerMenuList: Array<HeaderMenuItem>;
  pluginItemsMenuList: Array<HeaderMenuItem>;
  logo: string;
  title: string;
  globalHeaderHeight: number;
  headerTabs?: React.Component;
}

const PublicHeader = ({
  headerMenuList = [],
  pluginItemsMenuList,
  logo,
  title,
  globalHeaderHeight = 60,
  headerTabs,
}: Props) => {
  const headerStyle = {
    height: globalHeaderHeight,
  };

  const renderTabs = useMemo(() => {
    if (!headerTabs) return null;
    if (typeof headerTabs == 'function') {
      return React.createElement(headerTabs);
    }
    return null;
  }, [headerTabs]);

  const [headerMenuListForRender, setHeaderMenuListForRender] = useState<HeaderMenuItem[]>([]);

  useEffect(() => {
    const layoutStoreKey = '__layout__';
    const store = new MicroStore({
      state: {
        headerMenuList: [],
      },
      name: layoutStoreKey,
    });
    // 监听通讯库的变动，实时设置渲染的menu
    store.watch(layoutStoreKey + '/headerMenuList', (v, v2) => {
      setHeaderMenuListForRender(v);
    });
    store.set('headerMenuList', headerMenuList);
  }, []);

  // const menuRender = useMemo(() => {
  //   console.log('%celelee test:', 'background:#000;color:#fff', 999);
  //   return deliveryMenuNode(renderCustomMenu, headerMenuListForRender);
  //   // <Menu
  //   //   className="mlayout-publicHeader__Menu"
  //   //   mode="horizontal"
  //   //   style={{
  //   //     lineHeight: `${globalHeaderHeight}px`,
  //   //     height: `${globalHeaderHeight}px`,
  //   //   }}
  //   //   selectedKeys={[]}
  //   // >
  //   //     {deliveryMenuNode(renderCustomMenu, headerMenuList)}
  //   //     {pluginItemsMenuList[0]({
  //   //       MenuItem: Menu.Item,
  //   //       MenuSubMenu: Menu.SubMenu,
  //   //       MenuDivider: Menu.Divider,
  //   //     })}
  //   // </Menu>
  // }, [headerMenuListForRender]);

  return (
    <div className="reset-antd" style={headerStyle}>
      <Header style={headerStyle} className="mlayout-publicHeader">
        {logo && (
          <section className="mlayout-publicHeader__LogoWrap">
            <div className="mlayout-publicHeader__Logo">
              <img src={logo} alt="" />
              <span>{title}</span>
            </div>
          </section>
        )}
        {renderTabs}
        <Menu
          className="mlayout-publicHeader__Menu"
          mode="horizontal"
          style={{
            lineHeight: `${globalHeaderHeight}px`,
            height: `${globalHeaderHeight}px`,
          }}
          selectedKeys={[]}
        >
          {/* {menuRender} */}
          {/* 渲染约定的文件夹内or通讯库里面的Menu */}
          {deliveryMenuNode(renderCustomMenu, headerMenuListForRender)}
          {/* 渲染登录插件的menu，插件写法问题不适合被hook处理，分离开，否则报错 */}
          {pluginItemsMenuList.map((fn: any) =>
            fn({
              MenuItem: Menu.Item,
              MenuSubMenu: Menu.SubMenu,
              MenuDivider: Menu.Divider,
            }),
          )}
        </Menu>
      </Header>
    </div>
  );
};

export default React.memo(PublicHeader);
