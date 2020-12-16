import React, { useEffect } from 'react';
import styles from './index.less';
import { MicroApp, useStore } from 'umi';
import sideMenu from '@/mlayout/sideMenu';
import { initGlobalState, MicroAppStateActions } from 'qiankun';

export default () => {
  // React.useEffect(() => {
  //   const state = { test: 1 };
  //   const actions: MicroAppStateActions = initGlobalState(state);
  //   actions.onGlobalStateChange((state, prev) => {
  //     // state: 变更后的状态; prev 变更前的状态
  //     console.log('%celelee test:', 'background:#000;color:#ff2', state, prev);
  //   });
  //   setTimeout(() => {
  //     actions.setGlobalState({ test: 2 });
  //     console.log('%celelee test:', 'background:#000;color:#fff', 3);
  //   }, 3000);
  // }, []);

  // const sto = useStore();
  // console.log('%celelee test:', 'background:#000;color:#fff', sto.getState());

  useEffect(() => {}, []);

  return (
    <div>
      <h1 className={styles.title}>fater Page index</h1>
      {/* <MicroApp name="subapp1" /> */}
      {/* <MicroApp name="subapp2" /> */}
    </div>
  );
};
