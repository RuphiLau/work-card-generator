const path = require('path')

const resolve = (...dir) => path.join(__dirname, '..', ...dir)

const outputDir = (...dir) => resolve('./dist', ...dir)

module.exports = {
    resolve,
    outputDir
}
