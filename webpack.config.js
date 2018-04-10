const webpack = require('webpack');
const path = require("path");
const ClearWebpackPlugin = require('clean-webpack-plugin');  //清理/assets 文件的插件
const ExtralTextPlugin = require("extract-text-webpack-plugin");  //提取css文件的插件

//导入配置项
const entry = require('./config/configEnter.js');  //导入配置项入口
const devServer = require('./config/configDevSever.js');  //导入devServer
const resolve = require('./config/configResolve.js');  //导入resolve
const configPlugins = require('./config/configOutput.js');//导入配置项插件html页面
const modules = require("./config/configModule.js");  //规则
//导入配置项

//全局变量
const ISDEV = process.env.NODE_ENV === 'development' ? false : true;
//const jquery = require("jquery");
//全局变量

const config = {
	entry,
	module: modules,
	devServer,
	resolve,
	plugins:[
		//清除assets文件夹
		//new ClearWebpackPlugin(['assets']),  
		//输出模块热更新过得文件
		new webpack.NamedModulesPlugin(),  
		new webpack.HotModuleReplacementPlugin(),
		
	    //把webpack的（初始化代码 ）和 （ 公共的模块 ） 打包进来   优点：合理利用浏览器文件缓存机制
	    new webpack.optimize.CommonsChunkPlugin({
	    	name:'vendor' // 注意不要.js后缀
	       // chunks:['main','login']  默认所有的chunk或者可选的
	    }),
	    
	    //从vendor文件夹中把（初始化代码 ）抽离到manifest文件
	    new webpack.optimize.CommonsChunkPlugin({
	        name: 'manifest',
	        chunks: ['vendor']
	    }),
	    
	    //提取样式来输出文件
	    new ExtralTextPlugin({
	  	    filename: 'styles/[name].css?[contenthash]'
	    }),
	    
	    //设置全局变量----当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块。
//	    new webpack.DefinePlugin({     
//	        ISDEV,
//	        $: jquery,
//	        jquery: jquery,
//	        "window.$": jquery,
//	        "window.jquery": jquery
//	    }),
	    
	    new webpack.DllReferencePlugin({
		  context: path.resolve(__dirname, 'assets/'), // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
		  manifest: require('./dll.manifest.json'), // 指定manifest.json
		  name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
		})
	],
	output:{
		filename: '[name]/index[hash].js',  //
		path: path.resolve(__dirname, 'assets/'),  //生成文件的根目录
		publicPath: '/',     //用于css/js/图片/字体等资源的路径，相对于浏览器
		hashDigestLength:16
	},
	performance: {  //性能
	  hints: false  //不展示警告或错误提示
	},
	devtool: '#eval-source-map'
}

//合成插件项
config.plugins = [...config.plugins, ...configPlugins];

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
