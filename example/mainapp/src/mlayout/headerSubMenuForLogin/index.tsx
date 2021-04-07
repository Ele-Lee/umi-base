import React from 'react';
import {
  ProjectOutlined,
  TeamOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default [
  {
    node: () => (
      <a href="/profile/base-info">
        <ProjectOutlined />
        个人信息
      </a>
    ),
  },
  {
    node: () => (
      <a href="/ram/user-manage/member" target="_black">
        <TeamOutlined />
        人员管理
      </a>
    ),
  },
  {
    node: () => (
      <a href="/download-center">
        <DownloadOutlined />
        下载中心
      </a>
    ),
  },
  {
    node: () => <NavLink to="/wxtool/portal-tag-manage">标签管理</NavLink>,
  },
];
