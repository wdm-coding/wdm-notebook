import naive from 'naive-ui'
import Login from './login.vue'
import DefaultTheme from 'vitepress/theme'
import './style.scss'
import {h} from 'vue'
import permission from '../router/permission.js'
export default{
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  extends: DefaultTheme, // 继承默认主题的样式
  enhanceApp({ app, router }) {
    console.log("路由变化", router);
    app.use(naive)
    // app.use(permission, { router })
    app.component('Login', Login)
  }
}