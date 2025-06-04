# 输出(Output)
告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。

1. path：输出目录的绝对路径。
2. filename：入口 chunk 的名称。
```js
module.exports = {
  entry: {
    main:{
      import:'/src/main.js',
      dependOn:'lodash'
    },
    lodash:'lodash',
  }
  output: {
    filename: '[name].[contenthash].js', // name 对应 entry 的 key
  }
}
```
3. publicPath：所有的资源都会引用 publicPath 下的路径作为前缀。(一般配合服务器配置使用)
4. library：导出库的名字。




