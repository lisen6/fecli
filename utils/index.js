const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const dotenv = require('dotenv')
const os = require('os')

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

function removeTemplate(path) {}

// 注入.env文件环境变量
function injectEnvVariable() {
  const mode = process.env.NODE_ENV || 'development'
  const envConfigPath = resolveCWDPath(`.env.${mode}`)
  dotenv.config({ path: envConfigPath }).parsed
}

// 获取本机ip
function getIPAddress() {
  /**os.networkInterfaces() 返回一个对象，该对象包含已分配了网络地址的网络接口 */
  const interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

module.exports = {
  resolveCWDPath,
  isExistFile,
  injectEnvVariable,
  copyTemplate,
  removeTemplate,
  getIPAddress,
}
