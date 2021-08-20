import React, { useState } from 'react';
// import sideMenu from '@/mlayout/sideMenu';
import { loadMicroApp } from 'qiankun';

interface BoardProps {}
const Board: React.FC<BoardProps> = ({}) => {
  const [url, setUrl] = useState('');

  return (
    <div>
      test2 page~
      <button
        onClick={() => {
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
        }}
      >
        show poster
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
        show pick
      </button>
      <div style={{ display: 'flex' }}>
        <div
          id="next-container"
          style={{ border: '1px solid gray', width: 375, height: 667 }}
          data-next="1"
        ></div>

        <div style={{ border: '4px solid green', width: 375, height: 667 }}>
          {url && <img src={url} alt="" width="100%" />}
        </div>
      </div>
      <div>
        <div
          id="next-container2"
          style={{ border: '1px solid gray', width: 375, height: 667 }}
          data-next="1"
        ></div>
      </div>
    </div>
  );
};
export default Board;
