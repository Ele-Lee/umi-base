import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { getMenuFromConfigTB } from './services/menu';

moment.locale('zh-cn');

if (window !== undefined) {
  window.__isMainApp__ = true;
}

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider prefixCls="portalmain" locale={zhCN}>
      {container}
    </ConfigProvider>
  );
}

export const qiankun = getMenuFromConfigTB().then(res => {
  return {
    apps: [
      {
        name: 'subapp1', // 唯一 id
        entry: '//localhost:8100', // html entry
        props: {
          test: 1,
        },
      },
      {
        name: 'subapp2', // 唯一 id
        entry: '//localhost:8200', // html entry
        props: {
          test: 2,
        },
      },
    ],
    routes: [
      {
        path: '/subapp1',
        microApp: 'subapp1',
        microAppProps: {
          autoSetLoading: true,
        },
      },
      {
        microAppProps: {
          autoSetLoading: true,
        },
        path: '/subapp2',
        microApp: 'subapp2',
      },
    ],
    // lifeCycles: {
    //   beforeUnmount: () => {
    //     console.log(
    //       '%celelee test:',
    //       'background:#000;color:#fff',
    //       'beforeUnmount',
    //     );
    //   },
    // },
  };
});
