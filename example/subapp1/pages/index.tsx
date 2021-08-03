import React, { useEffect } from 'react';
import MicroStore from '@grfe/micro-store';
import { Button } from 'antd';

var a = debounce(() => {
  console.log(1);
}, 1000);

const Home = props => {
  return (
    <div>
      <h1> index</h1>
      <Button onClick={a}>click</Button>
    </div>
  );
};

function debounce(func, wait, isNow = true) {
  let timeout;
  let flag = isNow;
  return function() {
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (flag) {
      func.apply(this, args);
      flag = false;
      timeout = setTimeout(() => {
        flag = true;
      }, wait);
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, wait);
    }
  };
}
export default Home;
