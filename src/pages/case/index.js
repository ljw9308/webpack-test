var html = require('./index.ejs');
var data = [
	{
		src: require('./../../public-resource/images/case3.jpg'),
		text: "案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例"
	},
	{
		src: require('./../../public-resource/images/case3.jpg'),
		text: "案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例"
	},
	{
		src: require('./../../public-resource/images/case3.jpg'),
		text: "案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例"
	},
	{
		src: require('./../../public-resource/images/case3.jpg'),
		text: "案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例案例"
	}
]


var $case = $("#case");
	$case.html( html({title:"案例展示",data:[[...data],[...data]]}) )

