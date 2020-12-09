import typescript from 'rollup-plugin-typescript2';
import { version, name } from './package.json';
import { terser } from 'rollup-plugin-terser';
import banner from 'rollup-plugin-banner';

const bannerTxt = `
 *!
 * ${name}.js v${version}
 * (c) 2020-${new Date().getFullYear()} Ele Lee
 *
`;

export default {
  input: 'src/index.ts', // 入口文件
  output: {
    name, // umd 模式必须要有 name  此属性作为全局变量访问打包结果
    file: `lib/index.js`,
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
      },
    }),
    terser(),
    banner(bannerTxt),
  ],
};
