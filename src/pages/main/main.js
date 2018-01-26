//main.js 
var greeter = require('./green.js');
import _ from 'lodash';    //lodash 是一个前端的工具库  
import '../../public-resource/css/commons.css';      //引入一个css样式
import '../../public-resource/css/main.css';    //引入一个css样式
import Ico from './../../public-resource/images/dianchi.png';

//引入样式  
function compoent(){      
   var div = document.createElement('div');
   div.id = 'compoent';
   div.innerHTML = _.join(['hellow','webpack000'], ' ');
   
   var img = new Image();
   img.classList.add('ico');         
   img.src = Ico;
   div.appendChild(img);
   return div;
};

var root = document.getElementById('root');
root.innerHTML = "";       
root.appendChild(greeter());

root.appendChild(compoent())    
     
if (module.hot) {
  module.hot.accept()
}
