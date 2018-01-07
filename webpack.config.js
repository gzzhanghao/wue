const path = require('path')

module.exports = {

  entry: {
    main: './src',
  },

  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src'),
          path.resolve('vue'),
        ],
        options: {
          presets: [
            ['env', { targets: { node: 'current' }, modules: false }],
            'flow',
          ],
        },
      },
    ],
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve('vue/src'),
      path.resolve('vue/src/platforms'),
    ],
  },
}
