import React, { useState, useEffect } from 'react';
import MicroStore from '@grfe/micro-store';

const a = () => {
  const [customDom, setCustomDom] = useState(null);

  useEffect(() => {
    const store = new MicroStore({ isMain: true, state: {} });
    store.on('subapp1_mounted', () => {
      const data = store.get('subapp1/');
      setCustomDom(data.comp);
    });
    //       setTimeout(() => {
    // }, 1000);
  }, []);

  return <div>main app headerMenu 2: {customDom}</div>;
};
export default a;
