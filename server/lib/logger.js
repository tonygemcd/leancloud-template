import bunyan from 'bunyan'

const log = bunyan.createLogger({
  name: require('../../package.json').name,
  serializers: bunyan.stdSerializers
})

exports.log = log
