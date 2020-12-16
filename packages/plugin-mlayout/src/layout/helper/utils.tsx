import { Link } from 'umi';
import React from 'react';
import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';
import iconFormatter from '../../utils/iconFormatter';
import { MenuConfig } from '../../typings';

export function findActiveSubMenu($pathname: string, $routesConfig: any[]): string | undefined {
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

export const renderMenuListHandler = (
  menuRoutes: MenuConfig[],
  { MenuItem, MenuSubMenu }: TNodeParams,
) => {
  if (!Array.isArray(menuRoutes)) {
    throw `menuRoutes is not a array: ${menuRoutes}`;
  }

  function renderItemByItem(routesArr: any[], pathPrefix = '/') {
    return routesArr.map(({ name, title, icon, path, children }) => {
      const menuProps = {
        key: pathPrefix + path,
        icon: typeof icon === 'string' ? React.createElement(iconFormatter(icon)) : undefined,
        title: title,
      };
      menuProps.key = menuProps.key.replace(/\/{2,}/g, '/');

      if (Array.isArray(children)) {
        return (
          <MenuSubMenu {...menuProps}>{renderItemByItem(children, menuProps.key)}</MenuSubMenu>
        );
      }
      return (
        <MenuItem {...menuProps}>
          {title}
          {/* 使用key作为跳转路径 */}
          <Link to={menuProps.key}></Link>
        </MenuItem>
      );
    });
  }
  return renderItemByItem(menuRoutes);
};
