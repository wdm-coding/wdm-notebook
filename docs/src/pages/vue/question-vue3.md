# vue3

## vue3 比 vue2 有什么优势？
1. 更好的性能：使用Proxy作为响应式系统的底层，比Vue2的Object.defineProperty的性能更好。
2. 更小的体积：移除了冗余代码和废弃的功能，体积更小。
3. 更灵活的组合API：Composition API提供了更多的灵活性，可以更好地组织组件逻辑。
4. 更强大的TypeScript支持：内置了对TypeScript的支持，使得在开发大型应用时更加方便。

## vue3的生命周期？
1. setup()-> onBeforeCreate() ->  -> onCreated()
2. onBeforeMount() -> onMounted() 
3. onBeforeUpdate() -> onUpdated()
4. onBeforeUnmount() -> onUnmounted()

## Composition API 和 Options API 的区别？
1. Composition API 更灵活，可以更好地组织组件逻辑。
2. Composition API 可以更好地与TypeScript集成。
3. Composition API 可以更好地与第三方库集成。
4. Composition API 可以更好地支持树形组件。
5. Composition API 可以更好地支持SSR。
6. Composition API 可以更好地支持自定义Hooks。

## toRefs和toRef的区别？
1. toRef可以将一个响应式对象(reactive)中的某个属性转换为ref。
```js
const state = reactive({ count: 0 })
const countRef = toRef(state, 'count')
console.log(countRef.value) // 0
countRef.value++ // 更新响应式对象中的属性值
console.log(state.count) // 1
```
2. toRefs可以将一个响应式对象(reactive)中的所有属性转换为ref。
```js
const state = reactive({ count: 0, name: 'Vue' })
const stateRefs = toRefs(state)
const { count, name } = toRefs(state)
count.value++ // 更新响应式对象中的属性值
console.log(state.count) // 1
```
3. toRef返回的是一个ref对象，而toRefs返回的是包含多个ref对象的普通对象(可解构)。
4. toRef可以将不在响应式对象中的属性转换为ref，toRefs只能将响应式对象中存在的属性转换为ref。

## toRef 的使用场景
1. 保持单个 Prop 的响应性
```js
const props = defineProps({ count: Number })
// 将 props.count 转换为 ref，保持响应式连接
const countRef = toRef(props, 'count')
```
2. 组合函数中暴露特定属性
```js
function useUser() {
  const state = reactive({ name: 'Alice', age: 25 })
  
  // 只暴露 age 属性给外部
  return { age: toRef(state, 'age') }
}
```
3. TypeScript 类型优化
```js
interface State {
  darkMode: boolean
}

const state = reactive<State>({ darkMode: false })
const darkModeRef = toRef(state, 'darkMode') // 类型为 Ref<boolean>
```

## toRefs 的使用场景 
1. 组合式函数返回多个响应式引用时，为了避免每次调用组合函数都返回一个新的ref对象，可以使用toRefs将它们转换为普通的响应式属性。
```js
// 组合式函数
function useUser() {
  const user = reactive({ name: 'xxx', age: 25 })
  return toRefs(user)
}
// 使用
const { name, age } = useUser()
```
2. Props 解构保持响应性(vue3.5+ 直接结构的props属性就具有响应式)。
```js
export default {
  props: ['user'],
  setup(props) {
    const { name, age } = toRefs(props.user) // 保持props的响应性
    return { name, age }
  }
}
```
3. TypeScript 类型推断优化
```js
interface State {
  loading: boolean
  data: string[]
}

const state = reactive<State>({
  loading: false,
  data: []
})

// 类型会被正确推断为 Ref<boolean> 和 Ref<string[]>
const { loading, data } = toRefs(state)
```
4. 与 watch 配合
```js
const state = reactive({ x: 1, y: 2 })
const { x, y } = toRefs(state)

watch([x, y], ([newX, newY]) => {
  console.log('坐标变化:', newX, newY)
})
```

## computed和ref的区别
1. computed是计算属性，ref是响应式引用。
2. computed是基于依赖的缓存，ref不基于依赖。
```js
// 模拟computed函数
function computed(getter) {
  let value = null
  return new Proxy({
    get: () => {
      if (value === null) {
        value = getter()
      }
      return value
    },
    set: newValue => {
      // 重新计算并更新值
      value = getter(newValue)
    }
  })
}
```

## vue3 相比 vue2 升级了哪些功能？
1. createApp()代替new Vue()。
2. Composition API。
3. Teleport。传送门：可以将组件渲染到DOM树之外的任何位置。
4. Fragments。片段：允许在单个组件中包含多个根节点。
5. Suspense。挂起：允许组件在等待异步数据时显示占位内容，直到数据加载完成再渲染最终内容。
6. emits选项代替$emit。
7. 生命周期钩子名称变化。
8. 移除.sync修饰符、filter。
9. 异步组件的语法变化。

## Suspense 组件的使用场景
1. Suspense 组件可以用于在等待异步数据时显示占位内容，直到数据加载完成再渲染最终内容。
2. Suspense内部有两个插槽：default 和 #fallback。
```html
<!-- 异步组件 -->
<template>
  <div class='suspense_test'>
    <h1>Suspense</h1>
  </div>
</template>

<script>
  export default {
    name: 'SuspenseTest',
    async setup() {
      await new Promise(resolve => setTimeout(() => resolve(), 3000))
      return {}
    }
  }
</script>
```
```html
<!-- 父组件使用异步组件 -->
<template>
  <Suspense>
    <SuspenseTest />
    <template #fallback>等待 {{ time }} 秒后渲染异步组件</template>
  </Suspense>
</template>
<script setup>
  import SuspenseTest from './suspense-test.vue'
  const time = ref(3)
  onMounted(() => {
    const timer = setInterval(() => {
      time.value--
      if (time.value === 0) {
        clearInterval(timer)
      }
    }, 1000)
  })
</script>
```

## Composition API 如何实现逻辑复用？
1. 封装自定义hooks函数。
2. 函数命名规范：use开头，驼峰命名。
3. setup函数中使用自定义hooks。

















## 为什么vue3中ref变量要用.value访问
1. Vue 3 使用 Proxy 来实现响应式系统。
2. Proxy 只能拦截对象属性的读取或赋值操作，而不能直接代理原始数据类型（如字符串、数字等）的属性访问。
3. 所以ref返回一个带有value属性的对象，以便我们可以像操作普通属性一样访问它的值。
4. 这样Proxy就可以拦截对ref对象的访问，从而实现对值的响应式更新。
5. vue3的响应式追踪、依赖收集（track）、视图更新（trigger）等都依赖于这个value属性的getter和setter进行拦截。
6. 类似于对象的每个属性访问都会触发getter和setter，从而实现对值的响应式更新。
```js
const a = 1
const ref = {
  value: a,
}
const obj = {
  a:1
}
```

## computed 为什么也需要.value访问？
1. computed 返回的是一个ComputedRef 对象‌（继承自 Ref），无论其内部值是基本类型还是对象，都需要通过 .value 访问。这是由 Vue 响应式系统的核心设计决定的，因为它需要保持与原始数据类型的兼容性。
2. 保持所有 Ref 类型行为一致，简化使用。

## vue3如何对嵌套对象的进行惰性代理
1. Vue 3 采用惰性代理：只在访问嵌套属性时才将其转换为响应式对象，避免不必要的性能开销。
2. 顶层对象立即代理。
3. 嵌套对象在访问时才代理。
5. 代理结果缓存。




