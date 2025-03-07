# react 相关开发配置

## craco插件修改webpack配置文件
  1. 安装craco插件（npm i -D @craco/craco）
  2. 在package.json中修改scripts，将"start": "react-scripts start"，改为"start": "craco start"
  3. 在项目根目录下创建craco.config.js文件
  4. 重启项目

### 别名路径配置
```js
const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```
### devServer配置
```js
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    proxy: { // 配置代理
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
```
### plugins配置
```js
// 配置scss-loader的选项
const CracoScssDesignPlugin = require('craco-scss');
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  plugins:[
    {
      plugin: CracoScssDesignPlugin,
      options: {
        // 配置less-loader的选项
        scssLoaderOptions: {
          scssOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 修改主题色
            javascriptEnabled: true,
          },
        },
      },
    }
  ]
}
```
::: tip 其他webpack配置
其他配置参考：[craco官方文档](https://github.com/gsoft-inc/craco)

知乎专栏：[craco配置](https://zhuanlan.zhihu.com/p/16494080005)
:::

## 项目文件规范

<img src="/assets/react/8.png" alt="项目文件规范" style="margin-top:15px">

## scss配置
  1. 安装sass（npm i sass -D）



  