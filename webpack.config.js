const webpack = require('webpack');
const path = require("path");
const ClearWebpackPlugin = require('clean-webpack-plugin');  //清理/assets 文件的插件
const ExtralTextPlugin = require("extract-text-webpack-plugin");  //提取css文件的插件


//导入配置项
const entry = require('./config/configEnter.js');  //导入配置项线入口
const configPlugins = require('./config/configOutput.js');//导入配置项插件html页面s
const rules = require("./config/rules.js");  //规则
//导入配置项


const config = {
	entry,
	module: { rules },
	devServer:{
		contentBase: '/assets/',
        historyApiFallback: true,
	    hot: true,
	    inline:true
	},
	plugins:[
		new ClearWebpackPlugin(['assets']),  //清除assets文件夹
		new webpack.NamedModulesPlugin(),  //输出模块热更新过得文件
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.optimize.CommonsChunkPlugin({
	    	name:'vendor' // 注意不要.js后缀
	       // chunks:['main','login']  默认所有的chunk或者可选的
	       //会把webpack的初始化代码和公共的模块打包进来
	    }),
	//  //在commons文件中把初始化代码抽离到manifest文件
	    new webpack.optimize.CommonsChunkPlugin({
	        name: 'manifest',
	        chunks: ['vendor']
	    }),
	    new ExtralTextPlugin({
	  	    filename: 'styles/[name].css?[contenthash]'
	    })
	],
	output:{
		filename: '[name]/index[hash].js',  //
		path: path.resolve(__dirname, '../assets/'),  //生成文件的根目录
		publicPath: '/assets/',     //用于css/js/图片/字体等资源的路径，相对于浏览器
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
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({     //自动加载模块
      'process.env': {
        NODE_ENV: "production"
      }
    }),
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
