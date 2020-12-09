/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');
const { getSubPkgSourcePath } = require('./sub-pkg-alias');

const tsconfigPath = path.resolve(__dirname, '../conf/tsconfig/tsconfig.path.json');
const tsconfig = require(tsconfigPath);

function getPaths() {
  const subPkgPathMap = getSubPkgSourcePath();
  return Array.from(subPkgPathMap.entries()).reduce((res, [pkgName, pkgPath]) => {
    const sourceDir = path.join(pkgPath, 'src').replace();
    const aliasPath = path.relative(path.dirname(tsconfigPath), sourceDir);

    res[pkgName] = [aliasPath];
    res[`${pkgName}/*`] = [path.join(aliasPath, '*')];

    const buildDirs = ['lib', 'es'];
    buildDirs.forEach(dir => {
      res[`${pkgName}/${dir}`] = [aliasPath];
      res[`${pkgName}/${dir}/*`] = [path.join(aliasPath, '*')];
    });

    return res;
  }, {});
}

function settingPaths() {
  fs.writeFileSync(
    tsconfigPath,
    JSON.stringify(
      {
        ...tsconfig,
        compilerOptions: {
          ...tsconfig.compilerOptions,
          paths: getPaths(),
        },
      },
      undefined,
      2,
    ),
  );

  console.log('✅配置 tsconfig paths 成功！');
}

settingPaths();
