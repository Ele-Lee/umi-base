import React, { useState, useEffect } from 'react';
import MicroStore from '@grfe/micro-store';
import { Button } from 'antd';

const a = () => {
  const [customDom, setCustomDom] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const store = new MicroStore({ isMain: true, state: { mainData: 'abc' } });
    store.on('subapp1_mounted', () => {
      const data = store.get('subapp1/');
      setCustomDom(data.comp);
    });
    //       setTimeout(() => {
    // }, 1000);
  }, []);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
          alert('hi');
        }}
      >
        main顶部菜单
      </Button>
    </div>
  );
};
export default a;
