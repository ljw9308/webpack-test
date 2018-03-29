const path = require("path");
const resolve = {
		//定义模块
		alias: {
	      'bootstrap': path.resolve(__dirname, './../src/public-resource/bootstrap/index.js')
	    }
	};

module.exports = resolve;