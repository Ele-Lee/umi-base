const OSS = require('ali-oss');
const path = require('path');
const recursiveReddir = require('recursive-readdir');
const pkg = require('./package.json');

// 上传到阿里云的前缀 example: /grow
const prefix = '/lib';
// 本地搜寻文件夹的根地址
const rootPath = process.cwd();
// 搜寻的文件夹
const flodername = './lib';
// 生成url前缀
const urlPrefix = 'https://static.guorou.net';

const client = new OSS({
  region: 'oss-cn-hangzhou',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: 'LTAIUJ3JY5ITzUaS',
  accessKeySecret: 'fhgCtZOkekWBCOOn6tPUZuLoMCTQ5t',
  bucket: 'static-zy-com',
});

function resolvePath(flodername) {
  return path.resolve(rootPath, flodername);
}

async function getAFloderAllFiles(flodername) {
  const result = await recursiveReddir(resolvePath(flodername));
  return result;
}

async function uploadAFileToOss(objectName, localpath, client) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await client.put(objectName, localpath);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function uploadAFloderToOss() {
  const allFloderFilePath = await getAFloderAllFiles(flodername);
  // 只上传js
  const filteredExtnameFiles = allFloderFilePath.filter(filePath => {
    return path.extname(filePath) === '.js' || path.extname(filePath) === '.map';
  });
  const localfileToBucketRelativePaths = filteredExtnameFiles
    .map(file => {
      console.log(file);
      return file.replace(resolvePath(flodername), '');
    })
    .map(item => {
      return `${prefix}${item.replace(/(\/)\w+(\.js)/, (...args) => {
        return args[1] + 'micro_store@' + pkg.version + args[2];
      })}`;
    });
  // return;
  await Promise.all(
    filteredExtnameFiles.map(async (relativepath, _index) => {
      return await uploadAFileToOss(localfileToBucketRelativePaths[_index], relativepath, client);
    }),
  );
  console.log(localfileToBucketRelativePaths.map(item => `${urlPrefix}${item}`).join('\n'));
}

uploadAFloderToOss();
