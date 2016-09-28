import AV from 'leanengine'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import history from 'connect-history-api-fallback'
import config from '../../config'

import userApi from '../apis/user'

const APP_ROOT_PATH = require('app-root-path')

const app = express()

/**
 * Config view engine
 */
app.set('views', APP_ROOT_PATH + '/server/views/')
app.set('view engine', 'mustache')

/**
 * LeanCloud middleware
 */
app.use(AV.express())

/**
 * Hot reload middleware
 */
if (config.env === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('../../build/webpack.dev.conf')

  const compiler = webpack(webpackConfig)
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  const hotMiddleware = require('webpack-hot-middleware')(compiler)
  // Reload when html-webpack-plugin template changed
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  // Register webpack-dev and webpack-hot middleware
  app.use(devMiddleware)
  app.use(hotMiddleware)
} else {
  app.get('/', (req, res) => {
    res.sendFile(APP_ROOT_PATH + '/server/views/index.html')
  })
}

/**
 * Register Node.js middleware
 */
app.use(history())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Static path
 */
app.use('/static', express.static(APP_ROOT_PATH + '/dist/static/'))

/**
 * APIs
 */
app.use('/api/user', userApi)

/**
 * Error Handler
 */
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app
