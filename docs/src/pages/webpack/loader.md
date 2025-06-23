# Loader 各类资源处理
支持其他模块加载资源，例如图片、音频、css等。
### css处理

## `css-loader`
将css文件打包到js文件中。

## `sass-loader`
用于加载 Sass/SCSS 文件并编译成 CSS。

## `style-loader`
将 CSS 以 `<style>` 标签的形式插入到 DOM 中。这在开发环境中很方便，因为它支持热更新。

```js
module: {
  rules: [
    // CSS处理
    {
      test: /\.css$/, // 正则匹配文件类型
      use: ['style-loader', 'css-loader' ] // 处理顺序：从右往左。 必须先执行css-loader
    },
    // SCSS处理
    {
      test: /\.scss$/, // 正则匹配文件类型
      use: ['style-loader', 'css-loader', 'sass-loader' ] // 处理顺序：从右往左。 必须先执行sass-loader
    }
  ]
}
```
## `MiniCssExtractPlugin.loader` (css 分离插件)
1. ‌将 CSS 从 JavaScript 中分离出来，生成独立的 .css 文件（用于替换 style-loader（在生产配置中））
2. 生产环境中推荐使用，以优化加载性能
3. 独立的 CSS 文件可以被浏览器缓存，当资源更新时，只需更新更改的文件。
4. 浏览器可以同时下载 JavaScript 和 CSS 文件，提高加载速度。
```js
// 下载插件
// npm install --save-dev mini-css-extract-plugin
// 引入插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 配置插件
plugins:[
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
],
// 模块处理规则
module: {
  rules: [
    // CSS处理
    {
      test: /\.css$/, // 正则匹配文件类型
      use: [MiniCssExtractPlugin.loader, 'css-loader' ] // 处理顺序：从右往左。 必须先执行css-loader
    },
    // SCSS处理
    {
      test: /\.scss$/, // 正则匹配文件类型
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ] // 处理顺序：从右往左。 必须先执行sass-loader
    }
  ]
}
```
### js处理

## `babel-loader`
将es6代码转成浏览器能识别的js。
1. 下载 `npm install -D babel-loader @babel/core @babel/preset-env`
2. 配置babel
```js
test: /\.js$/, // 匹配.js文件
exclude: /node_modules/, // 排除node_modules
use: {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'], // 使用默认配置
    cacheDirectory: true // 缓存编译结果 加快编译速度
  }
}
```
## `ts-loader`
将ts文件打包到js文件中。
