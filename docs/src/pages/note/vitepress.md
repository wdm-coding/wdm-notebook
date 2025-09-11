# vitePress 相关用法

## 在vue项目中使用vitePress
1. 安装vitePress
```bash
$ npm add -D vitepress@next
```
2. 初始化vitePress
```bash
$ npx vitepress init
```

## 创建源文件目录
1. 在docs目录下创建src文件夹
2. 在src文件夹存放相关源文件
3. 配置`docs/.vitepress/config.ts`文件
```ts
import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  srcDir: 'src',
  vite: {
    plugins: [
      AutoImport({
        imports: ['vue']
      }) as any
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],
    sidebar: [
      {
        text: 'Basic',
        items: [
          { text: 'Button', link: '/components/button' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
```

## 通过自定义theme 引入相关文件
1. 在`docs/.vitepress/theme/index.ts`文件中引入相关文件
```ts
import DefaultTheme from 'vitepress/theme'
import '@/custom-ui/styles/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
  library.add(fas,far)
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {}
}
```

## 使用vitePress开发组件库文档

1. 下载插件vitepress-demo-preview
[vitepress-demo-preview](https://github.com/flingyp/vitepress-demo-preview/blob/main/README.zh-CN.md)
```bash
$ npm install @vitepress-demo-preview/component @vitepress-demo-preview/plugin --save-dev
```