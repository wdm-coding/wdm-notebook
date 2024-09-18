import naive from 'naive-ui'
import Login from './modules//login.vue'
import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import './style.scss'
const allowPage = [
  '/wdm-notebook/'
]
import { getItem } from '../utils/storage.js'
export default{
  extends: DefaultTheme, // 继承默认主题的样式
  Layout:CustomLayout,
  enhanceApp({ app, router }) {
    if (!import.meta.env.SSR){
      router.onBeforeRouteChange = (to) => {
        const isToken = !!getItem('token')
        if(isToken){
          console.log("有权限");
          return true
        }else{
          if(allowPage.includes(to)) {
            console.log("白名单页面");
            return true
          }else{
            console.log("登录验证失败，请重新登录");
            router.go('/wdm-notebook/')
            return false
          }
        }
      }
      app.use(naive)
      app.component('Login', Login)
    }
  }
}