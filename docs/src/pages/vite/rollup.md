# Rollup
[官网](https://cn.rollupjs.org/introduction/)

1. 全局安装 `npm install rollup -g`
2. rollup 命令介绍
```bash
rollup -c # 执行 rollup 配置文件
rollup -i src/index.js # 指定入口文件
rollup -i src/index.js --file dist/bundle.js # 指定入口文件和输出文件
rollup -i src/index.js --file dist/bundle.js --format iife # 指定入口文件和输出文件，并指定格式为立即执行函数表达式
rollup -i src/index.js --file dist/bundle.js --format umd # 指定入口文件和输出文件，并指定格式为通用模块定义
rollup -i src/index.js --file dist/bundle.js --format cjs # 指定入口文件和输出文件，并指定格式为 CommonJS
rollup -i src/index.js --file dist/bundle.js --format es # 指定入口文件和输出文件，并指定格式为 ES6
# rollup --help
-c, --config <filename>     # 指定Rollup配置文件（默认为rollup.config.js）rollup -c rollup.config.js 。
-d, --dir <dirname>         # 指定生成文件的输出目录rollup --dir dist
-e, --external <ids>        # 排除指定模块（以逗号分隔），防止被打包进bundle rollup -e lodash,jquery。
-f, --format <format>       # 指定输出模块格式（默认为es）'amd', 'cjs', 'es', 'iife', 'umd' rollup -f es。
-g, --globals <pairs>       # 为UMD/IIFE格式指定外部依赖的全局变量名 rollup -g jquery:jQuery → 将import $ from 'jquery'映射为window.jQuery。
-h, --help                  # 显示帮助信息
-i, --input <filename>      # 指定入口文件（替代命令行的<入口文件>位置）rollup --input src/main.js。
-m, --sourcemap             # 生成source map文件（默认为false）rollup -m。 可选模式：--sourcemap inline（内联）、--sourcemap hidden（只映射，不引用）
-n, --name <name>           # 为UMD/IIFE格式指定全局变量名 rollup -n MyApp。 若不使用此选项，Rollup将自动生成一个名字（例如：rollup_MyApp）。
-o, --file <output>         # 指定输出文件（替代命令行的<输出文件>位置）rollup --file dist/bundle.js。 若不使用此选项，Rollup将自动生成一个名字（例如：dist/main-xxxxxx.js）。
-p, --plugin <plugin>       # 使用插件 rollup -p @rollup/plugin-node-resolve。 若要指定插件选项，请在插件名称后加上@和JSON字符串（例如：--plugin @rollup/plugin-node-resolve@^10.0.0）。

-v, --version               # 显示版本信息。
-w, --watch                 # 监听文件变化并重新打包（开发模式常用）。
--environment <key>:<value>  # 设置环境变量，例如：--environment NODE_ENV:production 通过process.env.NODE_ENV访问。
```

## Rollup-plugin

1. 安装插件
```bash
npm install @rollup/plugin-node-resolve --save-dev
npm install @rollup/plugin-commonjs --save-dev
npm install @rollup/plugin-babel --save-dev
npm install @rollup/plugin-replace --save-dev
npm install @rollup/plugin-json --save-dev
```
2. 使用json插件
+ 对象格式
```js
import json from '@rollup/plugin-json';
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json() // 允许导入JSON文件作为模块。
  ]
};
```
+ 数组格式
```js
export default[
  {
    input:'./src/index.js', // 入口文件路径
    output:{ // 输出配置
      file: process.env.NODE_ENV ==='development' ? 'dist/dev.es.js' : 'dist/prod.es.js', // 输出文件路径
      format: 'es' // 输出格式，可选值有amd,cjs,esm,iife,umd等
    },
    watch:{
      include:'src/**'
    },
    plugins:[
      json()
    ]
  },
  {
    input:'./src/index.js', // 入口文件路径
    output:{ // 输出配置
      file: process.env.NODE_ENV ==='development' ? 'dist/dev.es.js' : 'dist/prod.umd.js', // 输出文件路径
      format: mode==='local' ? 'es' : 'umd' // 输出格式，可选值有amd,cjs,esm,iife,umd等
    },
    watch:{
      include:'src/**'
    },
    plugins:[
      json()
    ]
  }
]
```
### `@rollup/plugin-node-resolve` 插件可以让 Rollup 找到外部模块。 
1. 安装插件
```bash
npm install --save-dev @rollup/plugin-node-resolve
```
2. 使用插件
```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/main.js',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	},
	plugins: [resolve()]
};
```
### `@rollup/plugin-commonjs` 插件可以将 CommonJS 模块转换为 ES6，以便 Rollup 可以处理它们。
1. 安装插件
```bash
npm install --save-dev @rollup/plugin-commonjs
```
2. 使用插件
```js
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'src/main.js',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	},
	plugins: [commonjs()]
};
```
## output.plguins 输出插件

### `@rollup/plugin-terser` 插件可以压缩代码，去除多余的空格和注释等。
1. 安装插件
```bash
npm install --save-dev @rollup/plugin-terser
```
2. 使用插件
```js
// rollup.config.mjs
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/main.js',
	output: [
		{
			file: 'bundle.js',
			format: 'cjs'
		},
		{
			file: 'bundle.min.js',
			format: 'iife',
			name: 'version',
			plugins: [terser()]
		}
	],
	plugins: [json()]
};
```

## rollup 插件
[rollup插件](https://github.com/rollup/plugins/tree/master)
1. `@rollup/plugin-alias`  路径别名插件
2. `@rollup/plugin-babel`  Babel 插件 编译ES6代码为兼容旧版本浏览器支持的JS代码
3. `@rollup/plugin-commonjs` 转换CommonJS模块为ES6
4. `@rollup/plugin-json` 允许导入JSON文件作为模块
5. `@rollup/plugin-node-resolve` 让Rollup找到外部模块
6. `@rollup/plugin-replace` 替换代码中的字符串
7. `@rollup/plugin-terser` 压缩代码
8. `@rollup/plugin-typescript` 编译TypeScript
9. `rollup-plugin-livereload` 开发时自动刷新浏览器
10. `rollup-plugin-serve` 开发时启动一个HTTP服务器
11. `rollup-plugin-visualizer` 生成代码体积分析报告
12. `rollup-plugin-postcss` 处理CSS
13. `rollup-plugin-scss` 处理SCSS
14. `rollup-plugin-less` 处理LESS
15. `rollup-plugin-stylus` 处理Stylus
16. `@rollup/plugin-image` 处理图片
17. `@rollup/plugin-strip` 移除代码中的console.log等