# 插件Plugin

## HtmlWebpackPlugin (html解析)
1. 下载 `npm i html-webpack-plugin -D`
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
  // 输出HTML文件
  new HtmlWebpackPlugin({
    
    template: path.resolve(__dirname, '../src/index.html'),
  })
]
```

## ESLintWebpackPlugin (代码检查)
1. 下载 `npm i eslint-webpack-plugin -D`
```js
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
plugins:[
  new ESLintWebpackPlugin({
    context: path.resolve(__dirname, '../src'),
  })
]
```

## MiniCssExtractPlugin (css分离)
1. 下载 `npm i mini-css-extract-plugin -D`
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
plugins:[
  new MiniCssExtractPlugin({
    filename: 'css/main.css'
  })
]
```

## prefetchPlugin (预加载)
1. 下载 `npm install webpack-plugin-prefetch --save-dev`
```js
const PrefetchPlugin = require('webpack-plugin-prefetch')
plugins: [
  new PrefetchPlugin()
]
```
