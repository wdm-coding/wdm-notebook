# JS 事件

## 1. 事件绑定
  1. dom.addEventListener(type,fn) 绑定事件 type:事件类型 fn:回调函数
  2. dom.removeEventListener(type,fn) 移除事件
  3. event.preventDefault() 阻止默认行为
  4. event.stopPropagation() 阻止事件冒泡
  5. event.target 获取事件源
  <img src="/assets/jsEvents/1.png" style="margin-top:15px">
  
## 2. 事件冒泡
  事件冒泡是从最内层元素开始，逐级向外传播的过程。
<div id="event-prop">
  <div id="event-prop1">
    event-prop1
    <p id="event-p">激活</p>
    <p id="event-p1">取消1</p>
    <p id="event-p2">取消2</p>
    <p id="event-p3">取消3</p>
  </div>
  <hr>
  <div id="event-prop2">
    event-prop2
    <p id="event-p4">取消4</p>
    <p id="event-p5">取消5</p>
  </div>
</div>

```js
const eventProp = document.getElementById('event-prop')
const eventP = document.getElementById('event-p')
const eventProp1 = document.getElementById('event-prop1')
const eventProp2 = document.getElementById('event-prop2')
eventP.addEventListener('click',(e)=>{
  event.stopPropagation() //阻止事件冒泡
  console.log('激活按钮-click',e.target)
})
eventProp.addEventListener('click',(e)=>{
  console.log('最外层-click',e.target)
})
eventProp2.addEventListener('click',(e)=>{
  event.stopPropagation() //阻止事件冒泡
  console.log('event-prop2-click',e.target)
})
```

## 3. 事件捕获
  事件捕获是从最外层元素开始，逐级向内传播的过程。
```js
  document.addEventListener('click', function(event) {
      // 在事件捕获阶段处理点击事件
      console.log('Document clicked during capturing phase!');
  }, true); // 第三个参数为true，表示在捕获阶段处理事件

  document.getElementById('myButton').addEventListener('click', function(event) {
      // 在目标元素上处理点击事件
      console.log('Button clicked!');
  }, false); // 第三个参数为false（默认），表示在冒泡阶段处理事件（但此处不影响捕获阶段）

  // 当点击ID为myButton的按钮时，首先会触发在document对象上注册的事件监听器（因为是在捕获阶段），然后才会触发在按钮本身上注册的事件监听器。
  1. 在现代浏览器中，大多数事件监听器默认是在事件冒泡阶段触发的，除非明确指定为在捕获阶段触发。
  2. 过度使用事件捕获可能会导致性能问题，因为每个经过的节点都有机会处理事件。
  3. 使用事件捕获时需要谨慎，以确保不会意外地阻止或修改事件的正常传播。
```
## 4. 事件代理
  事件代理（Event Delegation）是一种在JavaScript中处理DOM事件的常用技术，根据事件冒泡机制与event.target，它允许你将一个或多个子元素的事件监听器绑定到一个共同的父元素上，而不是直接将事件监听器绑定到每个子元素上。这样可以减少内存使用，提高性能，并简化代码管理。

<div>
  <div id="event-agent">
    <p>p1</p>
    <p>p2</p>
  </div>
  <div id="event-agent-btn" style="border:1px solid #fff">点击增加一个P标签</div>
</div>

```js
  // 事件代理
  const count = ref(2)
  const eventAgent = document.querySelector('#event-agent')
  eventAgent.addEventListener('click',(e)=>{
    if(e.target.tagName === 'P'){
      console.log('点击了p标签',e.target.innerText)
    }
  })
  const eventAgentBtn = document.querySelector('#event-agent-btn')
  eventAgentBtn.addEventListener('click',()=>{
    count.value++
    const p = document.createElement('p')
    p.innerText = `新增的P${count.value}标签`
    eventAgent.appendChild(p)
  })
```

<script setup>
  import { onMounted,ref } from 'vue'
  onMounted(()=>{
    // const eventProp = document.getElementById('event-prop')
    // const eventP = document.getElementById('event-p')
    // const eventProp1 = document.getElementById('event-prop1')
    // const eventProp2 = document.getElementById('event-prop2')
    // eventP.addEventListener('click',(e)=>{
    //   event.stopPropagation() //阻止事件冒泡
    //   console.log('激活按钮-click',e.target)
    // })
    // eventProp.addEventListener('click',(e)=>{
    //   console.log('最外层-click',e.target)
    // })
    // eventProp2.addEventListener('click',(e)=>{
    //   event.stopPropagation() //阻止事件冒泡
    //   console.log('event-prop2-click',e.target)
    // })

    // 事件代理
    const count = ref(2)
    const eventAgent = document.querySelector('#event-agent')
    eventAgent.addEventListener('click',(e)=>{
      if(e.target.tagName === 'P'){
        console.log('点击了p标签',e.target.innerText)
      }
    })
    const eventAgentBtn = document.querySelector('#event-agent-btn')
    eventAgentBtn.addEventListener('click',()=>{
      count.value++
      const p = document.createElement('p')
      p.innerText = `新增的P${count.value}标签`
      eventAgent.appendChild(p)
    })
  })
</script>