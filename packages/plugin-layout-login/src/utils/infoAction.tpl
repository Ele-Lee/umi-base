import React from 'react';
import { useSelector } from '@/lib/hooks/useRematch';
import MicroStore from '@grfe/micro-store';

export interface UserInfo {
  id: number;
  username: string;
  phone: string;
  role: number;
  access_token: string;
  dingtalk_uid: string;
  avatar_url: string;
  status: number;
  has_change_password: boolean;
  portal_role: number[];
  user_role: UserRole[];
  master_id: number;
  permission: string[];
}

interface UserRole {
  role_id: number;
  role_name: string;
}

export function getUserInfo(): UserInfo {
  const temp = new MicroStore({ name: "{{{ keyForStorageAuth }}}" });
  return temp.get();
}

interface Props {
  perKey?: string;
  perKeys?: string[];
}

export const CompWithAuth: React.FC<Props> = ({ perKey = '', children, perKeys = [] }) => {
  if (!perKey && !perKeys.length) {
    return null;
  }
  const userInfo = getUserInfo();
  const allPermission = userInfo ? userInfo.permission || [] : [];
  let hasPer = false;
  if (perKey) {
    hasPer =
      allPermission.includes('*') ||
      allPermission.some(permission => permission.indexOf(perKey) >= 0);
  }
  if (perKeys.length) {
    hasPer = allPermission.some(permission => perKeys.some(p => permission.indexOf(p) >= 0));
  }
  if (typeof children === 'function') {
    return children(hasPer);
  } else if (hasPer) {
    return <>{children}</>;
  }
  return null;
};
