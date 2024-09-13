import DefaultTheme from 'vitepress/theme'
import {
  NButton,
  NAlert,
  create
} from 'naive-ui'

const naive = create({
  components: [NButton,NAlert]
})
export default{
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive)
  }
}