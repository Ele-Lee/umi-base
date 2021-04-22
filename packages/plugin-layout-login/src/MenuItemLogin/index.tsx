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
  // umi 机制，如果没有启动dva ，不会有useSelector，直接取 dva 也不行 redux报错。
  const microLayoutDvaConfig = useSelector
    ? useSelector(({ microLayout }: any) => microLayout)
    : null;
  const dispatch = useDispatch ? useDispatch() : null;

  const useAuthCb = (u: UserInfo) => {
    onGetUserInfoSuc && onGetUserInfoSuc(u);
    storageUserInfo(u);
    if (dispatch && microLayoutDvaConfig && microLayoutDvaConfig.hideContentByLoginning) {
      dispatch({ type: 'microLayout/save', payload: { hideContentByLoginning: false } });
    } else {
      console.error('当前没有启动dva');
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
