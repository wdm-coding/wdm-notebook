# VUE2

## data 为什么是一个函数？
1. 组件中的 data 写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，类似于Java中方法内的局部变量。
2. 如果data是对象，那么组件复用时，数据会共享。
3. 组件复用时，data写为函数，每次都会重新调用此方法，相当于重新创建了一个对象。
4. 根实例例外‌：new Vue() 的 data 可以是对象，因为根实例唯一。

## computed(计算属性) 和 watch(侦听器) 的区别 ？
1. computed是派生新值，基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值。
2. computed默认只有 getter，也可以手动指定 setter。
3. wathc 监听数据变化‌，执行异步或复杂操作（如 API 调用、副作用逻辑等）。
4. watch 无缓存，每次变化都会触发回调。
5. watch支持深度监听（deep: true）和立即执行（immediate: true）。

## watch监听对象的`newValue` 此处和 `oldValue` 是相等的
```js
data(){
  return {
    obj:{ count: 0 }
  }
}
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})
this.obj.count++
```

## v-if 和 v-show 的区别？
1. 渲染方式不同：v-if 是动态的基于条件判断是否渲染，而 v-show 不管条件是什么都进行渲染，只是通过 CSS 的 display 属性来控制显示与否。
2. 性能影响：v-if 在切换时销毁和重建元素，而 v-show 只改变元素的 CSS display 属性。频繁切换使用 v-show 更合适。
3. 初始渲染：v-if 在条件为假时不进行任何操作，不占用 DOM 资源；而 v-show 会始终渲染元素，只是隐藏。

## v-for 和 v-if 为什么不能一起使用？
1. 因为 v-for 比 v-if 优先级高，所以会先执行 v-for 再执行 v-if。
2. 如果两者一起使用，每次都会重新渲染列表，导致性能问题。
3. 应该将 v-if 放在外层元素上（如 `<template>`），或者在计算属性中处理过滤数据后再进行循环。

## v-for 中 key 的作用？
1. 高效的更新虚拟 DOM：当数据改变时，Vue 能够快速定位到需要更新的元素。
2. 避免就地复用‌：如果没有 key，Vue 会尝试复用已有元素而不是创建新元素，导致状态错乱（如输入框内容错位）。
3. 精准触发过渡效果‌：Vue 的过渡系统依赖 key 来正确识别元素的进入、离开和移动。

## vue2 的修饰符
1. 阻止冒泡：`.stop`
2. 阻止默认行为：`.prevent`
3. 捕获模式：`.capture`
4. 自定组件中包含如 `.native` 修饰符，以监听原生事件。
5. 按键修饰符：`.enter`、`.tab` 等
6. 修饰符可以串联使用，如 `.stop.prevent`
7. `v-model.lazy`：延迟更新，直到 blur 或回车
8. `v-model.number`：自动将输入值转为数值类型
9. `v-model.trim`：自动过滤首尾空格
10. `.once`：事件只触发一次
11. `.self`：只当事件在该元素本身触发时才触发回调 
12. `.sync`：双向绑定(`$emit('update:value', newValue)`)

## vue2 父子组件通信
1. 父组件通过 props 向下传递数据给子组件。
2. 子组件通过 `$emit` 触发事件，父组件监听该事件来接收数据。
3. 使用 `$refs` 访问子组件实例，直接调用其方法或修改数据。
4. 使用 Vuex 进行全局状态管理。
5. 使用 Event Bus（一个空的 Vue 实例）进行跨组件通信。
6. 依赖注入（provide/inject）
7. 使用 `$parent` 或 `$children` 访问组件的父或子实例。

## 单个组件的生命周期
1. 挂载阶段
 + beforeCreate 初始化数据观测和事件监听等，此时还不能访问到 el、 data、computed 等属性
 + created 已完成数据观测、属性和方法的运算，但尚未开始 DOM 挂载过程
 + beforeMount 虚拟 DOM 已经创建完成，但尚未挂载到真实页面上
 + mounted 组件已挂载到页面上，可以进行 DOM 操作
2. 更新阶段
 + beforeUpdate 组件数据更新时调用，发生在虚拟 DOM 打补丁之前
 + updated 组件数据更新完成，虚拟 DOM 打补丁之后
 + activated 被 keep-alive 缓存的组件激活时调用
 + deactivated 被 keep-alive 缓存的组件停用时调用
3. 销毁阶段
 + beforeDestroy 组件销毁前调用，此时仍可正常访问实例
 + desotroyed 组件销毁后调用，所有绑定的事件监听器会被移除

## 父子组件的生命周期
1. 加载过程
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
2. 更新过程
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
3. 销毁过程
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## vue 2 高级特性
1. 自定义v-model
2. $nextTick
3. slot
4. 动态组件、异步组件
5. keep-alive
6. 混入mixin

