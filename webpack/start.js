const path = require("path");
const app = require("./index");

const startService = () => {
  const resolveCWDPath = (targetPath) => {
    return path.resolve(process.cwd(), targetPath);
  };

  // 读取用户资源及端口等信息
  const { DEV_SERVER_PORT } = require(resolveCWDPath("./fecli.json"));

  // 启动 HTTP 服务器，服务器监听在 3000 端口
  app.listen(DEV_SERVER_PORT, () => {
    console.log(`Server listening at http://0.0.0.0:${DEV_SERVER_PORT}`);
  });
};

module.exports = {
  startService,
};
