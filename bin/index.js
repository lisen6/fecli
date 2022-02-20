#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')
const pkg = require('../package')

program
  .command('init <name>')
  .description('Generate a project from a remote template')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action(async (name, options) => {
    require('../utils/downloadTemplate').downloadTemplate(name, options)
  })

program
  .command('dev')
  .description('start the project')
  .action(() => {
    require('../webpack/startService').startService()
  })

program
  .command('build')
  .description('build the project')
  .action(() => {
    require('../webpack/webpack.build').buildService()
  })

program
  .version(chalk.green(`${pkg.version}`))
  .option('-d, --debug', 'output extra debugging')
  // 监听 --help 执行
  .on('--help', () => {
    // 打印脚手架logo
    console.log(
      '\r\n' +
        figlet.textSync('fecli', {
          font: 'Ghost',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true,
        }),
    )

    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `fecli <command> --help`,
      )} for detailed usage of given command\r\n`,
    )
  })

program.parse(process.argv)
