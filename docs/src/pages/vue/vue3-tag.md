# Vue3 10 个常见操作

## 浅层响应式 API：shallowRef

1. 在 Vue3 中，shallowRef 是一个用于创建浅层响应式引用的工具。与普通的 ref 不同，shallowRef 只会追踪其引用值变化，而不会深入到对象的内部属性。
2. 这在处理复杂对象时非常实用，尤其当你不需要对象内部属性具有响应性时，可以显著提升性能。

```js
import { shallowRef } from 'vue';
const data = shallowRef({ name: 'Vue', version: 3 });
```
## 数据保护利器：readonly 和 shallowReadonly
1. readonly 和 shallowReadonly 用于保护数据不被意外修改。readonly 会将一个响应式对象转换为完全只读的对象，任何修改操作都会报错。
2. shallowReadonly 则只将对象的顶层属性设置为只读，嵌套对象的属性仍可以被修改。

```js
import { readonly, shallowReadonly, reactive } from 'vue';
const userData = reactive({ name: 'User', details: { job: 'Developer' } });
const lockedUserData = readonly(userData); // 完全只读
const shallowLockedData = shallowReadonly(userData); // 浅层只读
```
## 自动追踪依赖：watchEffect（含停止、暂停、恢复操作）
1. watchEffect 是一个强大的响应式 API，它可以自动追踪响应式数据的依赖，并在依赖变化时重新执行副作用函数。
2. 与 watch 不同，它不需要显式指定依赖项，非常适合用于数据同步和副作用管理。
3. 停止、暂停和恢复侦听器：
```js
import { ref, watchEffect } from'vue';
const count = ref(0);
const { stop, pause, resume } = watchEffect(() => {
console.log('count changed:', count.value);
});

// 暂停侦听器
pause();

// 稍后恢复
resume();

// 停止侦听器
stop();
```
## 性能优化神器：v-memo
1. v-memo 是 Vue3 中用于优化列表渲染性能的指令。它允许你在模板中缓存列表项的渲染，只有当指定的依赖项发生变化时，才会重新渲染列表项。
2. 这对于频繁更新的长列表来说，性能提升非常显著。

```html
<template>
  <ul>
    <li v-for="item in list" :key="item.id" v-memo="[item.id, item.title]">
      {{ item.title }} - {{ item.content }}
    </li>
  </ul>
</template>
```
## 简化组件双向绑定：defineModel()
1. defineModel() 是 Vue3.4 中引入的一个新 API，旨在简化父子组件之间的双向绑定。
2. 它允许组件直接操作父组件传递的 v-model 数据，而无需显式地定义 props 和 emits。

```html
<!-- 基本使用： -->
<!-- 父组件 -->
<template>
  <div>
    <CustomComponent v-model="userName" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import CustomComponent from './CustomComponent.vue';
const userName = ref('前端开发爱好者');
</script>
<!-- 子组件 -->
<template>
  <input type="text" v-model="modelValue" />
</template>

<script setup>
const modelValue = defineModel();
</script>
<!-- 带参数/定义多个 v-model： -->

<!-- 父组件 -->
<template>
  <div>
    <CustomComponent
      v-model="userName"
      v-model:title="title"
      v-model:subTitle="subTitle"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomComponent from './CustomComponent.vue';

const userName = ref('前端开发爱好者');
const title = ref('前端开发爱好者_title');
const subTitle = ref('前端开发爱好者_subTitle');
</script>
<!-- 子组件 -->
<template>
  <input type="text" v-model="modelValue" />
  <input type="text" v-model="title" />
  <input type="text" v-model="subTitle" />
</template>

<script setup>
  const modelValue = defineModel();
  const title = defineModel('title');
  const subTitle = defineModel('subTitle');
</script>
```

## 顶层 await：简化异步操作
1. Vue3 支持顶层 await，这意味着你可以在模块顶层使用 await，而无需将其包裹在异步函数中。
2. 这对于需要在模块加载时执行异步操作的场景非常有用。

```js
<script setup>
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  };
  const data = await fetchData();
</script>
```

## 高级用法：异步组件
异步组件是一种可以延迟加载组件的技术，可以提高性能。
```html
<template>
  <div>
    <button @click="loadComponentA">Load Component A</button>
    <button @click="loadComponentB">Load Component B</button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { ref } from'vue';

const currentComponent = ref(null);

const loadComponentA = async () => {
const component = await import('./ComponentA.vue');
  currentComponent.value = component.default;
};

const loadComponentB = async () => {
const component = await import('./ComponentB.vue');
  currentComponent.value = component.default;
};
</script>
```
## 空间传送门：Teleport
1. Teleport 是 Vue3 中用于将组件的内容渲染到指定的 DOM 节点中的 API。
2. 它可以帮助你解决弹窗、下拉菜单等组件的层级和样式问题。
```html
<template>
  <button @click="showModal = true">Open Modal</button>
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <h2>Modal</h2>
      <button @click="showModal = false">Close</button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
const showModal = ref(false);
</script>
```
隐形容器：Fragment
Vue3 中的 Fragment 允许你在模板中没有根节点，减少多余的 DOM 节点，提升渲染性能。这对于列表组件来说非常有用。

<template>
  <template v-for="item in list" :key="item.id">
    <h2>{{ item.title }}</h2>
    <p>{{ item.content }}</p>
  </template>
</template>

<script setup>
import { ref } from 'vue';
const list = ref([{ id: 1, title: 'Title 1', content: 'Content 1' }]);
</script>

## 自定义指令：封装可重用逻辑（v-debounce 实现）
自定义指令是 Vue3 中用于封装可重用逻辑的工具，例如防抖功能。
### 以下是如何创建一个防抖指令 v-debounce。
```js
import { createApp } from'vue';
const app = createApp({});
// 注册自定义指令v-debounce
app.directive('debounce', {
  mounted(el, binding) {
    let timer;
    // 给 el 绑定事件，默认 click 事件
    el.addEventListener(binding.arg || 'click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      // 回调函数延迟执行
      timer = setTimeout(() => {
        binding.value();
      }, binding.modifiers.time || 300);
    });
  }
});
app.mount('#app');
```
```html
<template>
  <!-- 300毫秒内多次点击只会执行一次 -->
  <button v-debounce:click.time="500" @click="fetchData">请求数据</button>
</template>

<script setup>
import { ref } from 'vue';

const fetchData = () => {
      console.log('执行数据请求');
    };
</script>
```
