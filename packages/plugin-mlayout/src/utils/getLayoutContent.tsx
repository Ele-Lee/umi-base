import { LayoutConfig } from '../typings';

export default (
  userConfig: LayoutConfig,
  path: string,
  absPathMap: {
    headerMenu?: string;
    injectMenuPlugin?: string[];
  },
  otherProps?: Object,
) => {
  const { injectMenuPlugin = [] } = absPathMap;

  const importObjList = injectMenuPlugin.map((item, idx) => {
    if (item.startsWith('plugin')) {
      // plugin-layout-login
      // TODO 在node_modules里面找出来
      // item =
    }

    return {
      name: `Item${idx + 1}`,
      path: `import Item${idx + 1} from "${item}"`,
    };
  });

  const importListStr = (() => {
    let str = '';
    importObjList.forEach(item => {
      str += item.path + ';\n';
    });
    return str;
  })();
  const nameListStr = (() => {
    const str = importObjList.map(item => item.name).join(';');
    return '[' + str + ']';
  })();

  return `
import React, { useState, useEffect } from "react";
import { ApplyPluginsType, useModel } from "umi";
import { plugin } from "../core/umiExports";
${importListStr}

export default props => {
  const [runtimeConfig, setRuntimeConfig] = useState(null);

  const initialInfo = (useModel && useModel("@@initialState")) || {
    initialState: undefined,
    loading: false,
    setInitialState: null
  }; // plugin-initial-state 未开启

  useEffect(() => {
    const useRuntimeConfig =
      plugin.applyPlugins({
        key: "mlayout",
        type: ApplyPluginsType.modify,
        initialValue: initialInfo
      }) || {};
    if (useRuntimeConfig instanceof Promise) {
      useRuntimeConfig.then(config => {
        setRuntimeConfig(config);
      });
      return;
    }
    setRuntimeConfig(useRuntimeConfig);
  }, [initialInfo?.initialState]);

  const userConfig = {
    ...${JSON.stringify(userConfig).replace(/"/g, "'")},
    ...runtimeConfig || {},
    ...${JSON.stringify(otherProps)}
  };

  const userComp = {
    headerMenu: ${
      absPathMap.headerMenu ? 'require("' + absPathMap.headerMenu + '").default' : 'undefined'
    },
    pluginItems: ${nameListStr}
  };

  if(!runtimeConfig){
    return null
  }

  return React.createElement(require("${path}").default, {
    userConfig,
    userComp,
    ...props
  });
};
  `;
};
