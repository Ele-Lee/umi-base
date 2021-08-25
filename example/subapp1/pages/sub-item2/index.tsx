import React, { useEffect, useState } from 'react';
import MicroStore from '@grfe/micro-store';
import { Button } from 'antd';
// @ts-ignore
import { setTopMenuList } from 'umi';

interface IndexProps {}
const Index: React.FC<IndexProps> = props => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // const state = {
    //   subapp1Data: [],
    // };
    // // const state2 = {
    // //   subapp1Data: 88,
    // //   obj: { b: 1 },
    // // };
    // try {
    //   const ss = new MicroStore({ state, name: 'subapp1' });
    //   ss.watch('subapp1/subapp1Data', (v, v2) => {
    //     console.log('%celelee test:', 'background:#000;color:#1ff', '变化', v, v2);
    //   });
    //   // var a = new MicroStore({ state: { abc: 1 }, name: '__auth__' });
    //   // console.log('%celelee test:', 'background:#000;color:#fff', getUserInfo());
    //   // ss.emit('subapp1/_mounted');
    //   ss.set('subapp1/subapp1Data', [1, 2, 3]);
    //   // ss.get('subapp1/subapp1Data').push(3);
    //   // ss.clear('subapp1');
    //   // const ss2 = new MicroStore({ state: state2, name: 'subapp1' });
    // } catch (error) {
    //   console.log('%celelee test:', 'background:#000;color:#fff', error);
    // }
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          setTopMenuList((tmp: any[]) => {
            tmp.unshift({
              node: () => (
                <span
                  onClick={() => {
                    setCount(pre => ++pre);
                  }}
                  key="fffi"
                >
                  添加的顶部栏btn
                </span>
              ),
            });
            return tmp;
          });
        }}
      >
        +一个顶部栏菜单
      </Button>
      <div>click count: {count}</div>
    </div>
  );
};
export default Index;
