export default (
  userConfig: any,
  path: string,
  absPathMap: {
    headerSubMenuForLogin?: string;
  },
  // otherProps?: Object,
) => `
const LoginItemFC$ = require("${path}").default

export const LoginItemFC = (props) => LoginItemFC$(Object.assign(props, { headerSubMenuForLogin: ${
  absPathMap.headerSubMenuForLogin
    ? 'require("' + absPathMap.headerSubMenuForLogin + '").default'
    : 'undefined'
} }));

export default LoginItemFC;
`;
