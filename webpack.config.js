const webpack = require('webpack');
const path = require("path");

const entry = require('./config/configEnter');  //导入配置项线入口
const configPlugins = require('./config/configOutput');//导入配置项插件html页面
const rules = require("./config/rules");  //导入配置项加载器
const devServer = require("./config/devServer");  //导入配置项开发中 Serve
const plugins = require("./config/plugins");  //导入配置项插件集合
const output = require("./config/output");  //导入配置项输出项


const config = {
	entry,
	module: { rules },
	devServer,
	plugins,
	output,
	performance: {  //性能
	  hints: false  //不展示警告或错误提示
	},
	devtool: '#eval-source-map'
}

//合成插件项
config.plugins = configPlugins.concat(config.plugins);

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
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
