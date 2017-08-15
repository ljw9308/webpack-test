var webpack = require('webpack');

const config = {
	entry:  {
		app: __dirname + '/src/main.js'
        /*vendors: __dirname + '/app/vendors.js'*/
	},
	module: {
		rules:[
		  {
		    test: /\.css$/,
		    use: [
		       'style-loader',
		       'css-loader'
		    ]
		  },
		  {
		  	test: /\.(png|jpg|gif)$/,
		  	use: [
		          {
		            loader: 'url-loader',
		            options:{
		            	limit: '1024',    //limit 限制最小的图片的大小如果小于limit的话用base64显示		            	
		            	name: '[name].[ext]',  //name 输出的文件名规则 [path]输出文件的相对路径与当前文件的相对路径相同
		            	//[name].[ext] 输出文件的名字和拓展名与当前相同.
		            	outputPath: 'images/', //outputPath 输出文件的路径前缀
		            	publicPath: 'assets/'  //打包文件中引用文件的路径前缀。
		            }
		          }
		         ]
		  }
		  
		  /*,{
	        test: /\.(png|svg|jpg|gif)$/,
	        use: [
	          { 
	          	loader: 'file-loader',
	            options: {
	            	name: '/[name].min.[ext]',
	            	outputPath: 'img'
	            }
	          }	          
	        ]
	      }*/
		]
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/assets',
		publicPath: __dirname + '/assets/'
	}
}

module.exports = config;
