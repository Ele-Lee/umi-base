import React, { useEffect } from 'react';
import MicroStore from '@grfe/micro-store';
import { Input } from 'antd';

const Home = props => {
  useEffect(() => {
    const state = {
      subapp1Data: 44,
      obj: { a: 1 },
      comp: (
        <span
          onClick={() => {
            console.log('%celelee test:', 'background:#000;color:#fff', 11);
          }}
        >
          sub1 comp
        </span>
      ),
    };
    // const state2 = {
    //   subapp1Data: 88,
    //   obj: { b: 1 },
    // };
    try {
      const ss = new MicroStore({ state, name: 'subapp1' });
      ss.emit('subapp1_mounted');
      ss.watch('subapp1Data', (v, v2) => {
        console.log('%celelee test:', 'background:#000;color:#1ff', '变化', v, v2);
      });
      ss.set('subapp1/subapp1Data', 1);
      // ss.clear('subapp1');
      // const ss2 = new MicroStore({ state: state2, name: 'subapp1' });
    } catch (error) {
      console.log('%celelee test:', 'background:#000;color:#fff', error);
    }
  }, []);
  return (
    <div>
      <h1> index</h1>
      <Input />
    </div>
  );
};
export default Home;
