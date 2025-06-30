# vite基础使用

## [vite官网](https://cn.vitejs.dev/guide/)

## webpack、vite、rollup的区别
1. webpack采用 “Bundle-first（打包优先）” 策略。遍历整个应用的依赖关系图（从入口点开始），将所有模块（JS, CSS, 图片等）编译、转换、合并成一个或多个大的 Bundle。
2. vite是开发阶段不打包，生产阶段打包,相比之下，Vite 采用的是 “Native-Modules（原生模块）” 策略。它将每个模块视为一个独立的文件，并通过浏览器内置的 ES Module 功能直接加载它们，无需打包成一个大文件。
3. 主要是库打包，不侧重开箱开发服务器，核心目标是生成​​更小、更高效​​的库代码 Bundle。

## vite的优势
1. 开发环境启动速度快：利用了浏览器原生支持 ES Modules 的能力。​​不预先打包整个应用​​。启动时，Vite 只启动一个​​开发服务器​​和一个​​极快的预构建步骤​​（用 esbuild 处理 CommonJS/UMD 依赖到 ESM）。当浏览器请求模块时，Vite ​​按需编译和转换​​单个模块（例如，转换 .vue 或 .jsx 文件）。大量依赖（如 node_modules）会被预构建缓存，速度极快。
2. 冷启动时间短。
3. 热更新速度快：只重新编译被更改的模块及其直接依赖，并通过原生 ESM 直接更新浏览器（无需重建 Bundle）
4. 打包速度快：Vite 利用了 Rollup 的插件系统，并结合 esbuild 进行预构建和优化。
5. 生成环境使用Rollup打包，打包速度快。
6. 开发环境编译使用esbuild，编译速度快。
7. esbuild 是一个用 Go 编写的 JavaScript 打包工具，它的优势在于启动速度快、构建速度极快。

## ES Modules​​ 模块​​
+ 将一个大程序拆分成多个相互独立、功能内聚的小文件（即​​模块​​）。
+ 每个模块有自己的作用域，内部的变量、函数、类默认情况下对外部是不可见的（避免命名冲突和全局污染）。
+ 模块之间通过​​导入（import）​​和​​导出（export）​​ 机制来建立联系、共享功能。

## vite 创建vue项目
1. npm create vite@latest
2. 配置vite.config.js

### jsx 插件
1. 下载 npm install @vitejs/plugin-vue-jsx -D
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [
    vue(), // vue插件
    vueJsx() // vue-jsx插件
  ],
})
```
### 支持vue2插件
1. 下载 npm install @vitejs/plugin-vue2 -D
2. 配置vite.config.js
```js
import vue from '@vitejs/plugin-vue2'
export default {
  plugins: [vue()]
}
```
### 支持react插件
1. 下载 npm install @vitejs/plugin-react -D
2. 配置vite.config.js
```js
import react from '@vitejs/plugin-react'
export default {
  plugins: [react()]
}
```

## vite对于css的处理
1. 默认情况下，Vite 会将所有 CSS 文件作为模块导入。这意味着你可以在 JavaScript 文件中通过 import 语句引入 CSS 文件，并且这些样式将被包含在当前模块的局部作用域中。
2. Vite 也同时提供了对 .scss，.sass，.less，.styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖
3. scss 安装 npm add -D sass-embedded

### PostCSS 
1. PostCSS 是一个使用 JavaScript 工具和插件转换 CSS 的平台。它允许你使用未来的 CSS 特性，并将其转换为大多数浏览器都能理解的语法。
2. 如果项目包含有效的 PostCSS 配置 (任何受 postcss-load-config 支持的格式，例如 postcss.config.js)，它将会自动应用于所有已导入的 CSS。
```js
// postcss.config.js
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
export default {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    }),
    autoprefixer()
  ]
};
```
### CSS Modules (CSS 模块)
1. CSS Modules 是一种 CSS 文件编写方式，它允许你将每个类名封装在局部作用域中，防止全局命名冲突。
2. 在 Vite 中，默认支持

### css.preprocessorsOptions (css预处理器选项)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {// 别名配置，简化模块导入路径
      '@': path.resolve(__dirname, './src')
    }
  },
  css:{
    preprocessorOptions: {// 配置预处理器选项，例如启用JavaScript在Less文件中
      scss:{ // 配置Sass预处理器选项
        additionalData: `@use "@/styles/variables" as *;`, // 导入全局变量文件
      }
    }
  }
})

```
## 配置@别名

