// lib/http.js

// 通过 axios 处理请求
const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return axios.get(
    "https://api.github.com/users/vayne1Q/repos?access_token=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"
  );
}

module.exports = {
  getRepoList,
};