# vite 面试题

## vite 开发环境为何启动快？
1. 基于 ES 模块的按需编译。
2. 无需打包，直接运行源代码。
3. 使用 ​​esbuild​​（Go 语言编写）预构建依赖，将多个文件合并为单个模块，减少网络请求
4. 利用浏览器缓存提速，首次加载后，依赖不再请求服务器
5. 热更新（HMR）优化，无需重新加载整个页面，利用原生 ESM 的 import.meta.hotAPI，更新速度与项目规模无关。
```html
<div id="app">基本用法</div>
<script type="module">
  import { fun1,fun2 } from './src/main.js';
  fun1();
  fun2();
</script>
<div>
  <p>动态引入</p>
  <button id="btn">load</button>
</div>
<script type="module">
  document.getElementById('btn').addEventListener('click',()=>{
    import('./src/main.js').then(res=>{
      console.log('动态加载成功',res)
      res.fun1();
      res.fun2();
    })
  })
</script>
```