# vite 高阶使用

## HMR API (模块热更新api)

```js
export function render() {
  document.querySelector('#app').innerHTML = `
  <div>Hello Vue + V2i2t21211</div>
  `
}
render()

if(import.meta.hot) {
  // 接受自身模块的热更新
  import.meta.hot.accept((newModule) => {
    // 模块更新时重新执行渲染
    newModule.render()
  })
}
```

## glob-import (批量导入文件)
```js
// 导入所有模块
const globModules = import.meta.glob('./*.js')
// 来自于第三方库 fast-glob
```

## 预编译
1. ‌依赖预编译
  + 将第三方依赖（node_modules）转换为浏览器可识别的 ESM 格式。
  + 扫描依赖‌：通过分析项目入口文件（如 main.js）的 import 语句，识别所有第三方依赖。
  + 转换依赖：使用如 esbuild 或 rollup 等工具，将第三方库转换为 ESM 格式。
  + 缓存存储‌：预编译结果存储在 node_modules/.vite 目录，后续启动直接复用。
2. 源码预编译
  + 将非标准模块（如 .vue、.ts、.scss）转换为浏览器可执行的 JS/CSS。
  + 按需编译‌：浏览器请求文件时，Vite 实时编译该文件（如 .vue → JS）。
  + ‌Esbuild 转换‌：对 TS/JSX 等语法，使用 Esbuild 快速转译为原生 JS。
  + ‌插件处理‌：通过 Rollup 插件链处理 CSS、静态资源等。
3. 冷启动优化-‌预编译触发时机
 + ‌预编译触发时机‌：首次启动‌：全量预编译所有依赖。
 + 依赖变更‌：仅重新编译变化的依赖（通过 package.json 或 lockfile 比对）。
4. 将类似于lodash这样的库打包在一个单独的chunk中

## 主要配置项
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer';
export default defineConfig({
  // 共享配置
  root: './', // 根目录，默认是当前配置文件所在的目录
  base: './', // 部署应用时的基本URL,默认是'/'
  mode: 'development', // 指定构建模式，默认为'production'
  define:{ // 定义全局常量 必须使用JSON.stringify()包裹，否则会报错
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: JSON.stringify('window.__backend_api_url'),
  },
  publicDir: 'public', // 静态资源目录，默认是'public' assets下的文件最终会编译到public目录下
  cacheDir: 'node_modules/.vite', // 缓存目录，默认是'node_modules/.vite' 预编译依赖，提升打包速度
  plugins: [ // 插件配置数组
    vue(), // vue插件
    vueJsx() // vue-jsx插件
  ],
  resolve: { 
    alias: { // 路径别名配置
      '@': '/src'
    },
    dedupe: ['vue', 'vue-router'], // 将需要去重的模块名放在这里, 处理模块重复的问题:强制 Vite 将指定的模块解析为同一实例，从而避免在同一个项目中出现多个不同版本的同一模块
    conditions: ['module', 'browser'], // 指定模块解析条件，默认为['module', 'browser','development|production']
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'], // 指定模块解析顺序，默认为['browser', 'module', 'jsnext:main', 'jsnext']
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'], // 指定模块解析扩展名，默认为['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
  css:{ // css预处理器配置
    preprocessorOptions: { // 预处理器配置对象
      scss: { // scss预处理器配置对象
        additionalData: `@use "@/styles/variables" as *;`, // 全局scss变量配置，在每个scss文件中都会被引入
      },
    },
    postcss: { // postcss配置对象
      plugins: [ 
        autoprefixer() // 自动添加浏览器前缀插件
      ]
    }
  },
  json:{
    namedExports: true, // 是否支持从 .json 文件中进行按名导入。默认为true
    stringify: 'auto', // 是否将json文件转换为字符串，默认为auto
  },
  logLevel: 'info', // 控制台日志级别，默认为'info'
  clearScreen: true, // 是否在每次构建前清除控制台，默认为true
  // assetsInclude: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 指定哪些文件会被当作资源处理，默认为/\.(png|jpe?g|gif|svg)(\?.*)?$/
  envDir: './', // 环境变量文件目录，默认为'.env'，设置为 false 将禁用 .env 文件的加载。
  // 开发服务器配置对象
  server:{
    host: '0.0.0.0', // 开发服务器监听的主机名，默认为'localhost'
    port: 5174, // 开发服务器端口号，默认为'5173'
    hmr: true, // 是否开启热更新模块替换功能，默认为true
    open: false, // 是否自动打开浏览器，默认为false
    strictPort: false, // 是否强制端口号，设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    proxy: {
      '/api': { // 代理路径
        target: 'http://localhost:3000', // 目标服务器地址
        changeOrigin: true, // 是否改变源，默认为false
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，将 /api 开头的路径替换为空字符串
      }
    },
    cors: true, // 是否启用跨域，默认为true 将 server.cors 设置为 true 允许任何网站向你的开发服务器发送请求并下载你的源代码和内容。
    headers:{}, // 自定义请求头，默认为{}
    middlewareMode: 'html', // 开发服务器中间件模式，默认为'html' | 'ssr'
    fs:{
      strict: true, // 是否严格模式，默认为false
      allow: ['/public'], // 允许访问的目录列表，默认为[]
    }
  },
  // 构建配置对象
  build: {
    target: 'baseline-widely-available', // 最终软件包的浏览器兼容性目标。默认值是 Vite 的一个特殊值 'baseline-widely-available'，该值针对的是包含在 2025 年 5 月 1 日广泛可用的 Baseline 中的浏览器。具体来说，它是 ['chrome107', 'edge107', 'firefox104', 'safari16']。
    modulePreload:{ // 模块预加载配置对象
      polyfill : true, // 是否自动注入一个 模块预加载 polyfill。默认为true
    },
    outDir: 'dist', // 输出目录，默认为'dist'
    assetsDir: 'assets', // 静态资源目录，默认为'assets'
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。默认为4096字节(4KB)
    cssCodeSplit: true, // 是否将 CSS 拆分为多个文件，默认为true
    sourcemap: false, // 是否生成 source map，默认为false boolean | 'inline' | 'hidden' 如果为 true，将会创建一个独立的 source map 文件。如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中。'hidden' 的工作原理与 true 相似，只是 bundle 文件中相应的注释将不被保留。
    emptyOutDir: true, // 是否在构建前清空输出目录，默认为true
    chunkSizeWarningLimit:500 // 警告单个模块大小的限制，默认为500kb
  },
  // 依赖优化选项
  optimizeDeps: { // 优化依赖预构建配置
    entries: 'index.html', // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了node_modules、build.outDir、__tests__ 和 coverage）。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。
    include: ['vue', 'vue-router'], // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    // exclude: ['vue-demi'] // 排除预构建依赖，提升打包速度
    exclude: ['lodash-es'] // 在预构建中强制排除的依赖项。
  },
})
```
