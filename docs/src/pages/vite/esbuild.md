# EsBuild  极速的JavaScript打包工具
[官网](https://esbuild.bootcss.com/getting-started/)
1. 安装
```bash
npm install esbuild --save-dev
```
2. Build scripts  构建脚本
```json
{
  "scripts": {
    "build": "esbuild src/index.js --bundle --outfile=dist/prod.js",
    "dev": "esbuild src/index.js --watch --outfile=dist/prod.js",
    "node":"esbuild src/index.js --outfile=dist/prod.js --platform=node"
  }
}
```