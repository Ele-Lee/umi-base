import React, { useState, useEffect } from 'react';
import MicroStore from '@grfe/micro-store';

const a = () => {
  const [customDom, setCustomDom] = useState(null);

  useEffect(() => {
    const store = new MicroStore({ name: 'tes', state: {} });
    store.on('subapp1_mounted', () => {
      const data = store.get('subapp1/');
      console.log('%celelee test:', 'background:#000;color:#fff', 11, data.comp);
      setCustomDom(data.comp);
    });
    //       setTimeout(() => {
    // }, 1000);
  }, []);

  return <div>main app headerMenu 2: {customDom}</div>;
};
export default a;
