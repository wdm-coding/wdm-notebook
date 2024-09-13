import naive from 'naive-ui'
import Login from './login.vue'
import DefaultTheme from 'vitepress/theme'
import './style.scss'
import {h} from 'vue'
export default{
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  extends: DefaultTheme, // 继承默认主题的样式
  enhanceApp({ app }) {
    app.use(naive)
    app.component('Login', Login)
  }
}