# webpack 多页面学习

## 1.多页面entry配置
configEnter.js 入口文件
```javascript
    /* 多页面   */
const pageArr = require("./pagePath.js");
const path = require("path");

//入口
const configEnter = {};
pageArr.forEach((page) => {
    let pagePath = page.path;
    let fileName = pagePath.split("/")[1];
    configEnter[pagePath] = path.resolve( __dirname, `../src/${pagePath}/${fileName}.js`);
});
module.exports = configEnter;
```
pagePath.js 文件
```javascript
const pageArr = [
	{path:'pages/main',title:"首页"},
	{path:'pages/news',title:"资讯"},
	{path:'pages/about',title:"关于我们"}
]
module.exports = pageArr;
```

这里的`entry`配置项最终会生成如下对象。配置多个入口时，每个入口会生成一个 `Chunk`。
如果 `entry` 是一个 `object`，就可能会出现`多个 Chunk`，这时` Chunk` 的名称是 `object` 键值对里键的名称
```javascript
{
  pages/main: 'src/pages/main/main.js', 
  pages/news: 'src/pages/main/news.js', 
  pages/about: 'src/pages/main/about.js' 
}
```

## 2.借助html-webpack-plugin插件生成HTML


```javascript
  /* 多页面   */
const pageArr = require("./pagePath.js");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');    //html-webpack-plugin插件
//输出页面
const configPlugins = [];
pageArr.forEach((page) => {
    let pagePath = page.path;
    const htmlPlugin = new HtmlWebpackPlugin({
  	    title: "罗僧伯格",
        filename: `${pagePath}/index.html`,
        template: path.resolve(__dirname, `../src/${pagePath}/index.ejs`),
        chunks: [pagePath, "vendor","manifest"],   //加载chunk文件（打包后的js）	
        hash: true, // 为静态资源生成hash值
        minify: false,
        xhtml: true,
        ISDEV: process.env.NODE_ENV, //判断开发环境
     });
  configPlugins.push(htmlPlugin);
});

module.exports = configPlugins;
``` 
通过循环遍历为entry项的每一个入口文件，生成一个HHML文件。 最终把`configPlugins`这个数组放入`webpack.config.js`的`plugins`项中。

## 3.项目如何导入jquery？  
参考webpack官网链接 [expose-loader](https://www.webpackjs.com/loaders/expose-loader/)
```javascript
{  
  test: require.resolve('jquery'),
  use: [{
            loader: 'expose-loader',
            options: 'jQuery'
          },{
            loader: 'expose-loader',
            options: '$'
          }
        ]		
}
```
## 4.利用CommonsChunkPlugin插件提取公共代码。
```javascript
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
```

## DllPlugin 插件的使用。

用过 Windows 系统的人应该会经常看到以 .dll 为后缀的文件，这些文件称为 `动态链接库`。
webpack 接入动态链接库的思想。

* 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
* 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
* 页面依赖的所有动态链接库需要被加载。

比如项目中使用的jquery，bootstrap等第三方类库，完全不需要每次都构建一遍。
使用DllPlugin 插件只有在自己需要的时候才去构建生成，极大的提升webpack的构建速度。
将这些第三方类库从项目中拆分开来，形成单独的文件，能够很好的利用浏览器的缓存机制。

步骤:
* 1.创建一个`webpack-dll.config.js`文件.  
* 2.运行 `webpack --progress --colors --config ./webpack-dll.config.js` 命令, 生成dll.manifest.json文件和src目录下的dll文件夹。
* 3.在webpack的`plugins`配置项中设置DllReferencePlugin插件，随后在main.ejs页面中手动引入dll文件的js和css文件。
* 4.启动devServer服务。
```javascript
new webpack.DllReferencePlugin({
  context: path.resolve(__dirname, 'assets/'), // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
  manifest: require('./dll.manifest.json'), // 指定manifest.json
  name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
})
```

`webpack-dll.config.js`文件
```javascript
var config = {
  output: {
    path: path.resolve(__dirname, 'src/dll/'),  
    filename: '[name].js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*  指定需要打包的js模块或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader  */
    dll: [ "jquery",'bootstrap'	],
  },
  plugins: [
  
    new webpack.DllPlugin({
      path: '[name].manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: path.resolve(__dirname, 'assets'),   //dirVars.staticRootDir, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    // 打包css/less的时候会用到ExtractTextPlugin
    new ExtralTextPlugin({
  	    filename: 'css/[name].css?[contenthash]'
    }), 
  ],
  module: modules, // 沿用业务代码的module配置
  resolve // 沿用业务代码的resolve配置
};
```

###  参考资料 [webpack 多应用架构系列](https://segmentfault.com/a/1190000006843916)
###  学习资料 [深入浅出 Webpack](http://webpack.wuhaolin.cn/) 

