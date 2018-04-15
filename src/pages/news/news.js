require("./../../common/common.js");
import '../../public-resource/css/commons.css';      //引入一个css样式
import '../../public-resource/css/login.css';      //引入一个css样式
import '../../public-resource/css/mains.scss';      //引入一个css样式


//异步加载模块
const utilC = () => require.ensure(['./../template/new/index.ejs'], function(require) {
	var aa = require('./../template/new/index.ejs')
	$(".tab-content .active").html(aa)
});

$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show');
  utilC();
})

$('#myTabs a:eq(0)').click();
