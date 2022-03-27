const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.baseConfig')
const args = process.argv.slice(2)

function buildService() {
  let [mode] = args
  if (mode === 'build') {
    webpack(webpackBaseConfig(), (error, stats) => {
      if (error) {
        console.log(error)
        process.exit(1)
      }
      process.exit(0)
    })
  }
}
module.exports = {
  buildService,
}
