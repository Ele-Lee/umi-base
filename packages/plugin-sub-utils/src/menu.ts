import React from 'react';
import { Menu } from 'antd';
import { TNodeParams, HeaderMenuItem } from './typing';

export const renderCustomTabs = () => {};

export const renderCustomMenu = (
  $nodeParams: TNodeParams,
  list?: Array<HeaderMenuItem>, // TODO
) => {
  if (!list) return null;
  if (!Array.isArray(list)) {
    throw '需要抛出数组组件';
  }
  const { MenuItem } = $nodeParams;

  return list.map((item, idx) => {
    if (!item) return null;
    if (typeof item === 'function') {
      // @ts-ignore
      return item({ ...$nodeParams, key: idx });
    }

    const { app } = item.show || {};

    if (app) {
      const matchTemp = window.location.pathname.match(/\/([\w-]+)\/?/);
      if (!matchTemp || !app.includes(matchTemp[1])) return null;
    }

    return React.createElement(MenuItem, {
      children: React.createElement(item.node),
      key: idx,
    });
  });
};

const nodeParams = Object.freeze({
  MenuItem: Menu.Item,
  MenuSubMenu: Menu.SubMenu,
  MenuDivider: Menu.Divider,
});

export const deliveryMenuNode = (
  renderComp: ($nodeParams: TNodeParams, ...args: any[]) => React.ReactNode,
  ...otherArgs: any[]
) => {
  return renderComp(nodeParams, ...otherArgs);
};
