# Vue 原理

## 如何理解MVVM
1. MVVM是Model-View-ViewModel的缩写，它是一种基于前端开发的架构模式，主要用于构建用户界面。
2. MVVM模式将应用程序分为三个主要部分：模型（Model）、视图（View）和视图模型（ViewModel）。
3. 模型（Model）代表应用程序的数据和业务逻辑，它可以是任何类型的数据结构，如对象、数组等, 相当于vue的data。
4. 视图（View）是用户界面的呈现，它可以是HTML、CSS等前端技术构建的界面,相当于vue的template。
5. 视图模型（ViewModel）是连接模型和视图的桥梁，它负责将数据从模型转换为用户界面可以理解的格式，并将用户界面的操作转换为对模型的修改,相当于vue框架本身。
6. 数据驱动视图：当模型中的数据发生变化时，ViewModel会自动更新视图。
7. 组件化开发：MVVM框架通常支持组件化开发，可以将界面拆分成多个独立的视图和视图模型。

##  vue响应式原理
1. vue2.x使用的是`Object.defineProperty(target,key,value)`来实现响应式，vue3.x用的是Proxy。
2. Object.defineProperty深度监听需要递归到底，一次性计算量大，消耗性能，Proxy可以监听整个对象而非属性。
3. Object.defineProperty无法监听属性新增和删除，数组变化。
4. vue2.x通过拦截数组的7个变更方法来实现响应式,扩展数组原型来实现。
```js
/* 模拟vue的响应式原理，实现数据劫持和依赖收集*/

// 触发视图更新
function updateView(key){
  console.log(`${key}-视图更新`);
}
// 监听数据变化，更新视图
function defineReactive(target,key,value){
  observe(value);
  Object.defineProperty(target,key,{
    enumerable:true, // 可枚举
    configurable:true, // 可配置
    get(){
      return value;
    },
    set(newValue){
      if(value !== newValue){
        observe(newValue);
        // 设置新值是也要监听变化，深度监听
        value = newValue;
        updateView(key); // 视图更新
      }
    }
  })
}
// 重写数组的方法，监听数组变化
const oldArrayProto = Array.prototype; // 获取原始数组原型对象
const newArrayProto = Object.create(oldArrayProto); // 创建新数组原型对象，继承原始数组原型对象
['push','pop','shift','unshift','splice',''].forEach((method)=>{
  newArrayProto[method] = function(){
    // 调用原始数组方法
    oldArrayProto[method].call(this,...arguments);
    updateView(...arguments); // 视图更新
  }
})
// 遍历对象，监听每个属性变化
function observe(obj){
  if(typeof obj !== 'object' || obj === null) return
  if(Array.isArray(obj)){
    obj.__proto__ = newArrayProto; // 重写数组原型对象，监听数组变化
    return
  }
  Object.keys(obj).forEach((key)=>{
    defineReactive(obj,key,obj[key]);
  })
}
// 定义set方法，监听对象变化
function $set(target,key,value){
  defineReactive(target,key,value);
  updateView(key); // 视图更新
}
// 定义delete方法，监听对象变化
function $delete(target,key){
  delete target[key];
  updateView(key); // 视图更新
}
// 响应式数据对象
const data = {
  name:'wdm',
  age:18,
  info:{
    height:180,
    weight:70,
    desc:{
      a:1
    }
  },
  arr:[1,2,3]
}
// 监听数据变化
observe(data);

data.name = 'wdm2'; // 监听单个属性变化，视图更新
data.age = 19; // 监听单个属性变化，视图更新
data.info.height = 185; // 深度监听，视图更新
data.info.desc.a = 2; // 深度监听，视图更新
data.info = {
  height:190,
  desc:{
    a:10
  }
}
delete data.name;
data.arr.push(4); // 数组变化，视图更新
$set(data,'x',100)
$set(data.arr,1,100);
$delete(data.info.desc,'a')
```

## virtual dom 虚拟DOM
1. dom操作很耗性能，虚拟DOM就是用一个js对象来模拟真实dom。
2. 业务复杂度高，频繁的dom操作会导致页面卡顿，将更多的计算放在js层面，减少dom操作。
3. 虚拟DOM的更新策略是对比新旧虚拟DOM，找出差异，然后只对有变化的部分进行真实的dom操作。
4. snabbdom是虚拟DOM库，可以手动创建虚拟DOM对象，然后通过patch方法将新旧虚拟DOM进行对比，找出差异，然后只对有变化的部分进行真实的dom操作。
5. h函数是用来创建虚拟DOM对象的，它接收三个参数：标签名、属性对象和子节点数组。
6. vnode是虚拟DOM对象，它是一个包含标签名、属性对象和子节点数组的对象。
7. patch函数是用来将新旧虚拟DOM进行对比，找出差异，然后只对有变化的部分进行真实的dom操作的。
```js
// 导入snabbdom
import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';
// 初始化patch函数
const patch = init([]);
// 创建虚拟节点
const vnode = h('div#container', { class: { active: true } }, [
  h('h1', 'Hello Snabbdom'),
  h('p', 'This is a paragraph')
]);
// 挂载到真实DOM
const container = document.getElementById('app');
// 将虚拟节点挂载到真实DOM上
patch(container, vnode);
// 更新虚拟节点
const newVnode = h('div#container', { class: { active: true } }, [
  h('h1', 'Hello Snabbdomxxxx'),
  h('p', 'This is a new paragraph')
]);
// 更新后的虚拟节点
patch(vnode, newVnode);
```

