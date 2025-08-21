# vue3常见逻辑抽离为组合式函数
在Vue 3中，组合式函数（Composables）是一种利用Composition API来封装和复用有状态逻辑的方法。以下是一些在日常项目中可以抽离成组合式函数的常见逻辑：
## 1.​​数据获取（Data Fetching）​​：封装从API获取数据的逻辑，包括处理加载状态、错误和缓存。
```js
import { ref } from 'vue'
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  fetchData()
  return { data, error, loading }
}
```
## 2.​事件监听（Event Listeners）​​：封装添加和移除事件监听的逻辑，确保在组件卸载时清理监听器。
## 3.​​定时器（Timers）​​：封装setInterval或setTimeout的使用，确保在组件卸载时清除定时器。
```js
// 封装定时器逻辑，确保在组件卸载时清除定时器
import { onUnmounted } from 'vue'

export function useInterval(callback, interval) {
  const intervalId = setInterval(callback, interval)

  onUnmounted(() => {
    clearInterval(intervalId)
  })
}
```
```js
// 封装倒计时逻辑，返回剩余时间和格式化后的时间字符串
import { ref, onUnmounted, computed } from 'vue'

export function useCountdown(seconds) {
  const countdown = ref(seconds)
  let timer

  const start = () => {
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  const formattedTime = computed(() => {
    const minutes = Math.floor(countdown.value / 60)
    const secs = countdown.value % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return { countdown, formattedTime, start }
}
```
## 4.​​状态管理（State Management）​​：封装一些复杂的状态逻辑，如表单状态、列表状态等，尤其是需要响应式处理的状态。
```js
// useCounter.js
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  
  return { count, increment, decrement };
}
```
## 5.​​本地存储（Local Storage/Session Storage）​​：封装对localStorage或sessionStorage的读写，使其具有响应性。
```js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const data = ref(JSON.parse(localStorage.getItem(key)) || defaultValue)

  watch(data, (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, { deep: true })

  return data
}
```
## 6.​​鼠标/键盘事件（Mouse/Keyboard Events）​​：封装鼠标位置跟踪、键盘按键监听等。
```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const update = (e) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```
## 7.​​浏览器API（Browser APIs）​​：如使用Geolocation API、Media Queries（响应式设计）等。
```js
// 滚动位置跟踪
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowResize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}
```
```js
// 复制到剪贴板
import { ref } from 'vue'

export function useClipboard() {
  const isCopied = ref(false)

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return { isCopied, copy }
}
```
```js
// 滚动位置
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollPosition() {
  const scrollX = ref(0)
  const scrollY = ref(0)

  const update = () => {
    scrollX.value = window.scrollX
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', update)
    update() // 初始化
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { scrollX, scrollY }
}
```
## 8.​​计算属性（Computed Properties）​​：将复杂的计算逻辑抽离，尤其是多个组件中复用的计算逻辑。
```js
// usePagination.js
import { computed } from 'vue';

export function usePagination(items, itemsPerPage) {
  const currentPage = ref(1);
  
  const totalPages = computed(() => 
    Math.ceil(items.value.length / itemsPerPage)
  );
  
  const paginatedItems = computed(() => 
    items.value.slice(
      (currentPage.value - 1) * itemsPerPage,
      currentPage.value * itemsPerPage
    )
  );

  return { currentPage, totalPages, paginatedItems };
}
```
## 9.​​观察器（Watchers）​​：封装一些需要观察响应式数据变化并执行副作用的逻辑。
```js
// useDebounce.js
import { ref, watch } from 'vue'

export function useDebounce(value, delay) {
  const debouncedValue = ref(value)

  watch(debouncedValue, (newVal) => {
    setTimeout(() => {
      if (debouncedValue.value === newVal) {
        // 执行你的逻辑
      }
    }, delay)
  })

  return debouncedValue
}
```
## 10.​​表单处理（Form Handling）​​：封装表单验证、表单提交、表单重置等逻辑。
```js
// useForm.js
import { ref } from 'vue'

export function useForm(initialValues) {
  const form = ref({ ...initialValues })

  function reset() {
    form.value = { ...initialValues }
  }

  return { form, reset }
}
```
## 11.​​路由相关（Routing）​​：封装与Vue Router相关的逻辑，如获取路由参数、导航守卫等。
```js
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useRouteParam(paramName) {
  const route = useRoute()
  return computed(() => route.params[paramName])
}
```
## 12.​​动画（Animations）​​：封装动画逻辑，如使用GSAP或CSS动画。
```js
// 模态框控制
import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  return { isOpen, openModal, closeModal }
}
```
## 13.​​拖拽（Drag and Drop）​​：封装拖拽相关的事件处理逻辑。
```js
// useDrag.js
import { ref } from 'vue'

export function useDrag(element) {
  const isDragging = ref(false)

  function handleMouseDown() {
    isDragging.value = true
  }
  function handleMouseUp() {
    isDragging.value = false
  }

  return {
    isDragging,
    handleMouseDown,
    handleMouseUp,
  }
}
```
## 14.​​WebSocket​​：封装WebSocket的连接、消息接收和错误处理。
```js
// useWebSocket.js
import { ref } from 'vue'

export function useWebSocket(url) {
  const socket = ref(null)

  function connect() {
    socket.value = new WebSocket(url)
    // 监听消息等事件...
  }

  return { socket, connect }
}
```
## 15.​​第三方库集成（Third-party Libraries）​​：封装第三方库的使用，使其更符合Vue的响应式系统。
```js
// useChart.js
import { ref } from 'vue'
import Chart from 'chart.js/auto'

export function useChart(canvasId) {
  const chart = ref(null)

  function init() {
    const ctx = document.getElementById(canvasId).getContext('2d')
    chart.value = new Chart(ctx, { /* 配置项 */ })
  }

  return { chart, init }
}
```