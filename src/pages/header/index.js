
var template = require('./index.ejs');
var allPath = require('./../../../config/pagePath.js');

module.exports = function(obj){
	obj.allpath = allPath;
	return template(obj);
}

