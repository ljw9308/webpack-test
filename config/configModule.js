const path = require("path");
const ExtralTextPlugin = require("extract-text-webpack-plugin") //提取css文件的插件

const rules  = [
			   {
					test: /\.css$/,
					exclude: /node_modules/,  
					use: ExtralTextPlugin.extract({ //提取样式文件
						fallback: "style-loader",
						use: "css-loader"
					})
				},
				{
	            	test: /\.scss$/,
	            	exclude: /node_modules/, 
		            use: ExtralTextPlugin.extract({
	                	use:[{
	                    		loader: "css-loader"
			                }, 
			                {
			                    loader: "sass-loader"
			                }],
		                // 在开发环境使用 style-loader
		                fallback: "style-loader"
	            	})
        		},
				{
					test: /\.(png|jpg|gif)$/,
					exclude: /node_modules/, 
					use: [{
						loader: "url-loader",
						options: {
							limit: '1024', //limit 限制最小的图片的大小如果小于limit的话用base64显示		            	
							name: '[name].[ext]', //name 输出的文件名规则 [path]输出文件的相对路径与当前文件的相对路径相同
							//[name].[ext] 输出文件的名字和拓展名与当前相同.
							outputPath: 'images/', //outputPath 输出文件的路径前缀
							//		            	publicPath: 'assets/'  //打包文件中引用文件的路径前缀。
						}
					}]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
					exclude: /node_modules/, 
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}]
				},
				{
					test: /\.ejs$/,
					exclude: /node_modules/, 
					use: [{
						loader: 'ejs-loader'
					}]
				},
				{
					test: /\.js$/,
					exclude: /node_modules/, 
					use: [{
						loader: 'babel-loader',
						query: {
	                    	presets: ['latest'] //按照最新的ES6语法规则去转换
	                	}
					}],
				},
				{  
					test: require.resolve('jquery'),
					use: [{
			              loader: 'expose-loader',
			              options: 'jQuery'
			          	},{
			              loader: 'expose-loader',
			              options: '$'
			          	}]		
			    }
];


/*
 require.resolve('jquery')
        指定js模块export的变量声明为全局变量
 */
module.exports = {
	rules:rules
};