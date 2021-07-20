const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddle = require("webpack-hot-middleware");
const config = require("./webpack.config");

console.log(process.cwd(), 11111);

const app = express();
const compiler = webpack(config);
// 给 app 注册 webpackMiddleware 中间件
app.use(
  webpackMiddleware(compiler, {
    // webpack-dev-middleware 所有支持的配置项
    // 只有 publicPath 属性为必填，其它都是选填项

    // Webpack 输出资源绑定在 HTTP 服务器上的根目录，
    // 和 Webpack 配置中的 publicPath 含义一致
    publicPath: "/",

    // 默认的 URL 路径, 默认是 'index.html'.
    index: "index.html",

    // 自定义 HTTP 头
    headers: { "X-Custom-Header": "yes" },

    // 给特定文件后缀的文件添加 HTTP mimeTypes ，作为文件类型映射表
    mimeTypes: { "text/html": ["phtml"] },

    // 统计信息输出样式
    stats: {
      colors: true,
    },

    // 开启或关闭服务端渲染
    serverSideRender: false,
  })
);

app.use(webpackHotMiddle(compiler));
// 把项目根目录作为静态资源目录，用于服务 HTML 文件
app.use(express.static("."));

module.exports = app;
