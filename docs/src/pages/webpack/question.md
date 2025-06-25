# Webpack 高频面试题

## 核心概念

### ​Webpack 是什么？它的核心概念有哪些？​​

1. Webpack 是一个现代 JavaScript 应用程序的静态模块打包工具
2. 核心概念：Entry、Output、Loaders、Plugins、Mode、Module、Bundle

### ​Webpack 的构建流程是怎样的？​​

1. 初始化参数：从配置文件和命令行读取参数
2. 开始编译：初始化 Compiler 对象，加载所有配置的插件
3. 确定入口：根据配置中的 entry 找出所有入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译
5. 完成模块编译：得到模块编译后的内容和它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
7. 输出完成：根据配置确定输出的路径和文件名，把文件内容写入文件系统

### ​Loader 和 Plugin 的区别是什么？​​

1. Loader: 用于对模块的源代码进行转换，将文件从不同语言转换为 JavaScript
2. Plugin: 用于执行更广泛的任务，如打包优化、资源管理、环境变量注入等
3. 区别：Loader 在 module.rules 中配置，Plugin 需要单独引入并在 plugins 中配置

## 配置相关

### 如何优化 Webpack 的构建速度？​​
1. 使用高版本的 Webpack 和 Node.js
2. 多进程/多实例构建：thread-loader、HappyPack
3. 压缩代码时开启多进程：terser-webpack-plugin 的 parallel 选项
4. 合理使用缓存：cache-loader、hard-source-webpack-plugin
5. 缩小文件搜索范围：配置 resolve.modules、resolve.extensions 等
6. 使用 DllPlugin 预编译不常变更的第三方库

### ​如何优化 Webpack 的打包体积？​​

1. 代码压缩：TerserPlugin、CSSMinimizerPlugin
2. 代码分割：SplitChunksPlugin
3. Tree Shaking：移除未使用的代码
4. Scope Hoisting：合并模块，减少闭包
5. 按需加载：动态 import()
6. 使用 CDN 加载第三方资源：externals 配置

### Webpack 的热更新原理是什么？​​

1. 启动时建立 WebSocket 连接
2. 文件修改后，Webpack 重新编译
3. 编译完成后通过 WebSocket 发送 hash 和 ok 消息
4. 客户端收到消息后检查更新，请求新的 manifest 文件
5. 通过 JSONP 请求更新的 chunk
6. 应用更新前检查模块的 parents 和 children
7. 应用更新，触发 render 方法重新渲染

## 高级特性

### ​什么是 Tree Shaking？它是如何工作的？​​

1. Tree Shaking 是通过静态分析找出代码中未使用的部分并删除
+ 工作原理：
1. 使用 ES6 模块语法（import/export）
2. 在 production 模式下自动启用
3. 通过 sideEffects 标记无副作用的模块
4. 由 TerserPlugin 执行实际的删除操作

### ​Webpack 的 code splitting 有哪些方式？​​

1. 入口起点：entry 配置多个入口
2. 防止重复：使用 SplitChunksPlugin 去重和分离 chunk
3. 动态导入：通过模块内调用 import() 实现按需加载
4. 预获取/预加载：使用 magic comment 如 import(/* webpackPrefetch: true */ '...')

### ​如何实现 Webpack 的持久化缓存？​​

1. 使用 [contenthash] 作为文件名
2. 配置 cache 选项
3. 使用 cache-loader 或 hard-source-webpack-plugin
4. 确保 module.id 稳定：optimization.moduleIds 设为 'deterministic'

## 实战问题

### Webpack 如何处理 CSS 和图片资源？​​

1. CSS：使用 style-loader 和 css-loader
2. 图片/字体：使用 file-loader 或 url-loader
3. 现代方案：使用 asset modules (type: 'asset')

### ​如何配置 Webpack 支持多页面应用？​​

1. 配置多个 entry 入口
2. 使用 html-webpack-plugin 生成多个 HTML 文件
3. 每个 HTML 文件引入对应的 entry chunk

### ​Webpack 5 有哪些新特性？​​

1. 持久化缓存
2. 资源模块（asset modules）
3. Module Federation（模块联邦）
4. 更好的 Tree Shaking
5. 移除 Node.js polyfill
6. 更快的构建速度和更小的包体积

### ​什么是 Module Federation？它解决了什么问题？​​

1. 允许不同的 Webpack 构建之间共享代码
2. 解决微前端架构中的代码共享问题
3. 主要概念：Host（消费方）、Remote（提供方）、Shared（共享依赖）

### ​Webpack 如何处理 ES6+ 语法？​​

1. 使用 babel-loader 配合 @babel/core 和 @babel/preset-env
2. 配置 .babelrc 或 babel.config.js
3. 可以配置 core-js 实现 polyfill

### ​如何调试 Webpack 的构建过程？​​

1. 使用 webpack --profile --json > stats.json 生成构建分析文件
2. 使用 webpack-bundle-analyzer 可视化分析
3. 配置 devtool 为 'source-map' 生成 source map
4. 使用 Node.js 调试工具调试 Webpack 配置