## diff算法

### 时间复杂度O(n) 空间复杂度O(1)
1. 只比较同层级的节点，不考虑跨级操作。
2. tag不相同认为是不同的节点，直接删除重建，不再深度比较。
3. tag 和 key 都相同认为是相同的节点，不再深度比较。

### h函数
1. 创建虚拟DOM对象。
2. 接收三个参数：标签名、属性对象和子节点数组。
3. 返回一个vnode对象，包含标签名、属性对象和子节点数组。
```js
function h(tag, attrs = {}, children = []) {
  return vnode(
    tag, // 标签名，可以是字符串或vnode对象
    attrs, // 属性对象，可以是字符串或对象
    children, // 子节点数组，可以是字符串或vnode对象)
    el, // 真实DOM节点，只在patch函数中使用
    key // 唯一标识，只在patch函数中使用
  )
}
```

### patch函数
1. 将新旧虚拟DOM进行对比，找出差异，然后只对有变化的部分进行真实的dom操作。
2. 接收两个参数：旧虚拟DOM或Element和新的虚拟DOM。
3. 返回一个函数，该函数接收两个参数：旧虚拟DOM和新的虚拟DOM。
```js
function patch(oldVnode, newVnode) {
  // oldVnode如果是Element，则创建一个空的vnode对象，进行关联
  // 相同的vnode对象，则直接返回(key相同，tag相同)
  // 不同的vnode对象，则进行对比
  // updateChildren 两者的children对比
}
```
4. prepatch 钩子函数，在patch函数中调用，用于更新子节点。
5. updateChildren 函数，用于比较新旧虚拟DOM的子节点。
```js
function updateChildren(oldCh, newCh) {
  let oldStartIdx = 0; // 旧子节点的起始索引
  let newStartIdx = 0; // 新子节点的起始索引
  let oldEndIdx = oldCh.length - 1; // 旧子节点的结束索引
  let newEndIdx = newCh.length - 1; // 新子节点的结束索引
  // 夹逼算法，从两头向中间遍历
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 比较新旧子节点，进行移动或删除操作
  }
}
```

### diss 算法函数
1. patchVnode 函数，用于更新虚拟DOM。
2. addVnodes 函数，用于添加子节点。
3. removeVnodes 函数，用于删除子节点。
4. createElm 函数，用于创建真实DOM节点。
5. insertVnode 函数，用于插入真实DOM节点。
6. removeVnode 函数，用于删除真实DOM节点。
7. vnode 函数，用于创建虚拟DOM对象。
8. isSameVnode 函数，用于判断两个虚拟DOM对象是否相同。
9. updateChildren 函数，用于比较新旧虚拟DOM的子节点,key参数用于快速查找。

## 模版编译(组件渲染和更新过程是如何进行的？)
1. 模版编译是将模板字符串转换成渲染函数的过程。
2. js的with语句可以将对象中的属性直接赋值给变量，这样就可以在模板字符串中使用这些变量了。
```js
// with 改变自由变量作用域，将对象中的属性直接赋值给变量
const obj = { a: 1, b: 2 };
with (obj) {
  console.log(a); // 1
  console.log(b); // 2
}
```
3. vue-template-compiler 是vue的模版编译库(模版转js)，可以将模板字符串转换成渲染函数render。
4. render函数接收一个createElement函数作为参数，返回一个vnode对象。
```js
const compiler = require("vue-template-compiler")
// 编译模板字符串
const template = `<div id="app">{{message}}</div>`
with (this) {
	return _c("div", { attrs: { id: "app" } }, [_v(_s(message))])
}

_c 是 createElement 的缩写，_v 是 createTextVNode 的缩写
// 三元表达式
const template = `<div id="app">{{flag ? message :'no message'}}</div>`
with (this) {
	return _c("div", { attrs: { id: "app" } }, [_v(_s(flag ? message : "no message"))])
}
_s 是 toString 的缩写

// 嵌套元素
const template = `
    <div id="app" class="wrap">
      <img :src="imgSrc" alt="logo">
    </div>
`
with (this) {
	return _c(
    "div",
    { staticClass: "wrap", attrs: { id: "app" } },
    [
      _c(
        "img",
        { attrs: { src: imgSrc, alt: "logo" } }
      )
    ]
  )
}
// v-if v-else
  const template = `
  <div id="app" class="wrap">
    <p v-if="flag">显示</p>
    <p v-else>不显示</p>
  </div>
