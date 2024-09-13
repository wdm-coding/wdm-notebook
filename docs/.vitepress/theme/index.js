import DefaultTheme from 'vitepress/theme'
import {
  NButton,
  create
} from 'naive-ui'

const naive = create({
  components: [NButton]
})
export default{
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive)
  }
}