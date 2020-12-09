export default [
  {
    target: 'node',
    esm: { type: 'babel', importLibToEs: true },
    disableTypeCheck: true,
    extraBabelPlugins: [
      ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  },
];
