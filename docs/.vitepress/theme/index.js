import naive,{ NConfigProvider,zhCN, dateZhCN } from 'naive-ui'
import Login from './modules//login.vue'
import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import NavLogo from './modules/nav-logo.vue'
import NaiveUiPackage from '../../NaiveUiPackage/index.js'
import { setup } from '@css-render/vue3-ssr'
import './style.scss'
const allowPage = ['/wdm-notebook/']
import { defineComponent, h, inject } from 'vue'
import { getItem } from '../utils/storage.js'

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true,locale:zhCN, 'date-locale':dateZhCN },
      {
        default: () => [
          h(CustomLayout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ]
      }
    )
  }
})
export default{
  extends: DefaultTheme, // 继承默认主题的样式
  Layout: NaiveUIProvider,
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
      app.component('NavLogo', NavLogo)
      for (const name in NaiveUiPackage) {
        app.component(name, NaiveUiPackage[name])
      }
    }else{
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  }
}