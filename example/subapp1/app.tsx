import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// mlayout导出个修改顶部栏的工具函数，参数是一个函数
import { setTopMenuList } from 'umi';

moment.locale('zh-cn');

export function rootContainer(container: React.ReactNode) {
  // 选择就触发加顶部栏菜单
  setTopMenuList(menuListByShallowCloning => {
    menuListByShallowCloning.unshift({
      node: () => (
        <span
          onClick={() => {
            alert(1);
          }}
          style={{ border: '1px solid gray' }}
        >
          sub1代码，渲染即有
        </span>
      ),
      key: 'sub1',
    });
    // 返回修改的结果
    return menuListByShallowCloning;
  });
  return <ConfigProvider locale={zhCN}>{container}</ConfigProvider>;
}
export const qiankun = {
  // 应用卸载之后触发
  async unmount(props) {
    setTopMenuList(menuListByShallowCloning => {
      menuListByShallowCloning.shift();
      return menuListByShallowCloning;
    });
  },
};
