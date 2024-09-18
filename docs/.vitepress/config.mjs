import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-ZH',
  head: [['link', { rel: 'icon', href: '/wdm-notebook/favicon.ico' }]],
  title: "Wdm Coding Notes",
  description: "A Coding Notes Site",
  themeConfig: {
    logo: '/logo.jpeg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/home/' }
    ],
    sidebar: {
      '/pages/vue/':[
        {
          text: 'Vue',
          items: [
            { text: '响应式 API', link: '/pages/vue/api' },
            { text: '其他', link: '/pages/vue/other' }
          ]
        }
      ],
      '/pages/note/':[
        {
          text: 'note',
          items: [
            { text: '备忘录', link: '/pages/note/index.md' },
            { text: 'git', link: '/pages/note/git.md' },
            { text: 'jumpServer', link: '/pages/note/jumpServer.md' }
          ]
        }
      ],
      '/pages/ts/':[
        {
          text: 'TS',
          items: [
            { text: 'ts', link: '/pages/ts/index.md' },
          ]
        }
      ],
      '/pages/project':[
        {
          text: '项目',
          items: [
            { text: 'project', link: '/pages/project/index.md' },
          ]
        }
      ]
    },
    socialLinks: [],
    docFooter: { 
      prev: '上一页',
      next: '下一页', 
    }, 
  },
  srcDir: './src',
  base: '/wdm-notebook/',
  assetsDir: 'assets',
  appearance:'dark'
})
