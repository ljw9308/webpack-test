const webpack = require('webpack');
const ClearWebpackPlugin = require('clean-webpack-plugin');  //清理/assets 文件的插件
const ExtralTextPlugin = require("extract-text-webpack-plugin");  //提取css文件的插件
const plugins = [
	new ClearWebpackPlugin(['assets']),  //清除assets文件夹
    new webpack.HotModuleReplacementPlugin(),  //开启模块热替换
    new webpack.NamedModulesPlugin(),  //输出模块热更新过得文件
    new webpack.optimize.CommonsChunkPlugin({
    	 name:'commons' // 注意不要.js后缀
       // chunks:['main','login']  默认所有的chunk或者可选的
    }),
    new ExtralTextPlugin({
  	    filename: 'styles/[name].css?[contenthash]'
    })
];

module.exports = plugins;