# react 相关开发配置

## 别名路径配置
  1. 在webpack.config.js中配置alias别名路径（craco）
  2. 安装craco插件（npm i -D @craco/craco）
  3. 在项目根目录下创建craco.config.js文件，配置别名路径
    ```js
    const path = require('path')
    module.exports = {
      webpack: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
    }
    ```
  4. 在package.json中修改scripts，将"start": "react-scripts start"，改为"start": "craco start"
  5. 重启项目，即可使用别名路径

::: tip 其他webpack配置
```js
const CracoLessDesignPlugin = require('craco-less');
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    proxy: { // 配置代理
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins:[
    {
      plugin: CracoLessDesignPlugin,
      options: {
        // 配置less-loader的选项
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 修改主题色
            javascriptEnabled: true,
          },
        },
      },
    }
  ]
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

其他配置参考：[craco官方文档](https://github.com/gsoft-inc/craco)

知乎专栏：[craco配置](https://zhuanlan.zhihu.com/p/16494080005)
:::







  