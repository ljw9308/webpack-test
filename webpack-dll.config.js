const webpack = require('webpack');
const path = require("path");
const ExtralTextPlugin = require('extract-text-webpack-plugin');
const rules = require("./config/configModule.js");  //规则


module.exports = {
  output: {
    path: path.resolve(__dirname, 'src/dll/'),  //dirVars.dllDir,
    filename: '[name].js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    dll: [
	  "jquery",'bootstrap'	
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: '[name].manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: path.resolve(__dirname, 'assets'),   //dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    /* 跟业务代码一样，该兼容的还是得兼容 */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ExtralTextPlugin({
  	    filename: 'styles/[name].css?[contenthash]'
    }), // 打包css/less的时候会用到ExtractTextPlugin
  ],
  module, // 沿用业务代码的module配置
  resolve:{
		//定义模块
		alias: {
	      'bootstrap': path.resolve(__dirname, './src/public-resource/bootstrap/index.js')
	    }
	}, // 沿用业务代码的resolve配置
};