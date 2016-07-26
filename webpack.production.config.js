var webpack = require('webpack');
var path = require('path');

module.exports = {
  target: 'web',
//  externals: [nodeExternals()], //do not include node modules (not core). problematic - we need react* at least
  //devtool: 'eval-source-map',  //bigger package but better for debugging
  devtool: 'source-map', //smaller package but worse for debugging - ~7 times difference in bundle size
  entry: './index.js',
  output: {
    path: 'public/gau',
    filename: 'bundle.js',
    publicPath:'/gau/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
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