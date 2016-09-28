const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const utils = require('./utils')

const PROJECT_ROOT = path.resolve(__dirname, '../')
const PUBLIC_ASSETS_PATH = path.resolve(PROJECT_ROOT, 'client/assets')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../client/main.js'),
    vendor: [
      'vue',
      'vue-router',
      'superagent/lib/client'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'client': path.resolve(PROJECT_ROOT, 'client'),
      'assets': PUBLIC_ASSETS_PATH
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $request: 'superagent/lib/client'
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: PROJECT_ROOT,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: PROJECT_ROOT,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: PROJECT_ROOT,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
