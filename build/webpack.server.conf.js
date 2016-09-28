const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  entry: path.resolve(__dirname, '../server/index.js'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
    chunkFilename: 'server.[name].js',
    libraryTarget: 'commonjs2'
  },

  // Ignore built-in modules like path, fs, etc.
  target: 'node',

  externals: [
    // Ignore all modules in node_modules folder
    // https://github.com/liady/webpack-node-externals
    nodeExternals()
  ],

  plugins: [

    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    // new webpack.BannerPlugin('require("source-map-support").install();',
    //   { raw: true, entryOnly: false })
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  devtool: 'source-map'
})
