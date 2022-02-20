const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const { resolveCWDPath, isExistFile, injectEnvVariable } = require('../utils')

// 加载用户的 webpack 配置
let userConfig = {}
let targetPath = isExistFile(resolveCWDPath('./config/webpack.config.js'))
if (targetPath) {
  userConfig = require(resolveCWDPath('./config/webpack.config.js'))
}

console.log(resolveCWDPath('./entry/index.js'))
module.exports = function (options) {
  let webpackBaseConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
      // 为了支持模块热替换，注入代理客户端
      'webpack-hot-middleware/client',
      // 入口文件
      resolveCWDPath('./entry/index.js'),
    ],
    output: {
      path: resolveCWDPath('dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
            ],
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolveCWDPath('./config/template.html'),
        filename: 'index.html',
      }),
      new HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
    ],
  }

  // 注入 process.env 环境变量
  injectEnvVariable(options.dotenv)

  // 合并用户的 webpack.config 配置
  let mergedConfig = {
    ...(typeof userConfig === 'function'
      ? userConfig(webpackBaseConfig)
      : userConfig),
    ...webpackBaseConfig,
  }

  return mergedConfig
}
