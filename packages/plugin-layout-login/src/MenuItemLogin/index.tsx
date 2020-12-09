import React from 'react';
import { renderCustomMenu, deliveryMenuNode } from '@grfe/plugin-sub-utils/es';
import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';
import { useAuth } from './helpers/useAuth';
import { Avatar } from 'antd';
import { LoginItemProps } from 'src/typings';

const LoginItem: React.FC<LoginItemProps & TNodeParams> = ({
  MenuItem,
  MenuDivider,
  MenuSubMenu,
  key,
  headerSubMenuForLogin = [],
}) => {
  const { user, clearUser } = useAuth();
  const handleLogout = () => {
    clearUser();
  };

  if (!user) return null;
  return (
    <MenuSubMenu
      key={key}
      title={
        <div className="mlayout-publicHeader-UserInfo">
          {user?.avatar_url ? (
            <Avatar src={user?.avatar_url} />
          ) : (
            <Avatar
              style={{
                backgroundColor: '#f56a00',
                verticalAlign: 'middle',
              }}
            >
              {user?.username.slice(0, 1)}
            </Avatar>
          )}
          <span style={{ marginLeft: 10 }}>{user?.username}</span>
        </div>
      }
    >
      {deliveryMenuNode(renderCustomMenu, headerSubMenuForLogin)}

      {headerSubMenuForLogin.length && <MenuDivider />}

      <MenuItem key="logout" onClick={handleLogout}>
        退出登录
      </MenuItem>
    </MenuSubMenu>
  );
};
export default LoginItem;
