# [Webpacks](https://webpack.docschina.org/)

## 使用webpaack打包一个前端ji基础原生项目

1. 建立项目文件夹，在里面初始化npm环境
```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
```
2. 安装webpack及其相关依赖
```bash
# webpack是核心，webpack-cli是命令行工具，用于在命令行中运行 webpack
npm install webpack webpack-cli --save-dev
```
3. 项目根目录创建public文件
4. 项目根目录创建src文件夹，在里面创建main.js文件，assets文件夹，styles文件夹
5. 项目根目录创建index.html文件
6. `webpack-config` 文件夹存放webpack配置文件
7. 下载webpack插件
```bash
# 安装css-loader和style-loader，用于加载CSS文件
# 安装html-webpack-plugin，用于生成HTML文件
npm install css-loader style-loader html-webpack-plugin --save-dev
```
8. 启动本地开发服务器 安装webpack-dev-server
```bash
npm install -D webpack-dev-server
```
9. 配置`package.json`运行脚本
```json
"scripts": {
  "dev": "webpack serve --config ./webpack-config/config-base/webpack.config.js",
  "build:dev": "webpack --config ./webpack-config/config-base/webpack.dev.js",
  "build:prod": "webpack --config ./webpack-config/config-base/webpack.prod.js"
}
```

## 配置webpack

### 拆分配置与合并 通过`webpack-merge`插件合并common,dev,prod配置文件
```js
const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
// webpack.common.js
module.exports = {
  // 公共配置
}
// webpack.dev.js
module.exports = merge(webpackCommonConf,{
  // 开发环境配置
});
// webpack.prod.js
module.exports = merge(webpackCommonConf,{
  // 生产环境配置
});
```
### 1.上下文配置
```js
context: path.resolve(__dirname, '../'), // 默认是当前目录，这里改成项目根目录
```
### 2.入口配置
```js
entry: {
  entry: './src/main.js', // 默认 src/index.js
}
```
### 3.输出配置
```js
output: {
  path: path.resolve(__dirname, '../public'), // 打包后的文件存放的地方
  filename: 'bundle.[contenthash].js', // 打包后的文件名(hash是打包后生成的唯一标识，contenthash是根据文件内容生成的hash值)
},
```

2. 
## 一、基础核心
核心概念

入口(Entry)

输出(Output)

Loaders机制

插件(Plugins)

模式(Mode)

配置体系

webpack.config.js结构

多环境配置

配置合并策略

二、关键能力

模块处理

JavaScript模块化

CSS/SCSS处理

图片/字体资源

第三方库集成

优化体系

代码分割(Code Splitting)

Tree Shaking

缓存策略

构建速度优化

三、进阶技能

自定义开发

编写Loader

开发Plugin

AST应用

生态集成

Babel联动

TypeScript支持

框架适配(React/Vue)

四、工程实践

DevServer

HMR热更新

Proxy配置

本地Mock方案

分析工具

Stats分析

Bundle Analyzer

性能监控