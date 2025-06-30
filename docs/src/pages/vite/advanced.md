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