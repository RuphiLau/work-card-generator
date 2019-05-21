const devConfig = require('./build/webpack.dev.config')
const prodConfig = require('./build/webpack.prod.config')

module.exports = env => env === 'production' ? prodConfig : devConfig