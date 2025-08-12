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

 15.6-15.7