import { defineConfig } from 'umi';
import * as fs from 'fs';
import pkg from './package.json';
import { routes as routesConfig } from './config';

export default defineConfig({
  base: '/' + pkg.name,
  publicPath: '/' + pkg.name + '/',
  dva: {},
  qiankun: {
    slave: {},
  },
  nodeModulesTransform: {
    type: 'all',
  },
  mlayout: {
    // subname: 'subapp1',
    headerTitle: '果肉运营后台基座2',
    menuConfig: routesConfig,
    injectMenuPlugin: ['@@/elelee-layout-login/MenuItemLogin'],
  },
  plugins: ['../../packages/plugin-mlayout/lib', '../../packages/plugin-layout-login/lib'],
  // plugins: ['../../../micro-layout/lib', '../../../projects/portal_base/packages/plugin-layout-login/lib'],

  // chainWebpack: (config, { webpack }) => {
  //   let symlinks = getSymlinks.sync(['./node_modules/**'], {
  //     onlyDirectories: true,
  //     deep: 1,
  //   });
  //   symlinks.forEach((path: string) => {
  //     let _path = fs.realpathSync(path);
  //     config.module.rule('ts-in-node_modules').include.add(_path);
  //   });
  // },
  // externals: {
  //   // '@grfe/micro-store': '@grfe/micro-store',
  //   'micro-layout': 'micro-layout',
  //   '../../micro-layout/lib': '../../micro-layout/lib',
  // },
  // headScripts: [
  //   {
  //     src: 'https://static.guorou.net/lib/micro_store@0.0.1-beta2.js',
  //     ingore: true,
  //   },
  // ],
  proxy: {
    '/portalapi': {
      target: 'http://portal.test.guorou.net',
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
  },
});
