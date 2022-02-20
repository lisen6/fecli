const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddle = require('webpack-hot-middleware')
const webpackBaseConfig = require('./webpack.baseConfig')

const app = express()
const compiler = webpack(
  webpackBaseConfig({ dotenv: { mode: 'development', override: true } }),
)
// 给 app 注册 webpackMiddleware 中间件
app.use(
  webpackMiddleware(compiler, {
    // 建立中间件服务路径
    publicPath: '/',
    // 自定义 HTTP 头
    headers: {
      'X-Custom-Header': 'yes',
    },
    stats: {
      colors: true,
    },
    // 开启或关闭服务端渲染
    serverSideRender: false,
  }),
)

app.use(webpackHotMiddle(compiler))
// 把项目根目录作为静态资源目录，用于服务 HTML 文件
app.use(express.static('./public'))

module.exports = app
