import { defineConfig } from 'umi';
// @ts-ignore
// import getSymlinks from 'get-symlinks';
import * as fs from 'fs';
import pkg from './package.json';

const apps = [
  {
    title: '子应用Aitem1',
    name: 'subapp1',
    path: 'subapp1/',
    entry_dev: '//localhost:8100',
    icon: 'UserOutlined',
    prefetch: true,
  },
  {
    title: '子应用B',
    name: 'subapp2',
    path: 'subapp2/',
    entry_dev: '//localhost:8200',
    icon: 'UserOutlined',
    prefetch: true,
  },
];

export default defineConfig({
  base: '/' + pkg.name,
  publicPath: '/' + pkg.name + '/',
  layout: false,

  dva: {
    hmr: true,
  },
  mlayout: {
    // routesConfig,
    injectMenuPlugin: ['@@/elelee-layout-login/MenuItemLogin'],
  },

  plugins: ['../../packages/plugin-layout-login/lib', '../../packages/plugin-mlayout/lib'],

  runtimePublicPath: false,
  qiankun: {
    master: {
      // 注册子应用信息
      // apps: apps.map(item => ({ name: item.name, entry: item.entry_dev })),

      sandbox: { experimentalStyleIsolation: true },
      // sandbox: {},
      prefetch: 'all',
    },
  },

  nodeModulesTransform: {
    type: 'none',
  },
  chainWebpack: (config, { webpack }) => {
    // let symlinks = getSymlinks.sync(['./node_modules/**'], {
    //   onlyDirectories: true,
    //   deep: 1,
    // });
    // symlinks.forEach((path: string) => {
    //   let _path = fs.realpathSync(path);
    //   config.module.rule('ts-in-node_modules').include.add(_path);
    // });
  },
  // externals: {
  //   '@grfe/micro-store': 'window["@grfe/micro-store"]',
  // },
  // headScripts: [
  //   { src: 'https://static.guorou.net/lib/micro_store@0.0.1-beta2.js' },
  // ],
  lessLoader: {},
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-styled-components',
  //     {
  //       ssr: true,
  //       displayName: true,
  //       preprocess: false,
  //     },
  //   ],
  // ],
  // favicon: 'https://p.geitu.net/15/6ggS9_.jpg?x-oss-process=image/resize,w_256,limit_1',
  // favicon: 'https://i.52112.com/icon/jpg/256/20190116/28061/1395736.jpg',
  proxy: {
    '/portalapi': {
      target: 'http://portal.test.guorou.net',
      changeOrigin: true,
    },
    '/portal': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
    '/phome': {
      target: 'http://portalhome.uae.shensz.local',
      changeOrigin: true,
    },
    '/login': {
      target: 'http://portalhome.uae.shensz.local',
      changeOrigin: true,
    },
    '/pauthapi': {
      target: 'http://portalhome.uae.shensz.local',
      changeOrigin: true,
    },
  },
});