## 自定义v-model
1. 组件上 v-model 的默认行为是使用 value prop 和 input 事件
2. 可以通过 model 选项自定义 prop 和 event
3. 示例：
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: { checked: Boolean },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

## $nextTick(异步渲染)

### 原理：
1. Vue 在侦听到数据变化时，会开启一个队列
2. 同一个事件循环中发生的所有数据变更会被批量推入这个队列
3. 在下一个事件循环的"tick"中，Vue 刷新队列并执行实际（已去重的）DOM 更新

### ‌Vue 异步渲染核心流程
1. 数据变更触发 setter 通知
2. Watcher 将更新任务推入队列（queueWatcher）
3. 事件循环结束，nextTick 清空队列并执行更新
4. 执行更新，触发渲染函数重新生成虚拟 DOM 并进行 diff 算法
5. 将虚拟 DOM 转换为真实 DOM 并插入到页面中
6. 完成更新，触发回调（如果有）

### Vue实现异步渲染的任务类型与优先级
1. 微任务（Microtask）‌：Promise.then / MutationObserverVue 
2. 默认优先使用微任务
3. 执行时机：当前宏任务结束前
4. 降级方案，兼容性兜底 宏任务（setTimeout/setInterval/setImmediate）
5. 执行顺序：同步代码 → 微任务队列 → DOM渲染 → 宏任务队列

### 具体到 Vue 的时序
1. 数据修改（同步）
2. Watcher 将更新任务推入队列（同步）
3. nextTick 安排 flush 为微任务
4. 当前调用栈清空，执行微任务（执行 watcher 队列，计算 VDOM）
5. 将虚拟 DOM 转换为真实 DOM 并插入到页面中
6. 完成更新，如有宏任务则执行宏任务

### 作用：
1. 用于延迟执行代码，直到下次 DOM 更新循环结束之后
2. 常用于在数据变化后立即操作 DOM 或访问更新的视图元素
3. 连续多次数据修改只会触发一次渲染。
4. 在微任务中修改数据仍属同一事件循环
5. 宏任务中修改数据会开启新的事件循环

## slot
1. 插槽（slot）是 Vue 组件中的一个重要特性，允许父组件向子组件传递 HTML 或内容。
2. 默认插槽是最基本的，可以直接在子组件模板中使用 `<slot></slot>` 来定义,`<template v-slot>`来展示。
3. 具名插槽允许父组件向子组件传递多个内容片段，通过 `name` 属性来区分，`<template v-slot:header>`来展示。
4. 作用域插槽允许子组件向父组件传递数据，并在父组件中渲染这些数据，`<template v-slot:header="{ item, index }">`来展示。
5. 子组件只关心数据逻辑，父组件控制渲染样式。
6. 父组件可直接解构插槽属性，如 v-slot="{ item, index }"
7. 作用域插槽属性优先级高于父组件自身数据和props。
```js
// vue2.x 写法示例：
<slot :item="item" :index="index"></slot>
<template slot-scope="props">
  {{ props.item }}-{{ props.index }}
</template>
<template v-slot:default="props">
  {{ props.item }}-{{ props.index }}
</template>
```

## 动态组件
1. 使用 `<component :is="component-name"></component>` 来动态切换组件。
2. keep-alive 包裹动态组件，可以保持组件状态。
3. keep-alive 默认缓存不活动的组件实例，不会销毁它们。
4. keep-alive 的钩子：activated(调用时机为首次挂载以及每次从缓存中被重新插入时)、deactivated(在从 DOM 上移除、进入缓存,以及组件卸载时调用)

## keep-alive如何缓存组件 
1. ‌缓存组件实例‌：当组件被切换时，不会销毁，而是保留在内存中。
2. ‌保留组件状态‌：包括 data、DOM 结构、滚动位置、定时器等，避免重新初始化。
3. ‌避免重复渲染‌：再次激活时直接复用缓存，跳过 created、mounted 等生命周期钩子。 
4. 当缓存数量超过 max 限制时，自动移除最久未使用的实例。
5. 使用 JavaScript 对象（Vue 2）或 Map 对象（Vue 3）存储缓存实例。
6. 数组记录访问顺序，尾部是最近访问的键，头部是最久未访问的键。

## 异步组件
1. import() 动态导入组件，实现异步加载。
2. 按需加载，减少初始包体积。
```js
components: {
  myComponent: () => import('./my-component.vue')
}
```

## mixin 抽离公共功能
1. 多个组件有相同的选项时，可以将这些选项抽取到 mixin 中。
2. mixin 对象可以包含任何组件选项。
3. 组件和 mixin 选项合并时，同名钩子函数将混合为一个数组，依次调用。
4. 优先级：组件 > mixin
5. mixin变量来源不明确，可读性差，容易冲突。

## Vuex 状态管理
1. state：存储状态
2. getters：计算属性
3. mutations：同步修改状态
4. actions：异步修改状态
5. modules：模块化
6. dispath：触发action
7. commit：触发mutation
8. mapState、mapGetters、mapActions、mapMutations：辅助函数

