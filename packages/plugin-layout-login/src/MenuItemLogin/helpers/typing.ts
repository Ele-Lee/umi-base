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
  user_role: Userrole[];
  master_id: number;
  permission: string[];
}

interface Userrole {
  role_id: number;
  role_name: string;
}
