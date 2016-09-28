import webpack from 'webpack'
import webpackConfig from '../build/webpack.prod.conf'
import config from '../config'

const compiler = webpack(webpackConfig)

console.log('\n------------------------------------')
console.log('Begin to compile client-side code')
console.log('ENV: \t%s', config.env)
console.log('------------------------------------\n')

compiler.run((err, stats) => {
  if (err) throw err

  // Webpack stats report
  console.log(stats.toString({
    colors: true,
    chunks: false
  }))
  console.log('\n----------------------------------')
  console.log('Compiling client-side code success!')
  console.log('------------------------------------\n')
})
