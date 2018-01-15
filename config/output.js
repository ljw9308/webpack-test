const path = require("path");
module.exports = {
		filename: '[name]/index[hash].js',  //
		path: path.resolve(__dirname, 'assets/'),  //生成文件的根目录
		publicPath: '/assets/',     //用于css/js/图片/字体等资源的路径，相对于浏览器
		hashDigestLength:16
	}