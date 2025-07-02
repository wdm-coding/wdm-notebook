# Rollup
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