#!/usr/bin/env node

const {
  program
} = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const pkg = require("../package");
const create = require("../lib/create");
const {
  startService
} = require("../webpack/start");

const {
  buildService
} = require('../webpack/build')

// 拉取远程模板
program
  .command("init <name>")
  .description("Generate a project from a remote template")
  .option("-f, --force", "overwrite target directory if it exist")
  .action(async (name, options) => {
    await create(name, options);
  });

// 开启服务
program
  .command("dev")
  .description("Start the project")
  .action(() => {
    startService();
  });

// 打包
program
  .command("build")
  .description("build the project")
  .action(() => {
    buildService();
  });

program
  .version(chalk.green(`${pkg.version}`))
  .option("-d, --debug", "output extra debugging")
  // 监听 --help 执行
  .on("--help", () => {

    // 打印脚手架logo
    console.log(
      "\r\n" +
      figlet.textSync("fecli", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );

    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `fecli <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

program.parse(process.argv);