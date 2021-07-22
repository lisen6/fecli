const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");

const resolveCWDPath = (targetPath) => {
  return path.resolve(process.cwd(), targetPath);
};

const config = require(resolveCWDPath("./config/webpack.config"));

module.exports = function () {
  let commonConfig = {
    mode: "development",
    devtool: "source-map",
    entry: [
      // 为了支持模块热替换，注入代理客户端
      "webpack-hot-middleware/client",
      // 入口文件
      path.resolve(process.cwd(), "./entry/index.js"),
    ],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
      modules: [path.resolve(__dirname, "node_modules")],
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: require.resolve("babel-loader"),
        },
      ],
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
  if (typeof config === "function") {
    let userConfig = config(commonConfig);
    commonConfig = { ...commonConfig, ...userConfig };
  } else {
    commonConfig = { ...commonConfig, ...config };
  }

  return commonConfig;
};
