import React, { useRef, useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import MyTTi from './ttiListener';

// import { handleOneImg, loadImg, handleOneImgForBlob } from '@/utils/img';
// import md5 from 'md5';
// import { PagesProps, WrapOption } from '@/typing/commen';
// import { useLoadFonts, useBrowserInit, useComponentWillMount } from './helper/hook';
// import { makeOssImgName, isDev } from '@/utils/common';
// import { IMG_OSS_PATH_MAP } from '@/utils/constant';

// // modify 用来区别，图片类型，防止因为参数一样，不同海报生成的图片名字一样
// const makeHashName = (customImgName: string, modify: string) => {
//   // const storageUid = window.location.href
//   //   .replace(/&dev=\d+/, '')
//   //   .replace(/&__preview__=\d+/, '')
//   //   .replace('/&id=/', '')
//   //   .replace(/&id=[\w|-]+/, '');
//   const keyName = customImgName ? md5(customImgName) : Math.random().toString(36).slice(2);
//   return `${customImgName || 'IMG_GEN_KEY'}_${keyName}_${modify}`;
// };
// const previewStr = '__preview__=1';

const QueryWrapHandler = (Component: any, options: any = {}) => {
  const containerId = Component.id
    ? Component.id
    : typeof window === 'undefined'
    ? ''
    : '__nextRender__' +
      Math.random()
        .toString(36)
        .slice(2);

  const QueryWrap: any = (props: any) => {
    // const { current: containerId } = useRef(props.containerId);
    // const containerId = '__nextRender__';
    // const [renderStateDone, setRenderStateDone] = useState(false);

    const containerDom = useRef<any>(null);

    // useEffect(() => {
    //   if (containerDom.current && typeof window !== 'undefined') {
    //     containerDom.current.id = containerId;
    //   }
    // }, [containerDom]);

    useEffect(() => {
      const dom = window.__fatherDom__;
      new MyTTi().initLoop().then(async () => {
        //  setRenderStateDone(true)
        const htmlToImage = await import('html-to-image');
        if (dom && htmlToImage) {
          const blob = await htmlToImage.toJpeg(dom);
          if (!blob) return;

          const globalTopWin = window.imgCache || { list: [] };
          globalTopWin.list.push(blob);
        }
      });
    }, []);

    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     window.postOssUrl = postOssUrl;
    //     window.buildForBlob = buildForBlob;
    //   }
    // }, []);

    // useEffect(() => {
    //   // if (cancelAutoPost) return;
    //   if (!renderStateDone) return;

    //   (async function() {
    //     const dom = window.__fatherDom__ || document.getElementById(containerId);
    //     const htmlToImage = await import('html-to-image');
    //     if (dom && htmlToImage) {
    //       const blob = await htmlToImage.toJpeg(dom);
    //       if (!blob) return;

    //       const globalTopWin = window.imgCache || { list: [] };
    //       globalTopWin.list.push(blob);
    //     }
    //   })();
    //   console.log('%celelee test:', 'background:#000;color:#fff', renderStateDone);
    //   // if (renderStateDone && initKey) {
    //   //   if (imgKeysList && imgKeysList.length) {
    //   //     loadImgs(imgKeysList).then(() => postOssUrl());
    //   //   } else {
    //   //     Promise.resolve().then(() => postOssUrl());
    //   //   }
    //   // }
    // }, [renderStateDone]);

    return (
      <div ref={containerDom} style={{ display: 'inline-block' }}>
        <Component {...props} />
        {/* {renderLoadedFont} */}
      </div>
    );
  };
  QueryWrap.getInitialProps = async (params: any) => {
    return {};
  };

  return QueryWrap;
};

export default QueryWrapHandler;
// async function launchCompInitialProps(Comp: PagesProps<any>, params: NextPageContext) {
//   if (typeof Comp.getInitialProps === 'function') {
//     return Comp.getInitialProps(params);
//   }
//   return {};
// }

// function initQueryProps(asPath: string) {
//   const query = qs.parse(asPath?.slice(asPath.indexOf('?') + 1) as string);
//   return query;
// }

// async function launchCompInitFnWithQuery(paramsOption: WrapOption, query: any) {
//   if (paramsOption.initFn) {
//     try {
//       return paramsOption.initFn(query);
//     } catch (error) {
//       console.log(`initFn: ${error}`);
//     }
//   }
//   return {};
// }
