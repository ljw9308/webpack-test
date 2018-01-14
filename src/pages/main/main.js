//main.js 
var greeter = require('./green.js');
import _ from 'lodash';    //lodash 是一个前端的工具库  
import '../../public-resource/css/index.css';    //引入一个css样式
import Ico from './../../public-resource/images/dianchi.png';
require("./html.ejs");
//引入样式  
function compoent(){      
   var div = document.createElement('div');
   div.id = 'compoent';
   div.innerHTML = _.join(['h00ow','webpack'], ' ');
   
   var img = new Image();
   img.classList.add('ico');         
   img.src = Ico;
   div.appendChild(img);
   return div;
}
        
document.getElementById('root').appendChild(greeter());

document.body.appendChild(compoent())    
     
if (module.hot) {
  module.hot.accept()
}
