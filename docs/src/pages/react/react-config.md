# react 相关开发配置

## craco插件修改webpack配置文件
  1. 安装craco插件（npm i -D @craco/craco）
  2. 在package.json中修改scripts，将"start": "react-scripts start"，改为"start": "craco start"
  3. 在项目根目录下创建craco.config.js文件
  4. 重启项目

### 别名路径配置
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
### devServer配置
```js
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    proxy: { // 配置代理
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
```
### plugins配置
```js
// 配置scss-loader的选项
const CracoScssDesignPlugin = require('craco-scss');
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  plugins:[
    {
      plugin: CracoScssDesignPlugin,
      options: {
        // 配置less-loader的选项
        scssLoaderOptions: {
          scssOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 修改主题色
            javascriptEnabled: true,
          },
        },
      },
    }
  ]
}
```
::: tip 其他webpack配置
其他配置参考：[craco官方文档](https://github.com/gsoft-inc/craco)

知乎专栏：[craco配置](https://zhuanlan.zhihu.com/p/16494080005)
:::

## 项目文件规范

<img src="/assets/react/8.png" alt="项目文件规范" style="margin-top:15px">

## scss配置
  安装sass（npm i sass -D）
  在craco.config.js中配置scss-loader的选项
  ```js
  const CracoScssDesignPlugin = require('craco-scss');
  module.exports = {
    reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
    plugins:[
      {
        plugin: CracoScssDesignPlugin,
        options: {
          // 配置less-loader的选项
          scssLoaderOptions: {
            scssOptions: {
              modifyVars: { '@primary-color': '#1DA57A' }, // 修改主题色
              javascriptEnabled: true,
            },
          },
        },
      }
    ]
  }

  ```

## 项目打包 与 打包优化
    npm run build
### 本地预览
  1. 打包项目 npm run build
  2. 安装serve（npm i -g serve）
  3. 启动服务（serve -s build

### 打包优化-路由懒加载
  1. React.lazy引入懒加载组件
  2. React.Suspense包裹懒加载组件

```js
// router/index.js
import { lazy,Suspense} from 'react';
const Home = lazy(() => import('@/admin-page/pages/Home/index.js'))
const List = lazy(() => import('@/admin-page/pages/List/index.js'))
const EchartShow = lazy(() => import('@/admin-page/pages/EchartShow/index.js'))
const router = createBrowserRouter([
    {
      path: '/',
      element:<AuthRoute><Layout /></AuthRoute>,
      children: [
        {
          index: true,
          element: <Suspense fallback={'加载中'}><Home /></Suspense>,
        },
        {
          path: '/list',
          element:<Suspense fallback={'加载中'}><List /></Suspense>,
        },
        {
          path: '/echarts',
          element:<Suspense fallback={'加载中'}><EchartShow /></Suspense>,
        }
      ]
    },
    {
      path: '/login',
      element: <Login />,
    },
    // 配置404页面
    {
      path: '*',
      element: <NotFound />,
    }
])
```

### 打包优化-压缩代码
  1. 安装compression-webpack-plugin（npm i -D compression-webpack-plugin）
  2. 在craco.config.js中配置插件
```js
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  plugins:[
    {
      plugin: CracoScssDesignPlugin,
      options: {
        // 配置less-loader的选项
        scssLoaderOptions: {
          scssOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 修改主题色
            javascriptEnabled: true,
          },
        },
      },
    },
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]
}
```
### 打包优化-删除console和debugger
  1. 安装terser-webpack-plugin（npm i -D terser-webpack-plugin）
  2. 在craco.config.js中配置插件
```js
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
  plugins:[
    {
      plugin: CracoScssDesignPlugin,
      options: {
        // 配置less-loader的选项
        scssLoaderOptions: {
          scssOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 修改主题色
            javascriptEnabled: true,
          },
        },
      },
    },
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
    }),
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    })
  ]
}   
```
### 打包优化-CDN加速
  1. 体积较大的库可以使用CDN加速，如react、react-dom等
  2. 非业务js库可以使用CDN加速，如lodash、moment等
  3. 在public/index.html中添加CDN链接
  4. 在craco.config.js中配置externals

```js
  module.exports = {
    reactScriptsVersion: 'react-scripts', // 指定react-scripts的版本
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // 配置CDN链接
        let cdnUrl = 'https://cdn.jsdelivr.net/npm/'
        let cdn
        whenProd(() => {
          //排除打包： 配置externals，防止将react和react-dom打包到chunk中
          webpackConfig.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM',
          },
          cdn={
            js:[
              `${cdnUrl}react@17.0.2/umd/react.production.min.js`,
              `${cdnUrl}react-dom@17.0.2/umd/react-dom.production.min.js`,
            ]
          }
        })

        // 注入cdn链接到htmlWebpackPlugin中
        const {isFound,match} = getPlugin(webpackConfig, 'HtmlWebpackPlugin') || {}
        if(isFound) {
          match.userOptions.cdn = cdn
        }
        return webpackConfig;
      },
    },
  }
```

### 包体积可视化分析
  1. 安装 source-map-explorer（npm i -D source-map-explorer）
  2. 在package.json中添加脚本
  ```json
  "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
  ```
  3. 运行npm run analyze查看包体积可视化分析结果








  