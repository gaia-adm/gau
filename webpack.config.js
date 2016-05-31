var path = require('path');
//var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
//  externals: [nodeExternals()],
  debug: true,
  devtool: 'eval-source-map',
  entry: './public/scripts/main.js',
  output: {
    filename: './public/bundle.js'
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
    modulesDirectories: ['./public/scripts','./node_modules']
  }
};