import DefaultTheme from 'vitepress/theme'
import pkg from 'naive-ui';
const { create, NButton, NAlert } = pkg;

const naive = create({
  components: [NButton,NAlert]
})
export default{
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive)
  }
}