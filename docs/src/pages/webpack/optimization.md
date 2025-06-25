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

## tree-shaking 
Tree-shaking（摇树优化）是一种用于消除JavaScript中未使用代码的优化技术。它通过静态分析代码来确定哪些模块、函数或变量没有被实际使用，并将其从最终的打包文件中移除，从而减少最终包的大小并提高性能。
1. 使用ES6模块语法（import/export）‌：Tree-shaking依赖于ES6模块的静态结构特性，因此你的代码必须使用ES6模块语法，而不是CommonJS（require）等。
2. ‌设置mode为production‌：Webpack在生产模式（production）下会自动启用Tree-shaking相关的优化。
3. 配置optimization.usedExports‌：显式地告诉Webpack去确定每个模块使用的导出，然后将其标记为未使用的导出将被移除。
4. 配置optimization.sideEffects‌：通过package.json的"sideEffects"属性标识项目中的文件是否有副作用，从而让Webpack安全地删除未被导入且标记为无副作用的模块。
```js
module.exports = {
  // ... 其他配置
  mode: 'production', // 生产模式会自动启用tree shaking和代码压缩
  optimization: {
    usedExports: true, // 标记未使用的导出
    minimize: true,    // 压缩代码，移除未使用的导出
  },
};
// package.json
{
  "name": "your-project",
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/some-side-effectful-file.js"
  ]
}
```

## 自动清理dist目录
1. 使用 clean-webpack-plugin 插件自动清理dist目录。
```js
// npm install --save-dev clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
plugins: [
  new CleanWebpackPlugin()
  // 或者
]
```
2. 配置output.clean为true
```js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 在每次构建前清理output目录
    // 也可以使用对象配置
    // clean: {
    //   keep: /ignored\/dir\//, // 保留某些文件
    // }
  }
};
```
3. package.json 使用 rimraf
```json
{
  "scripts": {
    "build": "rimraf dist && webpack --config webpack.config.js"
  }
}
```

## 构建时去除调试日志
1. Webpack 4+ 默认使用 TerserPlugin 进行代码压缩，可以配置去除 console
```js
// 下载 npm install --save-dev terser-webpack-plugin
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除所有console
            // 或者指定要移除的console类型
            // drop_console: ['log', 'info', 'warn', 'error'] 
          },
        },
      }),
    ],
  },
}
```
2. 使用 babel-plugin-transform-remove-console 通过 Babel 插件在编译阶段移除
```js
// 下载 npm install babel-plugin-transform-remove-console --save-dev
// .babelrc 或 babel.config.js
{
  "plugins": [
    ["transform-remove-console", { 
      "exclude": ["error", "warn"] // 保留error和warn
    }]
  ]
}
```