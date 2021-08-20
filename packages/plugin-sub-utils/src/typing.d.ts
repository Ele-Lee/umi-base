import { Menu } from 'antd';

export type TNodeParams = {
  MenuItem: typeof Menu.Item;
  MenuSubMenu: typeof Menu.SubMenu;
  MenuDivider: typeof Menu.Divider;
};

export type ItemFC = React.FC<any & TNodeParams>;

export type HeaderMenuItem =
  | {
      node: () => JSX.Element;
      show?: {
        app?: string[];
        permission?: string[];
      };
      key?: string | number;
    }
  | ItemFC;