```js
import path from 'path'
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
// css 中使用别名
// @import '@/styles/index.css';
```

## vite 配置 tyepscript
1. vite 默认支持 TypeScript，无需额外配置。
2. 只是编译不校验类型。
3. 校验需要tsc --noEmit 命令,意思是不编译，只校验类型。
4. 安装 npm install typescript -D
5. 配置tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext", // 编译目标版本，此处为最新版ES标准
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext", // 模块系统，此处为ES标准
    "skipLibCheck": true, // 跳过所有声明文件的类型检查
    "moduleResolution": "node", // 模块解析策略，此处为Node.js风格
    "allowImportingTsExtensions": true, // 允许导入带有.ts扩展名的文件
    "resolveJsonModule": true, // 允许导入JSON模块
    "isolatedModules": true, // 将每个文件作为单独的模块处理
    "noEmit": true, // 不生成输出文件，主要用于类型检查
    "jsx": "react-jsx",// 允许在.tsx文件中使用JSX语法
    "strict": true, // 启用所有严格类型检查选项
    "noUnusedLocals": true, // 报告未使用的局部变量
    "noUnusedParameters": true, // 报告未使用的参数
    "esModuleInterop": true, // 允许导入非ES模块的包
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致性
    "types": ["vite/client"], // 指定额外的类型声明文件
  },
  "include": ["src"]
}
```
### vue中配置ts
安装 vue-tsc
```bash
npm install vue-tsc -D
# "build": "vue-tsc --noEmit && tsc --noEmit && vite build",
```

## vite处理静态资源
1. Vite 会自动处理静态资源，例如图片、字体等。当你通过 import 语句导入一个文件时，Vite 会将其作为模块来处理，并返回该文件的 URL。
2. `?url` 参数可以获取资源的URL。
3. `?raw` 参数可以获取资源的原始内容。
4. `?inline` 参数可以将资源内联到代码中。
5. `?worker` 参数可以将资源作为 Web Worker 的入口。
6. Web Assembly (WASM Web 程序集)
+ WASM 是一种允许其他编程语言编译成接近原生性能的代码的技术。
+ Vite 支持 WASM，你可以通过 import 语句导入 .wasm 文件。
+ 例如，你可以这样导入一个 WASM 文件：
```js
import wasm from './example.wasm?init';
```

## vite集成eslint、prettier

1. 项目根目录下创建 `.eslintrc.js` 文件
2. 安装 eslint 相关依赖
```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```
3. 初始化 eslint
```bash
npx eslint --init
```
4. 配置 `.eslintrc.js`
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // 自定义规则配置
  },
};
```
5. 安装 prettier
```bash
npm install prettier -D
```
6. 创建 `.prettierrc` 文件
```json
{
  "semi": false,
  "singleQuote": true
  // 其他配置...
}
```
7. VS Code配置
+ format on save
+ foretmatter defalut

8. package.json
```json
"scipts": {
  "lint": "eslint . --ext js src/", // 添加 lint 脚本
  "format": "prettier --write ." // 添加 format 脚本
}
```
9. husky 配置
```bash
npm install husky -D
```
10. 修改 package.json
```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged" // 添加 pre-commit 钩子
  }
},
```

## vite 的 环境变量
1. MODE 环境变量默认情况下，Vite 会读取 `mode` 字段从 `package.json` 或者命令行参数 `--mode` 来决定使用哪个环境变量文件。
2. BASE_URL 环境变量
3. PROD 环境变量
4. DEP 环境变量
5. 通过`import.meta.env`访问环境变量

### 项目根目录下创建 `.env` 文件
```bash
VITE_SOME_KEY=123
```
1. 项目根目录下创建 `.env.development` 文件
  + 只在开发环境生效的环境变量文件 npm run dev 时生效。
2. 项目根目录下创建 `.env.development.local` 文件
  + 只在开发环境生效的环境变量文件，优先级高于 `.env.development` 文件 npm run dev 时生效。
3. 项目根目录下创建 `.env.production` 文件
  + 只在生产环境生效的环境变量文件。npm run build 时生效。
4. 项目根目录下创建 `.env.test` 文件
  + 配置mode为test时的环境变量文件。npm run build --mode test 时生效。
5. 项目根目录下创建 `vite-env.d.ts` 文件 声明环境变量类型。
```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SOME_KEY: string;
}
```
