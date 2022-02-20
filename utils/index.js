const path = require('path')
const fs = require('fs')
const DotenvModule = require('./dotenv')
const Metalsmith = require('metalsmith')
const chalk = require('chalk')
const file = require('fs-extra/lib/ensure/file')
const metalsmith = Metalsmith(
  path.join(__dirname, '..', 'template', 'react-template'),
)
/**
 * 获取执行命令的目标路径
 * @param {*} targetPath 目标路径
 * @returns
 */
const resolveCWDPath = (targetPath) => {
  return path.resolve(process.cwd(), targetPath)
}

/**
 * 判断当前文件是否存在
 * @param {*} path 目标文件的url
 * @returns
 */
function isExistFile(path) {
  return fs.existsSync(path)
}

var exists = function (src, dst, callback) {
  fs.exists(dst, function (exists) {
    // 已存在
    if (exists) {
      callback(src, dst)
    }
    // 不存在
    else {
      fs.mkdir(dst, function () {
        callback(src, dst)
      })
    }
  })
}

const copyTemplate = (sourcePath, targetPath) => {}

function removeTemplate(path) {
  const STATUS = fs.statSync(path)
  if (STATUS.isFile()) {
    fs.unlinkSync(path)
    //如果原路径是目录
  } else if (STATUS.isDirectory()) {
    fs.readdirSync(path).forEach((item) => {
      remove(`${path}/${item}`)
    })
    fs.rmdirSync(path)
  }
}

module.exports = {
  resolveCWDPath,
  isExistFile,
  injectEnvVariable: DotenvModule.config,
  copyTemplate,
  removeTemplate,
}