`
with (this) {
	return _c(
    "div",
    { staticClass: "wrap", attrs: { id: "app" } },
    [
      flag ? _c("p", [_v("显示")]) : _c("p", [_v("不显示")])
    ]
  )
}

// 循环列表元素
_l 是 renderList 的缩写，用于渲染列表
const template = `
    <div id="app" class="wrap">
      <ul>
        <li v-for="(item, index) in list">{{index}} - {{item}}</li>
      </ul>
    </div>
`
with (this) {
	return _c(
    "div",
    { staticClass: "wrap", attrs: { id: "app" } },
    [
      _c("ul", _l(list, function (item, index) {
        return _c("li", [_v(_s(index + " - " + item))])
      }))
    ]
  )
}

// 事件绑定
const template = `
    <div id="app" class="wrap">
      <button @click="handleClick">点击我</button>
    </div>
`
with (this) {
	return _c(
    "div",
    { staticClass: "wrap", attrs: { id: "app" } },
    [
      _c("button", { on: { click: handleClick } }, [_v("点击我")])
    ]
  )
}

// v-model 双向绑定
const template = `
    <div id="app" class="wrap">
      <input v-model="message"/>
    </div>
`
 with (this) {
  return _c(
    "div",
    { staticClass: "wrap", attrs: { id: "app" } },
    [
      _c("input", {
        directives: [{ name: "model", rawName: "v-model", value: message, expression: "message" }],
        domProps: { value: message },
        on: { input: function($event) { return message = $event.target.value }}
      })
    ]
  )
}
const { render, staticRenderFns } = compiler.compile(template)
```

## 组件渲染和更新过程是如何进行的？
1. vue-template-compiler 将模板字符串转换成渲染函数render。
2. 数据监听视图依赖属性：Vue 通过 Object.defineProperty 对数据进行劫持，当数据变化时，会触发 setter 方法，然后通知视图更新。
3. render 函数 生成vnode 虚拟节点。
4. patch 函数 把 vnode 渲染成真实 DOM 并挂载到页面上。
5. 数据变更，响应式拦截，重新渲染视图，生成新的 vnode，进行patch 函数和 diff 算法，更新视图。

<img src="/assets/vue/1.png" alt="vue-template">

## 异步渲染
Vue的异步渲染过程是其响应式系统的核心机制之一，主要涉及以下关键步骤：

### 1.‌依赖收集阶段‌：
1. 组件初始化时，Vue通过Object.defineProperty/Proxy建立数据响应式
2. 渲染函数执行时会触发属性的getter，将当前Watcher（渲染Watcher）添加到依赖列表中

### 2.‌派发更新阶段‌：
1. 当数据变化时触发setter，通知所有依赖的Watcher
2. Watcher不会立即执行更新，而是通过queueWatcher加入异步队列

### 3.‌异步队列处理‌：
1. Vue使用nextTick机制（优先Promise.then > MutationObserver > setImmediate > setTimeout）
2. 同一事件循环内的多次数据变更会被合并，避免重复渲染
3. 队列会在当前任务执行完毕后清空，执行所有Watcher的run方法

### 4.‌虚拟DOM对比‌：
1. 触发组件的重新渲染，生成新的VNode
2. 通过patch算法对比新旧VNode，计算出最小DOM操作

### 5.‌视图更新‌：
1. 将差异应用到真实DOM
2. 完成视图更新

## 前端路由的原理

### hash 模式
1. hash 方式：通过改变 URL 的 hash 部分来切换页面，不会导致浏览器向服务器发送请求。
2. hash变化触发网页跳转，浏览器的前进后退。
3. hash变化不会刷新页面，也不会向服务器发送请求。
```js
window.onhashchange = function(event) {
  const {oldURL,newURL} = event;
  console.log('oldURL',oldURL);
  console.log('newURL',newURL);
  console.log('hash',location.hash);
}
```

### history 模式
1. 原理：利用 HTML5 History API 来实现，通过 pushState 和 replaceState 方法来改变 URL。
2. 会导致浏览器向服务器发送请求，不会刷新页面。
3. 需要服务器配置支持，否则刷新页面时会404。(重定向到index.html页面)
4. 监听 popstate 事件来处理浏览器的前进后退。
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>history 模式解读</title>
  </head>
  <body>
    <div id="app"></div>
    <button id="btn">修改</button>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded', location.pathname);
        const app = document.getElementById('app');
        app.innerHTML = 'Hello Vue!';
      });
      document.getElementById('btn').addEventListener('click', function() {
        const state = {name:'page1'}
        console.log('切换路由到', 'page1');
        // history.pushState(state, '', 'page1'); // 修改地址栏路径，但不刷新页面
        history.replaceState(state, '', 'page1'); // 替换当前历史记录，但不刷新页面
      });
      // 监听浏览器前进后退事件
      window.onpopstate = (event)=>{
        console.log('onpopstate', event.state, location.pathname);
      }
    </script>
  </body>
</html>
```