/* 多页面   */
const pageArr = require("./pagePath.js");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');    //html-webpack-plugin插件
//输出页面
const configPlugins = [];
pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/index.html`,
    template: path.resolve(__dirname, `../src/${page}/index.ejs`),
    chunks: [page, "vendor","manifest"],   //加载chunk文件（打包后的js）	
	hash: true, // 为静态资源生成hash值
    minify: false,
    xhtml: true
  });
  configPlugins.push(htmlPlugin);
});

module.exports = configPlugins;