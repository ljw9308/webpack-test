//main.js 
require("./../../common/common.js")
import _ from 'lodash';    //lodash 是一个前端的工具库  
import '../../public-resource/css/commons.css';      //引入一个css样式
import '../../public-resource/css/main.css';    //引入一个css样式
import '../../public-resource/css/mains.scss';//引入样式  

//案例展示 
require('../case/index.js');



//异步加载模块
const utilC = () => require.ensure(['./aa.ejs'], function(require) {
var aa = require('./aa.ejs')
	aaDom.innerHTML = aa({text:"我是异步加载的模块"});
});

var aaDom = document.getElementById("aaDom");
aaDom.onclick = function(){
	utilC();
}

if (module.hot) {
  module.hot.accept()
}


