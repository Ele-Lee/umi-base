import React, { useState, useEffect } from 'react';
import { useUserInfo } from 'umi';
import MicroStore from '@grfe/micro-store';

interface HeaderTabsProps {}
const HeaderTabs: React.FC<HeaderTabsProps> = ({}) => {
  const infoData = useUserInfo();
  useEffect(() => {
    // const temp = new MicroStore({ name: '__auth__' });
    // temp.moduleWatch('__auth__', (...args) => {
    //   // setInfoData(args[2]);
    //   console.log('%celelee test:', 'background:#000;color:#fff', args);
    // });
    console.log('%celelee test:', 'background:#000;color:#fff', infoData);
  }, [infoData]);

  return (
    <div
      style={{ flex: 0, marginLeft: 26, display: 'flex', alignItems: 'center', fontSize: 20 }}
      onClick={() => {
        alert(1);
      }}
    >
      nav1
    </div>
  );
};
export default HeaderTabs;
