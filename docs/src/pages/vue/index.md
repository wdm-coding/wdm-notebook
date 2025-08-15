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