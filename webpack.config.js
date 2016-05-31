var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
//  externals: [nodeExternals()],
  debug: true,
  devtool: 'eval-source-map',
  entry: './index.js',
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath:'/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee'],
    modulesDirectories: ['./modules','./node_modules']
  }
};