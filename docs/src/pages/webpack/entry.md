# 入口(Entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接或间接）依赖的，为了完成工作，它将追踪这些图中的每一个连接，最终输出到bundles（捆绑包）中。

## 单入口配置
```js
entry: './src/index.js',
// 打包后的文件名配置
output:{
  filename:'bundle.js'
}
```
## . 多个入口配置
```js
// 数组方式
entry: ['./src/index.js','./src/main.js'],
// 对象方式 可以打包成多个js文件
entry: {
  index: './src/index.js',
  main: './src/main.js'
}
// 对象方式 打包后的文件名配置
entry:{
  index:{
    import:'./src/index.js',
    filename:'index.js' // 打包后的文件名，不写默认是index.js
  }
  main:{
    import:'./src/main.js',
    filename:'main.js' // 打包后的文件名，不写默认是main.js
  }
}
// 依赖关系配置
entry:{
  main:{
    import:'/src/main.js',
    filename:'main.js',
    dependOn:'lodash' // 当前入口所依赖的入口。它们必须在该入口被加载前被加载 loadsh。
  },
  lodash:'lodash',
  two:{
    import:'/src/two.js',
    filename:'test.js'
  }
},
```