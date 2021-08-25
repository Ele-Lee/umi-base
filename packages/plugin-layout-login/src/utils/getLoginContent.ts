export default (
  userConfig: any,
  path: string,
  absPathMap: {
    headerSubMenuForLogin?: string;
  },
  // otherProps?: Object,
) => `
import React from 'react';

const LoginItemFC$ = require("${path}").default;

export const LoginItemFC = (props) => {

  const props$ = Object.assign({}, props, { headerSubMenuForLogin: ${
    absPathMap.headerSubMenuForLogin
      ? 'require("' + absPathMap.headerSubMenuForLogin + '").default'
      : 'undefined'
  } });
  if(typeof LoginItemFC$ === 'function') {
    return LoginItemFC$(props$);
  }
  // return React.createElement(LoginItemFC$, props$);
  return <LoginItemFC$ {...props$}/>
}

export default LoginItemFC;
`;
