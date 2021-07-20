const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const downloadGitRepo = require("download-git-repo");
const inquirer = require("inquirer");
const { getRepoList, getTagList } = require("./http");

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args, (err) => {
      if (err) {
        throw err;
      }
    });
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail("Request failed, refetch ...");
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;

    // 创建位置
    this.targetDir = targetDir;

    this.downloadGitRepo = downloadGitRepo;
  }
  // 下载远程模板
  async download(repo, tag) {
    // 1）拼接下载地址
    const requestUrl = `https://github.com:vayne1Q/${repo}`;

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      "waiting download template", // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir),
      { clone: true }
    ); // 参数2: 创建位置
  }
  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, "waiting fetch template");
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map((item) => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });

    // 3）return 用户选择的名称
    return repo;
  }
  // 核心创建逻辑
  async create() {
    // 1）获取模板名称
    const repo = await this.getRepo();

    // 2) 下载模板到目录
    await this.download(repo);

    console.log("用户选择了，repo=" + repo);
    // 3）模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm run dev\r\n");
  }
}

module.exports = Generator;
