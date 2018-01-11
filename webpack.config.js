var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');    //html-webpack-plugin插件
var clearWebpackPlugin = require('clean-webpack-plugin');  //清理/assets 文件的插件


/* 多页面   */
const pageArr = require("./app.js");


//输出页面
const configPlugins = [];
pageArr.forEach((page) => {
  const htmlPlugin = new htmlWebpackPlugin({
    filename: `${page}/index.html`,
    template: __dirname+`/src/${page}/html.ejs`,
    chunks: [page, 'commons'],   //加载chunk文件（打包后的js）
    hash: true, // 为静态资源生成hash值
    minify: false,
    xhtml: true,
  });
  configPlugins.push(htmlPlugin);
});


//入口
const configEnter = {};
pageArr.forEach((page) => {
  let fileName = page.split("/")[1];
  configEnter[page] = __dirname + '/src/'+page+'/'+fileName+'.js';
});


const config = {
	entry: configEnter,
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
//		            	publicPath: 'assets/'  //打包文件中引用文件的路径前缀。
		            }
		          }
		         ]
		  },
		  {
	        test: /\.(woff|woff2|eot|ttf|otf)$/,
	        use: [
	          { 
	          	loader: 'file-loader',
	            options: {
	            	name: '[name].[ext]',
	            	outputPath: 'font/'
	            	// publicPath: 'assets/'
	            }
	          }	          
	        ]
	     }
		]
	},
	devServer: {
      // contentBase: '/assets/',
      historyApiFallback: true,
	    hot: true
    },
	plugins: [
        new clearWebpackPlugin(['assets']),  //清除assets文件夹
        new webpack.HotModuleReplacementPlugin(),  //开启模块热替换
        new webpack.NamedModulesPlugin()  //输出模块热更新过得文件
	],
	output: {
		filename: '[name]/index[hash].js',  //
		path: __dirname + '/assets/',  //生成文件的根目录
		publicPath: '/assets/'     //用于css/js/图片/字体等资源的路径，相对于浏览器
	}
}

//合成插件项
config.plugins = configPlugins.concat(config.plugins);


module.exports = config;
