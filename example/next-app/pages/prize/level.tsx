import React, { useEffect } from 'react';
import Image from 'next/image';
import QueryWrapHandler from '../../src/utils/QueryWrap';

interface LevelProps {}
const Level: React.FC<LevelProps> = ({}) => {
  useEffect(() => {
    return () => {
      console.log('%celelee test:', 'background:#000;color:#fff', 1);
    };
  }, []);
  return (
    <div
      style={{
        width: 205,
        height: 400,
        background: 'yellow',
      }}
    >
      {/* <Image src={{ src: '/image/pic1.jpeg', width: 100, height: 100 }} /> */}
      <img src="/image/pic1.jpeg" width="100px" />
      aaaaa
    </div>
  );
};

// @ts-ignore
Level.id = '__Level1__';

export default Level;
