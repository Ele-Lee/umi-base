import React, { useEffect } from 'react';
import styles from './index.less';
import { MicroApp, useStore } from 'umi';
import sideMenu from '@/mlayout/sideMenu';
import { initGlobalState, MicroAppStateActions } from 'qiankun';
import { getUserInfo } from 'umi';
import styled from 'styled-components';

const list = [
  ['align-items', 'center'],
  ['justify-items', 'center'],
];

const MyH1 = styled.h1`
  display: grid;
  ${list.map(i => i.join(':') + ';')}
`;

export default () => {
  useEffect(() => {
    setTimeout(() => {
      const uinfo = getUserInfo();
      console.log('%celelee test:', 'background:#320;color:#4ff', uinfo);
      // console.log('%celelee test:', 'background:#000;color:#fff', typeof uinfo);
    }, 1000);
  }, []);

  return (
    <div>
      <MyH1 className={styles.title} style={{}}>
        father Page index
      </MyH1>
      {/* <MicroApp name="subapp1" /> */}
      {/* <MicroApp name="subapp2" /> */}
    </div>
  );
};
