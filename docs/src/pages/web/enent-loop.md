# js 事件循环

## 调用栈 call stack
1. JavaScript是单线程的，这意味着它只有一个调用栈，一次只能做一件事。
2. 调用栈是一种后进先出的数据结构，用来存储在代码执行期间创建的所有函数。
3. 递归函数就是调用栈不断从上面添加新的函数，直到超出调用栈的最大限制或者有终止条件。
4. js从上往下执行代码，遇到带括号的函数，会将这个函数放到调用栈中。

## 调用栈过程描述
1. fun执行，调用栈中添加fun
2. console.log('fun执行')执行，调用栈中添加console.log('fun执行') 控制台输出'fun执行',然后console.log('fun执行')函数弹出，此时调用栈中只剩fun
3. foo1执行，调用栈中添加foo1，在fun上面。然后foo1上面压入console.log('foo1执行')，打印'foo1执行',然后console.log('foo1执行')弹出，此时调用栈中只剩foo1和fun。
4. foo2执行，调用栈中添加foo2，在foo1上面。然后foo2上面压入console.log('foo2执行')，打印'foo2执行',然后console.log('foo2执行')弹出，此时调用栈中只剩foo2,foo1和fun。
5. foo3执行，调用栈中添加foo3，在foo2上面。然后foo3上面压入console.log('foo3执行')，打印'foo3执行',然后console.log('foo3执行')弹出，foo3执行完毕，foo3弹出，此时调用栈中只剩foo2,foo1和fun。
6. foo2执行完毕，foo2弹出，此时调用栈中只剩foo1和fun。
7. foo1执行完毕，foo1弹出，此时调用栈中只剩fun。
8. fun执行完毕，fun弹出，此时调用栈为空。

```js
function foo3(){
  console.log('foo3执行')
}
function foo2(){
  console.log('foo2执行')
  foo3()
}

function foo1(){
  console.log('foo1执行')
  foo2()
}

function fun(){
  console.log('fun执行')
  foo1()
}
fun()
```
::: warning 注意
调用栈只能处理同步代码。异步操作（如 setTimeout）会被移到 ​​事件队列（Event Queue）​​，等调用栈清空后再执行。
:::

## 事件队列 Event Queue
1. 微任务队列（microtask queue）和宏任务队列（macrotask queue）以及渲染队列（Render Queue）​​ 构成了事件循环。
2. 异步任务的中转站:当遇到 setTimeout、Promise、DOM 事件等异步操作时，相关回调函数不会立即执行，而是被放入事件队列等待。
3. 先进先出（FIFO）​​：与调用栈的 LIFO 不同，事件队列按任务到达顺序处理（但微任务优先）。

## 微任务（microtask queue）
1. Promise.then、Promise.catch、Promise.finally、await 后面的代码。
2. MutationObserver（DOM 变动观察器）：dom 变动时的回调函数。
3. process.nextTick（Node 环境）：下一个事件循环迭代开始前执行的任务。
5. queueMicrotask（全局方法）：显示的将回调函数添加到微任务队列。

## 宏任务（macrotask queue）
1. setTimeout、setInterval（web api）。
2. Dom事件（如点击、滚动等）。
3. I/O（如文件读写、网络请求等）。
4. setImmediate（Node 环境）。
5. requestAnimationFrame（浏览器环境）：在下一次重绘之前执行的任务。
6. 主脚本:浏览器加载的 HTML 文档后同步执行的任务。

## 渲染队列（Render Queue）
1. 浏览器在每次事件循环结束时，会检查渲染队列是否有任务需要执行。如果有，则进行页面重绘或回流操作。
2. 渲染队列通常在微任务之后执行，以确保页面更新是基于最新的 DOM 和样式信息。

## 任务队列优先级
1. 微任务最高：每次调用栈清空后立即执行。
2. 渲染队列次之：穿插在微任务与宏任务之间。
3. 宏任务：微任务执行完毕后，等待下一次事件循环。

## [可视化理解工具](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)



