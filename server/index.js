/**
 * babel-register for development
 * this should be removed in production
 */
require('babel-register')({
  sourceMaps: true
})

const AV = require('leanengine')
const app = require('./lib/app')
const config = require('../config')

// initialize LeanCloud
AV.init({
  appId: config.LEANCLOUD_APP_ID,
  appKey: config.LEANCLOUD_APP_KEY,
  masterKey: config.LEANCLOUD_APP_MASTER_KEY
})
AV.Cloud.useMasterKey()

app.listen(config.port, () => {
  console.log('\n----------------------------')
  console.log('Node app is running!')
  console.log('ENV: \t%s', config.env)
  console.log('PORT: \t%s', config.port)
  console.log('NODE VERSION: \t%s', process.version)
  console.log('----------------------------\n')
})
