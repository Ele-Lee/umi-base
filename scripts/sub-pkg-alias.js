/**
 * 子包别名管理
 */

const fs = require('fs');
const path = require('path');

function getAllSubPkgName() {
  const subPkgDirPath = path.resolve(__dirname, '..', 'packages');

  return fs
    .readdirSync(subPkgDirPath, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => {
      try {
        const pkgJsonPath = path.join(subPkgDirPath, item.name, 'package.json');

        let pkgName;

        const pkgJson = require(pkgJsonPath);
        pkgName = pkgJson.name;
        return pkgName;
      } catch (err) {
        console.log(`❌获取子包 ${item.name} 名失败!`);
        console.error(err);
      }
      return '';
    })
    .filter(pkgName => !!pkgName);
}

function resolveModule(pkgName, main = 'package.json') {
  const pkgReeolvePath = require.resolve(`${pkgName}/${main}`);

  return pkgReeolvePath
    .split(path.sep)
    .slice(0, -1 * main.split('/').length)
    .join(path.sep);
}

function getSubPkgSourcePath(pkgNames = getAllSubPkgName()) {
  return pkgNames.reduce((map, pkgName) => {
    map.set(pkgName, resolveModule(pkgName));
    return map;
  }, new Map());
}

module.exports.getAllSubPkgName = getAllSubPkgName;
module.exports.resolveModule = resolveModule;
module.exports.getSubPkgSourcePath = getSubPkgSourcePath;
