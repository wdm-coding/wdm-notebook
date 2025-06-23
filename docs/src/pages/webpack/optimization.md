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