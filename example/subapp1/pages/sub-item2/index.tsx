import React, { useEffect } from 'react';
import MicroStore from '@grfe/micro-store';
import { getUserInfo } from 'umi';

interface IndexProps {}
const Index: React.FC<IndexProps> = props => {
  useEffect(() => {
    const state = {
      subapp1Data: 1,
      // comp: (
      //   <span
      //     onClick={() => {
      //       console.log('%celelee test:', 'background:#000;color:#fff', 11);
      //     }}
      //   >
      //     sub1 comp
      //   </span>
      // ),
    };
    // const state2 = {
    //   subapp1Data: 88,
    //   obj: { b: 1 },
    // };
    try {
      const ss = new MicroStore({ state, name: 'subapp2' });
      ss.watch('subapp1', (v, v2) => {
        console.log('%celelee test:', 'background:#000;color:#1ff', '变化', v, v2);
      });
      // var a = new MicroStore({ state: { abc: 1 }, name: '__auth__' });
      // console.log('%celelee test:', 'background:#000;color:#fff', getUserInfo());
      // ss.emit('subapp1/_mounted');
      const ss2 = new MicroStore({ state: {}, name: 'subapp1', isCover: true });

      // ss.set('subapp1/subapp1Data', 2);

      // ss.clear('subapp1');
      // const ss2 = new MicroStore({ state: state2, name: 'subapp1' });
    } catch (error) {
      console.log('%celelee test:', 'background:#000;color:#fff', error);
    }
  }, []);

  return <div>222</div>;
};
export default Index;
