# 打包配置

## 多页面应用打包
1. 手动配置多个入口文件，并分别打包

```js
entry: {
  appA: {
    import: "/src/appA/main.js", //
    filename: "appA.js", // 输出文件名
    dependOn: "lodash", // 当前入口所依赖的入口。它们必须在该入口被加载前被加载 loadsh。
  },
  lodash: "lodash",
  appB:{
    import: "/src/appB/main.js",
    filename: "appB.js",
  }
},
// 插件配置
plugins: [
  // 输出HTML文件
  new HtmlWebpackPlugin({
    filename: "appA.html",
    template: path.resolve(__dirname, "../src/appA/index.html"),
    chunks: ["appA", "lodash"], // 输出的html文件中包含的入口文件
    templateParameters: {
      title: "webpack打包测试",
    },
  }),
  new HtmlWebpackPlugin({
    filename: "appB.html",
    chunks: ["appB"],// 输出的html文件中包含的入口文件
    template: path.resolve(__dirname, "../src/appB/index.html"),
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css", // 入口chunk的css文件命名
    chunkFilename: "[id].[contenthash].css", // 非入口chunk的css文件命名(异步引入的css文件命名)
  }),
]
```
2. 动态生成入口文件
下载glob包，动态生成入口文件 npm install glob --save-dev
```js
const glob = require("glob");
const path = require("path");
