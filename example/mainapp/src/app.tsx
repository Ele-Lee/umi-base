import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { getMenuFromConfigTB } from './services/menu';
import './global.less';

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

// 缓存react-error-overlay的window属性
let fixErrorCache: any = null;
const devFixHotUpdateListener = () => {
  if (!location.host.includes('localhost')) return;
  fixErrorCache = window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__;

  // 监听body下面是不是多了个iframe，是则删除
  const mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const dom = mutation.addedNodes[0];
      // dom?.clientWidth == window.innerWidth
      if (dom && dom.nodeName.toLowerCase() === 'iframe') {
        document.querySelector('body')!.removeChild(dom);
      }
    });
  });
  mutationObserver.observe(document.querySelector('body')!, {
    childList: true,
  });
};
devFixHotUpdateListener();
// 切走子应用时候,复原这个变量
const devFixHotUpdateError = () => {
  if (!location.host.includes('localhost')) return;
  // 也可以考虑把其内部属性“iframeReady”赋值成空函数
  window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ =
    window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ || fixErrorCache;
};

export const qiankun = getMenuFromConfigTB()
  .then(res => {
    return {
      apps: [
        {
          name: 'subapp1', // 唯一 id
          entry: '//localhost:8100', // html entry
        },
        // {
        //   name: 'subapp2', // 唯一 id
        //   entry: '//localhost:8200', // html entry
        // },
        // {
        //   name: 'course_portal', // 唯一 id
        //   entry: '//localhost:3000', // html entry
        //   props: {
        //     isInMain: 1,
        //   },
        //   activeRule: '/portal',
        //   // mountElementId: 'portal-root',
        //   // base: '/portal',
        // },
      ],
      routes: [
        // {
        //   path: '/portal',
        //   microApp: 'course_portal',
        //   microAppProps: {
        //     autoSetLoading: true,
        //   },
        // },
        {
          path: '/subapp1',
          microApp: 'subapp1',
          microAppProps: {
            // autoSetLoading: true,
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
      lifeCycles: {
        afterMount() {},
        beforeUnmount: () => {},
        afterUnmount: () => {
          devFixHotUpdateError();
        },
      },
    };
  })
  .catch(() => {
    console.log('%celelee test:', 'background:#000;color:#fff', 'catch');
    return {};
  });
