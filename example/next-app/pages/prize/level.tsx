import React from 'react';
import Image from 'next/image';

interface LevelProps {}
const Level: React.FC<LevelProps> = ({}) => {
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
export default Level;
