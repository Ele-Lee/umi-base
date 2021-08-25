import React, { useState } from 'react';
// import sideMenu from '@/mlayout/sideMenu';
import { loadMicroApp } from 'qiankun';

interface BoardProps {}
const Board: React.FC<BoardProps> = ({}) => {
  const [url, setUrl] = useState('');
  const [style, setStyle] = useState({});

  const loadNextjs = () => {
    // @ts-ignore
    window.imgCache = window.imgCache || { a: { b: { c: 2 } } };
    loadMicroApp(
      {
        name: 'next-app',
        entry: '/image/prize/level1',
        container: '#next-container',
        props: {
          // @ts-ignore
          store: window.imgCache,
          topWin: window,
        },
      },
      {
        sandbox: true,
      },
    );
    // loadMicroApp(
    //   {
    //     name: 'next-app',
    //     entry: '/image/prize/level1',
    //     container: '#next-container2',
    //     props: {
    //       // @ts-ignore
    //       store: window.imgCache,
    //       topWin: window,
    //     },
    //   },
    //   {
    //     sandbox: true,
    //   },
    // );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div>海报测试</div>
      <button
        onClick={() => {
          setStyle({});
          loadNextjs();
        }}
      >
        load poster and show
      </button>
      <button
        onClick={() => {
          setStyle({
            left: -9999,
          });
          loadNextjs();
        }}
      >
        load poster but hide
      </button>
      <button
        onClick={() => {
          // @ts-ignore
          if (window?.imgCache.test) {
            // @ts-ignore
            setUrl(window.imgCache.test);
          }
        }}
      >
        show picture
      </button>

      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        子应用
        <div
          id="next-container"
          style={{
            border: '2px solid gray',
            width: 375,
            height: 667,
            position: 'absolute',
            ...style,
          }}
          data-next="1"
        ></div>
        <div
          style={{
            position: 'absolute',
            right: 0,
            border: '4px solid green',
            width: 375,
            height: 667,
          }}
        >
          图片
          {url && <img src={url} alt="" width="100%" />}
        </div>
      </div>
      <div>
        {/* <div
          id="next-container2"
          style={{ border: '1px solid gray', width: 375, height: 667 }}
          data-next="1"
        ></div> */}
      </div>
    </div>
  );
};
export default Board;
