# optimization (优化配置)

## cssMinimizerPlugin (css压缩)
1. 下载 `npm install css-minimizer-webpack-plugin --save-dev`
```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
optimization: {
  minimizer: [
    new CssMinimizerPlugin()
  ]
}
```
## terserPlguin (js压缩)
1. 下载 `npm install terser-webpack-plugin --save-dev`
```js
const TerserPlugin = require('terser-webpack-plugin')
optimization: {
  minimizer: [
    new TerserPlugin()
  ]
}
```

## 代码分割
1. 不是所有的内容需要首屏加载
2. 按需加载节省资源，提升首屏速度。

### 1. 多入口
1. 明确分离业务代码和第三方库。
2. 适合传统多页面应用。
3. 便于长期缓存第三方库
```js
entry:{
  main:{
    import:'/src/main.js',
    filename:'main.js',
    dependOn:'lodash' // 当前入口所依赖的入口。它们必须在该入口被加载前被加载 loadsh。
  },
  lodash:'lodash'
}
```
### 2. 动态导入
```js
import('lodash').then(({ default: _ }) => {
  const result = _.join(['a', 'b'], '-')
  console.log(result) // a-b
})
```

### 3. spiltChunksPlguin
1. chunks: 默认是 async(只拆分动态导入的模块)，可选值为 all(所有模块都参与拆分)、initial(只拆分同步加载的模块)。
2. minSize: 生成 chunk 的最小体积，默认为 20000 bytes。
3. minChunks: 拆分前必须共享模块的最小块数，默认为 1。
4. maxAsyncRequests: 按需加载时并行请求的最大数量，默认为 30。
```js
optimization: {
  splitChunks: {
    chunks: 'all', // 默认是 async(只拆分动态导入的模块)，可选值为 all(所有模块都参与拆分)、initial(只拆分同步加载的模块)。
    minSize: 20000, // 生成 chunk 的最小体积，默认为 20000 bytes。
    minChunks: 1, // 拆分前必须共享模块的最小块数，默认为 1。
    maxAsyncRequests: 30, // 按需加载时并行请求的最大
  }
}
```

# 将资源内联到html中
1. 减少http请求次数
2. 复用资源
3. 便于缓存

## 内联 JavaScript 的方法
1. html片段：使用 raw-loader、 asset/source
```js
// raw-loader
{
  test: /inline\/.*\.html/,
  // type: 'asset/source'
  use:{
    loader: 'raw-loader',
    options: {
      esModule: false,
    }
  }
}
// asset/source
{
  test: /inline\/.*\.html/,
  type: 'asset/source',
  generator: {
    encoding: 'utf8'
  },
}
// 2. index.html
// <%= require('raw-loader!./inline/meta.html').default %>
```
## 图片内联
1. 使用 url-loader (Webpack 4 推荐) 
下载：npm install --save-dev url-loader
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8KB的文件转为Data URL
              name: '[name].[hash:8].[ext]',
              fallback: 'file-loader' // 超过limit的图片使用file-loader处理
            }
          }
        ]
      }
    ]
  }
};
```
2. 使用 Webpack 5 的 asset/inline
```js
module.exports = {
  module: {
    rules: [
      {
				test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 小于8kb的图片会被转成base64编码，否则会生成单独的文件
          }
        },
			}
    ]
  }
};
```