## Vue Router 路由管理
1. 路由模式
  + hash 模式（默认） 使用 URL 的 hash 来模拟一个完整的 URL
  + history 模式 使用 HTML5 History API 来实现无刷新的页面跳转
2. 动态路由匹配
  + 动态路径参数 使用冒号（:）标记，如 /user/:id
  + 可选的动态路径参数 使用问号（?）标记，如 /user/:id?
  + 星号（*）匹配任意路径，如 /user/*
  + 捕获所有路由或 404 Not found 匹配 /:catchAll(.*)
3. 嵌套路由
  + 在路由配置中，使用 children 数组定义嵌套路径
  + 嵌套路由的组件需要在父组件中通过 `<router-view></router-view>` 来渲染
4. 导航守卫
5. 编程式导航
  + this.$router.push(location, onComplete?, onAbort?)
6. 路由懒加载
  + 使用动态导入语法，如 () => import('./Foo.vue')
7. 路由别名
  + 使用 alias 属性，如 `{ path: '/a', component: A, alias: '/b' }`
8. 滚动行为
  + 使用 scrollBehavior 函数，控制滚动位置
9. 路由元信息
  + 在路由配置中使用 meta 字段，如 { path: '/foo', component: Foo, meta: { requiresAuth: true } }
```js
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})
```

## hash模式和history模式的区别

### 表现形式
1. hash 模式（默认） 使用 URL 的 hash 来模拟一个完整的 URL
2. history 模式 使用 HTML5 History API 来实现无刷新的页面跳转
3. hash # 后的部分是前端路由的路径，不会发送到服务器。
4. history 模式会将路径当作真正的 URL，需要服务器配置支持。

### 实现原理
1. 哈希模式：依赖 window.location.hash 和 hashchange 事件通过监听 hashchange 事件来实现路由变化。
2. history 模式：依赖 HTML5 History API（pushState 和 replaceState）和 popstate 事件。通过监听 popstate 事件来实现路由变化。
3. history 模式需要服务器支持，因为当用户直接访问某个 URL时，服务器需要返回前端应用的入口文件（如 index.html）。

## ajax请求应该放在哪个生命周期？
1. mounted 生命周期钩子中发起 AJAX 请求是最常见的做法。
2. 除非有特殊需求，否则通常在 mounted 钩子中发起请求。
3. 放在mounted之前，会导致数据还未请求到就开始渲染页面。

## 如何将组件所有的 props 传递给内层组件
1. 父组件中使用 v-bind="$props"

## 如何自己实现v-model
1. model 选项：prop、event
2. props: 属性名 是 model 选项的 prop 的值
3. $emit: 事件名 是 model 选项的 event 的值

## 何时使用异步组件
1. 大型应用：分割代码，按需加载
2. 第三方组件：避免初始加载时间过长
3. 路由懒加载：结合 Vue Router 使用

## 何时使用keep-alive
1. 动态组件切换：保持状态
2. 缓存页面：如 Tab 切换
3. 优化性能：避免重复渲染

## 何时使用beforeDesotry
1. 清除定时器
2. 清除自定义事件监听 event.$off
3. 清除DOM事件监听

## 描述响应式原理
1. 监听data变化
2. 组件渲染和更新过程

## 简述diff算法过程
1. patch(elem,vnode) 首次渲染时，将虚拟DOM挂载到真实DOM容器上。
2. patch(vnode,newVnode) 数据更新时，通过对比新旧vnode高效更新真实DOM。
3. patchVnode 当新旧vnode的key和tag相同时，进入patchVnode流程,对比新旧虚拟节点的属性、子节点差异。
4. addVnodes 将一组新的虚拟节点（vnode）批量插入到真实DOM中指定的父节点下。
5. removeVnodes 批量移除虚拟节点对应的真实DOM节点。
6. updateChildren 对比新旧子节点列表，高效更新真实DOM。(通过key标识相同节点，避免不必要的重建,相同节点仅更新属性和子节点)

## vue 为何是异步渲染，$nextTick的作用
1. 异步渲染：Vue 在数据变化后不会立即更新DOM，而是将更新操作放入一个队列中，提高性能。
2. $nextTick: 当数据改变时，在下一次 DOM 更新循环结束之后执行延迟回调。
3. 使用场景：获取最新的DOM状态、在DOM更新完成后进行某些操作等。

## vue常见的性能优化手段
1. 合理使用v-show和v-if
2. 合理使用computed
3. v-for渲染列表时，使用key
4. 组件卸载时，清除定时器、事件监听等
5. 合理使用异步组件、keep-alive
6. data层级不要太深，避免频繁更新深层数据。
7. 使用vue-loader的做开发环境预编译。
8. 使用webpack的代码分割，压缩功能，将路由懒加载，tree-shaking去除无用代码。
9. 使用ssr渲染，服务端渲染。




