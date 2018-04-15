/* 多页面   */
const pageArr = require("./pagePath.js");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');    //html-webpack-plugin插件
//输出页面
const configPlugins = [];
pageArr.forEach((page) => {
	let pagePath = page.path;
  const htmlPlugin = new HtmlWebpackPlugin({
  	title: "罗僧伯格",
    filename: `${pagePath}/index.html`,
    template: path.resolve(__dirname, `../src/${pagePath}/index.ejs`),
    chunks: [pagePath, "vendor","manifest"],   //加载chunk文件（打包后的js）	
	hash: true, // 为静态资源生成hash值
    minify: false,
    xhtml: true,
    ISDEV: process.env.NODE_ENV, //判断开发环境
  });
  configPlugins.push(htmlPlugin);
});

module.exports = configPlugins;