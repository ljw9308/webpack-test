/* 多页面   */
const pageArr = require("./pagePath.js");
const path = require("path");

//入口
const configEnter = {};
pageArr.forEach((page) => {
	let pagePath = page.path;
  let fileName = pagePath.split("/")[1];
  configEnter[pagePath] = path.resolve( __dirname, `../src/${pagePath}/${fileName}.js`);
});

module.exports = configEnter;