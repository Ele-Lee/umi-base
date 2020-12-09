import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import TMenuItem from 'antd/lib/menu/MenuItem';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

const { Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

interface LayoutMenuProps {
  menuItemList: (item: typeof TMenuItem, subMenu: typeof SubMenu) => React.ReactNode[];

  selectedKey: string;
  activeSubMenu?: string;
  onMenuClick: MenuClickEventHandler;
  headerHeight: number;
  width?: number;
}
const localKey = '__menu_collapsed__';

// const LayoutMenu: React.FC<LayoutMenuProps> = ({
export default function LayoutMenu({
  menuItemList,
  width = 160,
  selectedKey,
  onMenuClick,
  headerHeight,
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
        {menuItemList(MenuItem, SubMenu)}
      </Menu>
    </Sider>
  );
}
