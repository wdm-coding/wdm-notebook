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

## postcss-loader + autoprefixer (自动补全css前缀，兼容浏览器样式)
1. 自动添加前缀，兼容浏览器样式
2. 移除过时前缀 - 会清理不再需要的老旧前缀
3. 精准适配 - 通过配置 browserslist 指定需要支持的浏览器范围
4. 下载 `npm install --save-dev postcss-loader autoprefixer`
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    grid: true,// 启用 grid 支持
                    overrideBrowserslist: ['> 1%', 'last 2 versions']// 指定要支持的浏览器范围
                  })
                ]
              }
            }
          }
        ]
      },
      // 对于 Sass 文件
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    grid: true, // 启用 grid 支持
                    overrideBrowserslist: ['> 1%', 'last 2 versions'] // 指定要支持的浏览器范围
                  })
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
}
```