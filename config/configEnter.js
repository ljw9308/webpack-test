/* 多页面   */
const pageArr = require("./pagePath.js");
const path = require("path");

//入口
const configEnter = {};
pageArr.forEach((page) => {
  let fileName = page.split("/")[1];
  configEnter[page] = path.resolve( __dirname, `../src/${page}/${fileName}.js`);
});

module.exports = configEnter;