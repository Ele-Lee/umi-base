import React, { useEffect } from 'react';
import Image from 'next/image';
import QueryWrapHandler from '../../src/utils/QueryWrap';

interface LevelProps {}
const Level2: React.FC<LevelProps> = ({}) => {
  useEffect(() => {
    return () => {
      console.log('%celelee test:', 'background:#000;color:#fff', 2);
    };
  }, []);
  return (
    <div
      style={{
        width: 205,
        height: 300,
        background: 'pink',
      }}
    >
      {/* <Image src={{ src: '/image/pic1.jpeg', width: 100, height: 100 }} /> */}
      <img src="/image/pic1.jpeg" width="100px" />
      bbbbbbbbb
    </div>
  );
};

// @ts-ignore
Level2.id = '__Level2__';
export default Level2;
