# 公共资源提取外链引入
减少打包体积，但不减少打包速度。
使用cdn引入外部资源，但不打包。

## 1. 使用externals配置外部依赖
```js
// 简单字符串配置
module.exports = {
  externals: {
    jquery: 'jQuery',
    lodash: '_'
  }
}
// 对象形式配置
module.exports ={
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  }
}
// 使用外链

// 2. 使用html-webpack-externals-plugin插件
```
## 2. 直接在html中引入
```js
externals: {
  myVue: "Vue",
},
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
import Vue from 'myVue';
console.log(Vue)
```
## 3. 使用HtmlWebpackExternalsPlugin插件
1. 下载 npm install html-webpack-externals-plugin --save-dev
2. 配置
```js
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM'
        }
      ]
    })
  ]
};
```