---
outline: deep
---
<Auth></Auth>
# 响应式 API


## 1. ref()

ref 函数用来创建基本数据类型的响应式数据。
<div class="vue3_api_wrap">
  <n-button type="primary" @click="changeRef">点击</n-button> 
  <span style="padding-left:30px;font-size:18px">{{ a }}</span>
</div>

```js
const  a = ref(0)
function changeRef() {
  a.value++
}
```
## 2. reactive()

reactive 函数用来创建响应式对象。

<div class="vue3_api_wrap">
  <n-button type="primary" @click="changeReactive">修改reactive对象属性</n-button> 
  <div style="margin-top:15px">
    <p style="font-size:18px">name:{{ state.name }}</p>
    <p style="font-size:18px">age:{{ state.age }}</p>
    <p style="font-size:18px">sex:{{ state.sex }}</p>
  </div>
  <n-button type="primary" @click="changeState">修改整个reactive对象</n-button>
  <p>{{state}}</p>
  <n-alert title="错误" type="error">
    无法直接修改整个对象
  </n-alert>
  <br>
  <h2>ref 与 reactive 的区别</h2>  
  <n-button type="primary" @click="changeRefObj">修改整个ref对象</n-button>
  <p>ref创建的对象: {{c}}</p>
  <p>reactive创建的对象: {{state}}</p>
  <n-alert title="注意" type="warning">
    1. ref创建的对象可以修改整个对象
    <br>
    2. ref创建的对象.value后也是一个proxy代理的对象
    但与reactive创建的对象不是同一个对象
    <br>
    3. c.value 是 ref 返回的对象的 .value 属性所指向的对象，而 state 是 reactive 返回的原始对象的代理。
    两个对象即使具有完全相同的结构和属性值，在严格相等性比较（===）时也不会相等，因为它们不是同一个对象的引用。
    <br>
    4. 如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。
  </n-alert>
</div>

```js
let state = reactive({ name: 'wdm',age:'100',sex:'男' })
let c = ref({ name: 'wdm',age:'100',sex:'男' })
function changeReactive() {
  state.name = 'wdm1'
  state.age = '102'
  c.value.name = 'wdm-c'
}
function changeState() {
  state = {}
}
function changeRefObj() {
  c.value = {}
}
```

## 3. readonly

readonly 是一个用于创建只读响应式引用的函数。

readonly 函数接受一个对象或数组作为参数，并返回一个只读的响应式代理。这个代理对象在外观上看起来和原始对象或数组相同，但它会拦截任何尝试修改其属性或元素的操作，并阻止这些修改。

<div>
  <n-button type="primary" @click="changeReadonly">修改Readonly对象属性</n-button> 
  <p style="font-size:18px">{{ readonlyState.name }}</p>
  <n-alert title="注意" type="warning">
    控制台提示：Set operation on key "name" failed: target is readonly.
  </n-alert>
</div>

```js
let state = reactive({ name: 'wdm',age:'100',sex:'男' })
const readonlyState = readonly(state)

function changeReadonly() {
  readonlyState.name = 'wdm-Readonly'
}

```
## 4. toRefs() 与 toRef()
toRefs 用于将响应式对象中的所有属性转换为响应式引用的集合。

toRefs 接收一个响应式对象作为参数，并返回一个对象，该对象的每个属性都是指向原始对象相应属性的响应式引用（ref）。这些响应式引用与原始对象的属性保持同步，但是它们是独立的响应式引用，可以被解构或单独传递给组件的 props，而不会丢失响应性。

toRef 用于将响应式对象中的单个属性转换为响应式引用。

toRef 接收两个参数：一个响应式对象和一个字符串（表示该对象中要转换为响应式引用的属性名）。
<div>
  <n-button type="primary" @click="changeToRefs">修改toRefs对象属性</n-button> 
  <p style="font-size:18px">toRefsState.name = {{ toRefsState.name }}</p>
  <p style="font-size:18px">toRefsState.age = {{ toRefsState.age }}</p>
  <p style="font-size:18px">name = {{ name }}</p>
  <p style="font-size:18px">age = {{ age }}</p>
  <p style="font-size:18px">state.name = {{ toRefsState.name }}</p>
  <p style="font-size:18px">state.age = {{ toRefsState.age }}</p>
</div>
<div>
  <n-button type="primary" @click="changeToRef">修改toRef对象</n-button> 
  <p style="font-size:18px">toRefStateUnit = {{ toRefStateUnit }}</p>
  <p style="font-size:18px">state = {{ state }}</p>
  <p style="font-size:18px">state.unit = {{ state.unit }}</p>
</div>
<n-alert title="toRef 与 toRefs 的区别" type="info">
  toRef 可以新增原始对象上没有的属性，而toRefs不能
</n-alert>

```js
let state = reactive({ name: 'wdm',age:'100',sex:'男' })
const toRefsState = toRefs(state)
const {name,age} = toRefsState
function changeToRefs() {
  name.value = 'wdm-toRefs'
  age.value = '103'
}

const toRefStateUnit = toRef(state,'unit')
function changeToRef() {
  toRefStateUnit.value = '属性-unit变化'
}
```


<script setup>
  import { ref,reactive,readonly,toRefs,toRef } from 'vue'
  const  a = ref(0)
  let state = reactive({ name: 'wdm',age:'100',sex:'男' })
  let c = ref({ name: 'wdm',age:'100',sex:'男' })
  function changeRef() {
    a.value++
  }
  function changeReactive() {
    state.name = 'wdm1'
    state.age = '102'
    c.value.name = 'wdm-c'
  }
  function changeState() {
    state = {}
  }
  function changeRefObj() {
    c.value = {}
  }
  const readonlyState = readonly(state)
  function changeReadonly() {
    readonlyState.name = 'wdm-Readonly'
  }
  const toRefsState = toRefs(state)
  const {name,age} = toRefsState
  function changeToRefs() {
    name.value = 'wdm-toRefs'
    age.value = '103'
  }
  const toRefStateUnit = toRef(state,'unit')
  function changeToRef() {
    toRefStateUnit.value = '属性-unit变化'
  }
</script>