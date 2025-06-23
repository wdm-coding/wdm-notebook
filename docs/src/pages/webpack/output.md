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
    filename: '[name].[contenthash].js',// 打包后的文件名，使用contenthash防止缓存问题
    path: path.resolve(__dirname, '../dev-dist'), // 打包后的目录
    clean: true, // 打包前清理/dist文件夹
    publicPath:'/', // 打包后文件的访问路径
    chunkFilename:'chunk.[contenthash].js', // 异步引入的js文件命名规则
    // library: { // 打包后的库配置
    //   name:'wdm',
    //   type: 'umd' // 打包后的库暴露方式
    // }
  },
}
```
3. publicPath：所有的资源都会引用 publicPath 下的路径作为前缀。(一般配合服务器配置使用)
4. library：导出库的名字。




