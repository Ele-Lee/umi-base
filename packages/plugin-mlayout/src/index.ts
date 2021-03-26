import { IApi, utils } from 'umi';
import { join } from 'path';
import * as allIcons from '@ant-design/icons';
import getLayoutContent from './utils/getLayoutContent';
// import { LayoutConfig } from './types';
import { readFileSync, existsSync } from 'fs';

interface LayoutConfig {
  name?: string;
  logo?: string;
  theme?: string;
  locale?: any; // same with locale plugin
  showBreadcrumb?: boolean; // TODO 面包屑功能暂不支持
  layoutComponent?: Record<string, string>; // 自定义主题
}

const DIR_NAME = 'elelee-layout';

const CONFIG_KEY = 'mlayout';

export interface MenuDataItem {
  children?: MenuDataItem[];
  routes?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
}

// function haveProLayout() {
//   try {
//     require.resolve('@ant-design/pro-layout');
//     return true;
//   } catch (error) {
//     console.log(error);
//     console.error('@umijs/plugin-layout 需要安装 ProLayout 才可运行');
//   }
//   return false;
// }

function toHump(name: string) {
  return name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

function formatter(data: MenuDataItem[]): string[] {
  if (!Array.isArray(data)) {
    return [];
  }
  let icons: string[] = [];
  (data || []).forEach((item = { path: '/' }) => {
    // 兼容旧的写法 menu:{icon:""}
    if (item.menu) {
      item = { ...item, ...item.menu };
    }
    // if (item.icon) {
    //   const { icon } = item;
    //   const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
    //   if (allIcons[icon]) {
    //     icons.push(icon);
    //   }
    //   if (allIcons[`${v4IconName}Outlined`]) {
    //     icons.push(`${v4IconName}Outlined`);
    //   }
    // }
    const items = item.routes || item.children;
    if (items) {
      icons = icons.concat(formatter(items));
    }
  });

  return Array.from(new Set(icons));
}

export default (api: IApi) => {
  api.describe({
    key: CONFIG_KEY,
    config: {
      schema(joi) {
        return joi.object();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.config,
  });

  // api.modifyDefaultConfig((config) => {
  //   // @ts-ignore
  //   config.title = false;
  //   return config;
  // });

  let layoutOpts: LayoutConfig = {};

  api.addRuntimePluginKey(() => [CONFIG_KEY]);

  api.onGenerateFiles(() => {
    // apply default options
    const { name } = api.pkg;
    layoutOpts = {
      name,
      theme: 'PRO',
      locale: false,
      showBreadcrumb: true,
      ...(api.config[CONFIG_KEY] || {}),
    };

    // allow custom theme
    let layoutComponent = {
      PRO: utils.winPath(join(__dirname, './layout/index.js')),
    };
    if (layoutOpts.layoutComponent) {
      layoutComponent = Object.assign(layoutOpts.layoutComponent, layoutComponent);
    }

    // const theme = (layoutOpts.theme && layoutOpts.theme.toUpperCase()) || 'PRO';
    const currentLayoutComponentPath = layoutComponent['PRO'];

    const pathMap = {
      headerMenuPath: api.paths.absSrcPath + '/mlayout/headerMenu',
      headerSubMenuPath: api.paths.absSrcPath + '/mlayout/headerSubMenu',
      headerTabsPath: api.paths.absSrcPath + '/mlayout/headerTabs',
    };

    const existspathExistMap = {
      hasHeaderMenuPath: existsSync(pathMap.headerMenuPath),
      hasHeaderSubMenu: existsSync(pathMap.headerSubMenuPath),
      hasHeaderTabs: existsSync(pathMap.headerTabsPath),
    };

    const { userConfig } = api;
    const { injectMenuPlugin, headerTitle, menus } = userConfig[CONFIG_KEY];

    api.writeTmpFile({
      path: join(DIR_NAME, 'Layout.tsx'),
      content: getLayoutContent(
        layoutOpts,
        currentLayoutComponentPath,
        {
          headerMenu: existspathExistMap.hasHeaderMenuPath ? pathMap.headerMenuPath : void 0,
          headerTabs: existspathExistMap.hasHeaderTabs ? pathMap.headerTabsPath : void 0,
          injectMenuPlugin,
          headerTitle,
          menus,
        },
        {},
      ),
    });

    // 生效临时的 icon 文件
    // TODO 这里需要补充
    const icons = formatter(userConfig.menusConfig);
    let iconsString = icons.map(
      iconName => `import ${iconName} from '@ant-design/icons/${iconName}'`,
    );

    // api.writeTmpFile({
    //   path: join(DIR_NAME, 'icons.ts'),
    //   content: `
    //     ${iconsString.join(';\n')}
    //     export default {
    //       ${icons.join(',\n')}
    //     }
    //   `,
    // });

    // api.writeTmpFile({
    //   path: join(DIR_NAME, 'runtime.tsx'),
    //   content: readFileSync(join(__dirname, 'runtime.tsx.tpl'), 'utf-8'),
    // });
  });

  api.modifyRoutes(routes => {
    return [
      {
        path: '/',
        component: utils.winPath(join(api.paths.absTmpPath || '', DIR_NAME, 'Layout.tsx')),
        routes,
      },
    ];
  });

  // api.addRuntimePlugin(() => ['@@/' + DIR_NAME + '/runtime.tsx']);
};
