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
  const QueryWrap: any = (props: any) => {
    // const { current: containerId } = useRef(props.containerId);
    const containerId = '__nextRender__';
    // const postOssUrl = (imgNameInParams?: string, forceLaunch?: boolean) => {
    //   if (!forceLaunch) {
    //     // 有dev=1证明是预览，不执行自动生成
    //     const isPreview =
    //       window.location.search.indexOf('dev=1') > -1 ||
    //       window.location.search.indexOf(previewStr) > -1;
    //     if (isPreview || options.cancelCacheWhenShow) {
    //       return;
    //     }
    //   }

    //   const fn = async (_cancelStorage?: boolean) => {
    //     const storageKey =
    //       ossImgName.current || makeHashName(window.location.href, options.ossPath);
    //     // name 可会作为缓存名字，可以通过名字设置缓存的使用
    //     const urlFromStorage = window.sessionStorage.getItem(storageKey);
    //     let resUrl;

    //     if (isDev() && !options.ossPath) {
    //       console.log('%celelee test:', 'background:#000;color:#f00', '你当前没有设置OSS路径');
    //     }

    //     if (urlFromStorage) {
    //       resUrl = urlFromStorage;
    //     } else {
    //       resUrl = await handleOneImg({
    //         domId: THE_ID,
    //         useCanvas: options.useCanvas,
    //         imgType: options.imgType || 'image/jpeg',
    //         imgName: imgNameInParams ? imgNameInParams : ossImgName.current,
    //         ossPath: IMG_OSS_PATH_MAP[options.ossPath],
    //       });

    //       if (!_cancelStorage) {
    //         window.sessionStorage.setItem(storageKey, resUrl);
    //       }
    //     }
    //     console.log(
    //       '%celelee test -> ossUrl:',
    //       'background: #08802e;color: #ffe100',
    //       props.query['__id__'] || props.query.id,
    //       resUrl,
    //     );
    //     parent.postMessage(
    //       { url: resUrl, id: props.query['__id__'] || props.query.id || 'none', type: 'oss-img' },
    //       '*',
    //     );
    //   };
    //   fn(options.cancelStorage);
    // };

    // const buildForBlob = async (imgNameInParams?: string) => {
    //   const res = await handleOneImgForBlob({
    //     domId: THE_ID,
    //     useCanvas: options.useCanvas,
    //     imgType: options.imgType || 'image/jpeg',
    //     imgName: imgNameInParams ? imgNameInParams : ossImgName.current,
    //     ossPath: IMG_OSS_PATH_MAP[options.ossPath],
    //   });

    //   return res;
    // };
    const [renderStateDone, setRenderStateDone] = useState(false);

    // const { initKey } = useBrowserInit();
    // const { getFonts, renderLoadedFont, fontsLoaded } = useLoadFonts();
    // const { imgKeysList, cancelAutoPost } = options;
    // const ossImgName = useRef('');

    // const loadImgs = async (imgs: string[]) => {
    //   let completeImgList: string[] = [];
    //   imgs.forEach((key) => {
    //     completeImgList = [...completeImgList, ...props.query[key].split(',')];
    //   });
    //   const loadHanders = completeImgList.map((url) => loadImg(url));
    //   try {
    //     return await Promise.all(loadHanders);
    //   } catch (error) {
    //     // 旧代码用可能还使用了这个函数，如果图片错了，不处理，也不让它影响下一个函数
    //     return Promise.resolve();
    //   }
    // };

    useEffect(() => {
      new MyTTi().initLoop().then(() => setRenderStateDone(true));
    }, []);

    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     window.postOssUrl = postOssUrl;
    //     window.buildForBlob = buildForBlob;
    //   }
    // }, []);

    useEffect(() => {
      // if (cancelAutoPost) return;
      if (!renderStateDone) return;

      (async function() {
        const dom = window.__fatherDom__ || document.getElementById(containerId);
        const htmlToImage = await import('html-to-image');
        if (dom && htmlToImage) {
          const blob = await htmlToImage.toJpeg(dom);
          if (!blob) return;

          const globalTopWin = window.imgCache || { list: [] };
          globalTopWin.list.push(blob);
        }
      })();
      console.log('%celelee test:', 'background:#000;color:#fff', renderStateDone);
      // if (renderStateDone && initKey) {
      //   if (imgKeysList && imgKeysList.length) {
      //     loadImgs(imgKeysList).then(() => postOssUrl());
      //   } else {
      //     Promise.resolve().then(() => postOssUrl());
      //   }
      // }
    }, [renderStateDone]);

    // const setImgName = (name: string) => {
    //   if (ossImgName.current) throw 'you had set name';
    //   if (name) {
    //     ossImgName.current = makeHashName(name, options.ossPath);
    //   }
    // };

    // const setNamePayload = (p: string) => {
    //   if (ossImgName.current) throw 'you had set name';
    //   if (!p) {
    //     console.error('值是空，你TM传进来干嘛');
    //   }
    //   if (p !== null) {
    //     const { clazz_id, student_id, clazz_plan_id } = props.query;
    //     ossImgName.current = makeHashName(
    //       makeOssImgName({
    //         studentId: student_id,
    //         clazzId: clazz_id,
    //         clazzPlanId: clazz_plan_id,
    //         payload: p,
    //       }),
    //       options.ossPath,
    //     );
    //   }
    // };

    return (
      <div id={containerId} style={{ display: 'inline-block' }}>
        <Component {...props} />
        {/* {renderLoadedFont} */}
      </div>
    );
  };
  QueryWrap.getInitialProps = async (params: any) => {
    // const { asPath } = params;
    // const query = initQueryProps(asPath);
    // const initRes = await launchCompInitFnWithQuery(options, query);
    // const compInitRes = await launchCompInitialProps(Component, params);

    const containerId =
      '__nextRender__' +
      Math.random()
        .toString(36)
        .slice(2);

    return { containerId };
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
