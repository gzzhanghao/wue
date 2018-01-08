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

  externals: [
    (context, request, callback) => {
      if (!context.replace(/\\/g, '/').includes('wue/node_modules')) {
        return callback(null)
      }
      callback(null, `commonjs2 ${path.join(context, request)}`)
    },
  ],

  resolve: {
    modules: [
      'node_modules',
      path.resolve('vue/src'),
      path.resolve('vue/src/platforms'),
    ],
  },
}
