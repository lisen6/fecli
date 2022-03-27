const chalk = require('chalk')
const pkg = require('../package.json')
const app = require('./webpack.devServer')
const { resolveCWDPath, getIPAddress } = require('../utils')
chalk.level = 1

const startService = () => {
  // 读取用户资源及端口
  let { DEV_SERVER_PORT, IP } = require(resolveCWDPath('./fecli.json'))
  IP = IP ?? getIPAddress()
  app.listen(DEV_SERVER_PORT, () => {
    const { name, version } = pkg
    console.log('\r\n')
    console.log(
      chalk.cyan(`  ${name} v${version}`) +
        chalk.green(' dev server running at:\r\n'),
    )
    console.log(`  local: ${chalk.cyan(`http://localhost:${DEV_SERVER_PORT}`)}`)
    console.log(`  Network: ${chalk.cyan(`http://${IP}:${DEV_SERVER_PORT}`)}`)

    console.log('\r\n')
  })
}

module.exports = {
  startService,
}
