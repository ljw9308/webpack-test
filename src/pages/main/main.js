//main.js 
require("./../../common/common.js")
import _ from 'lodash';    //lodash 是一个前端的工具库  
import '../../public-resource/css/commons.css';      //引入一个css样式
import '../../public-resource/css/main.css';    //引入一个css样式
import '../../public-resource/css/mains.scss';//引入样式  

//案例展示 
require('./../template/case/index.js');


if (module.hot) {
  module.hot.accept()
}


