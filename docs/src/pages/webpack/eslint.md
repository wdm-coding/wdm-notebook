# webpack 配置 Eslint

## 1. 安装依赖

npm 安装 ESLint 和 webpack 插件
```bash
npm install --save-dev eslint eslint-webpack-plugin
```

## 2. 配置 webpack
```js
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new ESLintPlugin({
      // 核心配置
      context: path.resolve(__dirname, 'src'), // 检查的根目录
      extensions: ['js', 'jsx'],              // 检查的文件后缀
      exclude: ['node_modules', 'dist'],       // 排除目录
      // 缓存选项（提升性能）
      cache: true,
      cacheLocation: path.resolve(__dirname, '.eslintcache'),
      // 修复选项
      fix: true,                   // 自动修复可修复的问题
      fixTypes: ['problem', 'suggestion', 'layout'], // 可修复的错误类型
      // 输出控制
      failOnError: process.env.NODE_ENV === 'production',
      emitWarning: true,
      emitError: true,
      // 其他
      threads: true                // 使用多线程处理（提升性能）
    })
  ]
};
```