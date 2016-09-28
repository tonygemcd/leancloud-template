import bunyan from 'bunyan'

export const log = bunyan.createLogger({
  name: require('../../package.json').name,
  serializers: bunyan.stdSerializers
})
