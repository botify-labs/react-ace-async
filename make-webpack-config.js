var webpack = require('webpack');
var path = require('path');

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

module.exports = function(build, grep) {
  var npmPath = path.resolve(__dirname, 'node_modules');

  var jsxExcludes = [/node_modules/];

  var config = {
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: [path.resolve(__dirname, 'bower_components')],
    },
    plugins: [],
    module: {
      loaders: [],
    },
  };

  switch (build) {
  case 'dev':
    config.devtool = 'eval';
    config.cache = true;
    config.entry = [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './example/index',
    ];
    config.output = {
      path: resolve('./dist/'),
      filename: 'react-ace.js',
      publicPath: '/dist/',
    };
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );
    config.module.loaders.push({
      test: /\.jsx?$/,
      loaders: ['react-hot-loader', 'babel-loader?stage=0', 'eslint-loader'],
      exclude: jsxExcludes,
    });
    break;
  case 'dist':
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  case 'optimize':
    config.entry = './src/index';
    config.output = {
      path: resolve('./dist/'),
      filename: 'react-ace.js',
      publicPath: '/dist/',
    };
    config.plugins.push(
      new webpack.optimize.DedupePlugin()
    );
    config.module.loaders.push({
      test: /\.jsx?$/,
      loaders: ['babel-loader?stage=0'],
      exclude: jsxExcludes,
    });
    break;
  }

  return config;
};
