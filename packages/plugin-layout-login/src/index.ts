import { utils } from 'umi';
import { IApi } from '@umijs/types';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import getLoginContent from './utils/getLoginContent';
import { keyForStorageAuth } from './MenuItemLogin/helpers/constant';

const { winPath, Mustache } = utils;

const DIR_NAME = 'elelee-layout-login';

const CONFIG_KEY = 'layoutLogin';

export default function(api: IApi) {
  // api.describe({
  //   key: CONFIG_KEY,
  //   config: {
  //     schema(joi) {
  //       return joi.object();
  //     },
  //     onChange: api.ConfigChangeType.regenerateTmpFiles,
  //   },
  //   enableBy: api.EnableBy.config,
  // });

  const pathMap = {
    headerSubMenuForLoginPath: api.paths.absSrcPath + '/mlayout/headerSubMenuForLogin',
  };

  const existspathExistMap = {
    hasHeaderSubMenuForLogin: existsSync(pathMap.headerSubMenuForLoginPath),
  };

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'MenuItemLogin.tsx'),
      content: getLoginContent(
        {},
        winPath(join(__dirname, './MenuItemLogin/index.js')),
        {
          headerSubMenuForLogin: existspathExistMap.hasHeaderSubMenuForLogin
            ? pathMap.headerSubMenuForLoginPath
            : void 0,
        },
        // {},
      ),
    });

    const infoActionTpl = readFileSync(join(__dirname, './utils/infoAction.tpl'), 'utf-8');
    api.writeTmpFile({
      path: `${DIR_NAME}/infoAction.tsx`,
      content: Mustache.render(infoActionTpl, {
        keyForStorageAuth,
      }),
    });
  });

  api.addUmiExports(() => {
    return {
      source: winPath(`../${DIR_NAME}/infoAction`),
      // source: `../${DIR_NAME}/infoAction`,
      // specifiers: ['getUserInfo'],
      exportAll: true,
    };
  });
}
