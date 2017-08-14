//main.js 
var greeter = require('./green.js');
import _ from 'lodash';    //lodash 是一个前端的工具库  
import '../src/style.css';    //引入一个css样式
import Ico from './../src/dianchi.png';

//引入样式
function compoent(){
   var div = document.createElement('div');
   div.id = 'compoent';
   div.innerHTML = _.join(['hellow','webpack'], ' ');
   
// var img = new Image();
// img.classList.add('ico');
// img.src = Ico;
// div.appendChild(img);
   return div;
}

document.getElementById('root').appendChild(greeter());

document.body.appendChild(compoent())
