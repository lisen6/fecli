const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: [
    // 为了支持模块热替换，注入代理客户端
    // "webpack-hot-middleware/client",
    path.resolve(__dirname, "../src/index.js"),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "./src/"),
    },
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
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
    // 为了支持模块热替换，生成 .hot-update.json 文件
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
};
