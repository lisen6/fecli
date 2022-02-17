const path = require("path");
const fs = require('fs')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");

const resolveCWDPath = (targetPath) => {
  return path.resolve(process.cwd(), targetPath);
};


function isExistFile(path) {
  return fs.existsSync(path)
}
let config = {}
let targetPath = isExistFile(resolveCWDPath("./config/webpack.config.js"))
if (targetPath) {
  config = require(resolveCWDPath("./config/webpack.config.js"))
}

module.exports = function () {
  let commonConfig = {
    mode: "development",
    devtool: "source-map",
    entry: [
      // 为了支持模块热替换，注入代理客户端
      // "webpack-hot-middleware/client",
      // 入口文件
      path.resolve(process.cwd(), "./entry/index.js"),
    ],
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
      modules: [path.resolve(__dirname, "node_modules")],
    },
    module: {
      rules: [{
        test: /\.(js)$/,
        loader: require.resolve("babel-loader"),
      }, ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolveCWDPath("./config/template.html"),
        filename: "index.html",
      }),
      // 为了支持模块热替换，生成 .hot-update.json 文件
      new HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
    ],
  };

  // 合并用户的webpack.config配置
  let mergedConfig = {
    ...(typeof config === "function" ? config(commonConfig) : config),
    ...commonConfig,

  };

  return mergedConfig;
};