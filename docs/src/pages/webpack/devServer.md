# 开发服务配置(devServer)
1. 下载依赖 `npm install webpack-dev-server --save-dev`
2. 配置
```js
devServer: {
  client:{ // 客户端配置
    overlay: false, // 当出现编译错误或警告时，在浏览器中不显示全屏覆盖。
    progress: false, // 在浏览器控制台显示编译进度
  },
  compress: true, // 启用gzip压缩
  hot: true, // 开启热更新
  open: true, // 启动后自动打开浏览器
  port: 8082, // 设置端口号
  proxy: [{
    context: ['/api'], // 需要代理的路径
    target: 'http://localhost:8081', // 目标地址
    changeOrigin: true, // 开启代理，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样就不会有跨域问题
    pathRewrite: { '^/api': '' }, // 重写路径
    secure: false, // 如果是https接口，需要配置这个参数
    logLevel: 'debug' // 日志级别
  }]
}
```