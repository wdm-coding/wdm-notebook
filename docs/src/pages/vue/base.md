# 面试题

## JS

### 1.event loop 事件轮询机制

    js是单线程的，在执行过程中会遇到同步任务和异步任务。
    同步任务会直接进入主线程，异步任务则会先在事件表中注册回调函数，等待时机成熟后，再进入主线程执行。
    事件轮询机制就是指主线程执行完同步任务后，会去检查异步任务的回调函数是否满足执行条件，如果满足则进入主线程执行。
    evevnt loop 就是事件轮询机制的实现方式。

::: warning
js如何执行？

    1.从前到后，一行一行执行。

    2.如果某一行报错，则停止执行。

    3.先执行同步任务，再执行异步任务。
:::

```js
console.log(1)

setTimeout(()=>{
    console.log(2)
},1000)

console.log(3)

1.先执行第一行代码 进入调用栈 打印1后，清空调用栈 执行下一行代码
2.执行setTimeout函数 进入调用栈后，1秒后将回调函数放入事件表，等待时机成熟后执行，清空调用栈 执行下一行代码。
3.执行最后一行代码 进入调用栈 打印3后，清空调用栈。
4.调用栈为空，同步代码执行完毕，启动evlen loop, 循环检查事件表，发现setTimeout的回调函数满足执行条件，进入调用栈 打印2后，清空调用栈。

```
::: warning
  setTimeout,ajax,DOM事件，Promise等都算是异步任务,都是基于event loop实现的。
:::

### 2.Promise 如何实现
    三个状态：pending,fulfilled,rejected
    两个方法：then,catch
    状态一旦改变，就不会再变。
    padding状态不会触发then,catch方法

    then正常返回一个resolve状态的promise对象，除非有错误抛出，则会返回一个reject状态的promise对象
    catch正常返回一个resolve状态的promise对象，除非有错误抛出，则会返回一个reject状态的promise对象

    resolve状态的promise对象会触发后续then方法，执行回调函数
    reject状态的promise对象会触发后续catch方法，执行回调函数
<div>
  <hr/>
  <n-button type="primary" @click="startHandle">开始执行</n-button>
  <p>{{status}}</p>
  <img id="base" src="" alt=""/>
</div>

<script setup>
  import { ref } from 'vue'
  const status = ref('')
  // 加载图片
  function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
      // padding状态，等待图片加载完成
      status.value = 'padding'
      const image = new Image()
      image.onload = () => {
        status.value = 'resolve'
        resolve(image)
      } // resolve状态，图片加载成功
      image.onerror = () => {
        status.value = 'reject'
        reject(new Error('图片加载失败'))
      } // reject状态，图片加载失败
      image.src = url
    })
  }
  
  const startHandle = () => {
    const url = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
    const result = loadImageAsync(url)
    result.then(res => {
      console.log('图片加载成功1', res)
      const img = document.getElementById('base')
      img.src = res.src
      return res.src
    }).then(res => {
      console.log('图片加载成功2', res)
    }).catch(err => {
      console.error('图片加载失败', err)
    })
  }

  async function async () {
    const url = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
    const img1 = await loadImageAsync(url)
    console.log('图片加载成功3', img1)
    const img2 = await loadImageAsync(url)
    console.log('图片加载成功4', img2.width, img2.height)
  }

  // async function async1() {
  //   console.log('async1 start') // 2
  //   await async2()
  //   // await 下面的代码相当于异步回调中的代码，即为异步
  //   console.log('async1 end')//5
  //   await async3()
  //   console.log('async3 end')//7
  // }
  // async function async2() {
  //   console.log('async2')// 3
  // }
  // async function async3() {
  //   console.log('async3')// 6
  // }
  // console.log('script start') // 1
  // async1()
  // console.log('script end') //4
</script>

### 3.async/await 如何实现
    1.异步回调
    2.Promise then catch 链式调用
    3.async/await 语法糖是同步写法，本质上是Promise then catch 链式调用

**async/await 和 Promise的关系**
::: info
  + async/await消灭了then catch的链式调用，让异步代码看起来像同步代码。
  + async/await是基于Promise实现的。相互不互斥
  + 执行async函数会返回一个Promise对象，await相当于then方法，返回的为resolve状态的promise对象的value。
  + try catch捕获异常，相当于Promise的catch方法。
:::

**异步的注意事项**
::: danger
  + await 下面的代码相当于异步回调中的代码，即为异步，需要放在事件表中等待时机成熟后执行。
:::
```js
async function async1() {
  console.log('async1 start') // 2
  await async2()
  // await 下面的代码相当于异步回调中的代码，即为异步
  console.log('async1 end')//5
  await async3()
  console.log('async3 end')//7
}
async function async2() {
  console.log('async2')// 3
}
async function async3() {
  console.log('async3')// 6
}
console.log('script start') // 1
async1()
console.log('script end') //4
```


### 4.循环语句和异步的关系
  + for...in，forEach,这些循环语句都是同步的，不会等待异步任务执行完毕。
  + for...of这些循环语句是异步的，会等待异步任务执行完毕。

  forEach 本身并不支持异步操作。当您在 forEach 的回调中使用 await 时，它实际上是在等待异步操作完成，但这并不会改变 forEach 的同步执行性质。
  因此，尽管每个元素的异步操作都会等待完成后再继续，但 forEach 不会等待所有异步操作都完成后再继续执行后面的代码。这意味着在 forEach 循环之后立即执行的代码可能会在异步操作完成之前就开始执行。

  当您使用 await 关键字在 for...of 循环中时，循环会暂停执行，直到 await 的表达式完成，然后继续下一次迭代。
  这意味着 for...of 循环会按照顺序依次处理数组中的每个元素，并且会等待每个元素的异步操作完成后再继续处理下一个元素。
  因此，使用 for...of 循环可以确保所有的异步操作都按顺序完成后再继续执行后面的代码。
```js
<script>
  function muti(num){
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve(num*num)
      },1000)
    })
  }
  const nums = [1,2,3,4]

  nums.forEach(async num=>{
    const res = await muti(num)
    console.log('forEach',res) // 不会等待异步任务执行完毕
  })
  for (let num in nums) {
    const res = await muti(num)
    console.log('for...in',res) // 会等待异步任务执行完毕
  }
  for (let num of nums) {
    const res = await muti(num)
    console.log('for...of',res) // 会等待异步任务执行完毕
  }
</script>
```
### 5.宏任务和微任务









