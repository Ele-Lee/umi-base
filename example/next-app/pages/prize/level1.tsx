import React from 'react';

interface Leve1Props {}
const Leve1: React.FC<Leve1Props> = ({}) => {
  return (
    <div
      style={{
        width: 375,
        height: 667,
        background: 'pink',
      }}
    >
      prize -&gt; level1
      <img src="/image/pic1.jpeg" />
    </div>
  );
};
export default Leve1;
