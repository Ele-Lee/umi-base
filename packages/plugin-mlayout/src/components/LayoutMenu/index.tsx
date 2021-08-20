import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import TMenuItem from 'antd/lib/menu/MenuItem';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';

const { Sider } = Layout;
const { SubMenu, Divider } = Menu;
const MenuItem = Menu.Item;

interface LayoutMenuProps {
  renderMenuList: (menuObj: TNodeParams) => React.ReactNode[];

  selectedKey: string;
  activeSubMenu?: string;
  onMenuClick: MenuClickEventHandler;
  width?: number;
}
const localKey = '__menu_collapsed__';

export default function LayoutMenu({
  renderMenuList,
  width = 160,
  selectedKey,
  onMenuClick,
  activeSubMenu,
}: LayoutMenuProps) {
  const [collapsed, setCollapsed] = useState<boolean>(
    () => window.localStorage.getItem(localKey) == '1',
  );
  useEffect(() => {
    window.localStorage.setItem(localKey, collapsed ? '1' : '0');
  }, [collapsed]);
  const onCollapse = () => setCollapsed(!+collapsed);
  return (
    <Sider {...{ width, collapsed, onCollapse }} collapsible>
      <Menu
        mode="inline"
        theme="dark"
        // inlineCollapsed={collapsed}
        selectedKeys={[selectedKey]}
        onClick={onMenuClick}
        defaultOpenKeys={activeSubMenu ? [activeSubMenu] : undefined}
      >
        {renderMenuList({ MenuItem, MenuSubMenu: SubMenu, MenuDivider: Divider })}
      </Menu>
    </Sider>
  );
}
