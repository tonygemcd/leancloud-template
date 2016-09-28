const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.NODE_ENV === 'production' ? process.env.LEANCLOUD_APP_PORT : 3000,

  /**
   * LeanCloud Config
   */
  LEANCLOUD_APP_ID: '',
  LEANCLOUD_APP_KEY: '',
  LEANCLOUD_APP_MASTER_KEY: ''
}

/**
 * Environment
 * N.B.: globals added here must _also_ be added to .eslintrc
 * @type {Object}
 */
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development'
}

module.exports = config
