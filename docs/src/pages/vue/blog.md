# 博客笔记

## 再见 ESLint 和 Prettier，用 AI 写代码的新格式化搭档登场 Ultracite！
1. `https://www.51cto.com/article/821063.html`
2. Ultracite

## ​​TanStack Query Vue​​  管理 ​​异步状态（服务器状态）​​
1. 下载`npm install @tanstack/vue-query`
2. 创建`queryClient`
```js
// main.ts
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
const app = createApp(App)
// 可选：配置全局的 QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失败后重试次数
      staleTime: 5 * 60 * 1000, // 数据过期时间（5分钟）
      refetchOnWindowFocus: true, // 窗口聚焦时重新获取
    }
  }
})
app.use(VueQueryPlugin, { queryClient }) // 传入配置好的 client
// 或者不传参数，使用默认 client: app.use(VueQueryPlugin)
app.mount('#app')
```