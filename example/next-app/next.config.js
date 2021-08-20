const pkg = require('./package.json');

const projectName = 'image';

module.exports = {
  reactStrictMode: true,
  basePath: '/' + projectName,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    // output
    // config.output = {
    //   ...config.output,
    //   library: `${pkg.name}-[name]`,
    //   libraryTarget: 'umd',
    //   jsonpFunction: `webpackJsonp_${pkg.name}`,
    // };
    // const registeredName = new webpack.DefinePlugin({
    //   projectName: `'${projectName}'`,
    // });
    // config.plugin('define').use(registeredName);
    return config;
  },
};
