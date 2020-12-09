import { utils } from 'umi';
import { IApi } from '@umijs/types';
import { existsSync } from 'fs';
import { join } from 'path';
import getLoginContent from './utils/getLoginContent';

const { winPath } = utils;

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
  });

  api.addUmiExports(() => {
    return {
      source: winPath(`../${DIR_NAME}/MenuItemLogin`),
      specifiers: ['MenuItemLogin'],
      exportAll: true,
    };
  });
}
