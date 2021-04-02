import React from 'react';
// @ts-ignore
import { useSelector, useDispatch } from 'umi';
import { renderCustomMenu, deliveryMenuNode } from '@grfe/plugin-sub-utils/es';
import { TNodeParams } from '@grfe/plugin-sub-utils/es/typing';
import { useAuth } from './helpers/useAuth';
import { Avatar } from 'antd';
import { LoginItemProps, UserInfo } from 'src/typings';
import { storageUserInfo } from './helpers/microAction';

const LoginItem: React.FC<LoginItemProps & TNodeParams> = ({
  MenuItem,
  MenuDivider,
  MenuSubMenu,
  key,
  headerSubMenuForLogin = [],
  onGetUserInfoSuc,
}) => {
  const microLayoutDvaConfig = useSelector(({ microLayout }: any) => microLayout);
  const dispatch = useDispatch();

  const useAuthCb = (u: UserInfo) => {
    onGetUserInfoSuc && onGetUserInfoSuc(u);
    storageUserInfo(u);
    if (microLayoutDvaConfig.hideContentByLoginning) {
      dispatch({ type: 'microLayout/save', payload: { hideContentByLoginning: false } });
      // console.log('%celelee test:useSelector', 'background:#000;color:#fff', microLayoutDvaConfig);
    }
  };

  const { user, clearUser } = useAuth(useAuthCb);
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
