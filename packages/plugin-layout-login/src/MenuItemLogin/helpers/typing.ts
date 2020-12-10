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
