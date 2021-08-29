import React, { useState } from 'react';
// import sideMenu from '@/mlayout/sideMenu';
import { loadMicroApp } from 'qiankun';

window.imgCache = window.imgCache || { list: [], fatherList: [] };

const sandbox = {
  // strictStyleIsolation: true,
  experimentalStyleIsolation: true,
  loose: true,
};
const clickKeys = [false, false];
interface BoardProps {}
const Board: React.FC<BoardProps> = ({}) => {
  const [url, setUrl] = useState('');
  const [url2, setUrl2] = useState('');
  // const [style, setStyle] = useState({});

  const loadNextjs = () => {
    if (clickKeys[0]) return;
    clickKeys[0] = true;
    loadMicroApp(
      {
        name: 'next-app',
        entry: '/image/prize/level',
        container: '#firstNext',
        props: {
          cache: window.imgCache,
          topWin: window,
        },
      },
      {
        sandbox,
      },
    );
  };

  const loadNextjs2 = () => {
    if (clickKeys[1]) return;
    clickKeys[1] = true;
    loadMicroApp(
      {
        name: 'next2-app',
        entry: '/image/prize/level2',
        container: '#secondNext',
        props: {
          cache: window.imgCache,
          topWin: window,
        },
      },
      {
        sandbox,
      },
    );
  };

  return (
    <div style={{ width: '100%', height: 567 }}>
      <div>海报测试</div>
      <button
        onClick={() => {
          loadNextjs2();
        }}
      >
        load poster but hide~
      </button>
      <button
        onClick={() => {
          loadNextjs();
        }}
      >
        load poster and show
      </button>
      <button
        onClick={() => {
          if (window?.imgCache.list) {
            setUrl(window.imgCache.list[0]);
          }
        }}
      >
        show picture1
      </button>
      <button
        onClick={() => {
          if (window?.imgCache.list) {
            setUrl2(window.imgCache.list[1]);
          }
        }}
      >
        show picture2
      </button>

      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        子应用
        <div
          id="firstNext"
          style={{
            border: '2px solid gray',
            // width: 375,
            height: 480,
            position: 'absolute',
          }}
        ></div>
        <div
          id="secondNext"
          style={{
            border: '4px solid blue',
            // width: 375,
            height: 667,
            position: 'absolute',
            // left: -130,
            left: -9999,
            top: 667,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            right: 375 / 1.4,
            border: '4px solid green',
            width: 375 / 1.4,
            height: 667 / 1.4,
          }}
        >
          这是图片1,base64
          {url && <img src={url} alt="" width="100%" height="auto" />}
        </div>
        <div
          style={{
            position: 'absolute',
            right: 0,
            border: '4px solid green',
            width: 375 / 1.4,
            height: 667 / 1.4,
          }}
        >
          这是图片2
          {url2 && <img src={url2} alt="" width="100%" height="auto" />}
        </div>
      </div>
    </div>
  );
};
export default Board;
