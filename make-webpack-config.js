var webpack = require('webpack');
var path = require('path');

function resolve() {
  var args = Array.prototype.slice.apply(arguments);
  return path.resolve.apply(path, [__dirname].concat(args));
}

module.exports = function(build, grep) {
  var srcPath = resolve('./src');
  var examplePath = resolve('./example');
  var npmPath = resolve('./node_modules');

  var config = {
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: [srcPath, npmPath],
    },
    plugins: [],
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.txt$/, loader: 'raw' },
      ],
    },
  };

  switch (build) {
  case 'dev':
    config.devtool = 'eval';
    config.cache = true;
    config.watch = true;
    config.failOnError = false;
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
      include: [srcPath, examplePath],
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
      include: [srcPath],
    });
    break;
  }

  return config;
};
