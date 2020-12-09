/**
 * 清除生成文件
 */

import fs from 'fs';
import process from 'process';
import rimraf from 'rimraf';

const projectRoot = process.cwd();

const includeExtnames: string[] = ['.js', '.d.ts', 'dist'];
const excludeFiles: string[] = ['jest.config.js', '.eslint.js'];

function isGeneratedFile(filePath: string) {
  return (
    !isExcludeFile(filePath) &&
    includeExtnames.reduce((res, extname) => res || filePath.endsWith(extname), false)
  );
}

function isExcludeFile(filePath: string) {
  return excludeFiles.reduce((res, excludeFile) => res || filePath.endsWith(excludeFile), false);
}

function findGeneratedFiles() {
  return fs.readdirSync(projectRoot).filter(isGeneratedFile);
}

function removeFiles(files: string[]) {
  files.forEach((file) => {
    rimraf.sync(file);
  });
}

const unRemoveFiles = findGeneratedFiles();
removeFiles(unRemoveFiles);

console.log('🎉清除生成文件完成!');
