## 从输入url 到 渲染出页面的整个过程
1. 加载资源的形式：html文件，css样式表，js脚本，图片，视频等资源
2. 加载资源的过程
+ DNS解析：将域名转换为IP地址的过程
+ 浏览器根据IP地址向web服务器发送http请求
+ 服务器处理请求，返回响应结果

3. 渲染页面的过程
+ 浏览器解析html代码，构建DOM树
+ 浏览器解析css代码，构建CSSOM树
+ 浏览器将DOM树和CSSOM树合并，构建渲染树Render Tree
+ 遇到script标签，浏览器会停止构建渲染树Render Tree树，执行js代码，然后再继续构建DOM树
+ 直至构建完成渲染树Render Tree，浏览器开始布局（Layout），计算每个节点的位置和大小

## window.onload 和 DOMContentLoaded 的区别
+ 两者都是用来等待页面加载完成的，但是触发时机不同
+ window.onload 是在页面加载完成，包括图片、视频等资源全部加载完成后触发
+ DOMContentLoaded 是在DOM树构建完成后触发，不包括图片、视频等资源

## 性能优

### 空间换时间原则：
1. 原则：多使用内存或缓存。
2. 减少CPU计算量，减少网络加载耗时。
3. 加载更快，渲染更快

### 加载更快
1. 减少资源体积，压缩资源
2. 减少访问次数，合并资源，ssr服务端渲染，缓存资源
3. 使用更快的网络，CDN加速

### 渲染更快
1. css放在头部，js放在底部
2. 尽早执行js，domContentLoaded触发后立即执行,没必要等待onload
3. 懒加载
4. 对DOM查询进行缓存
5. 频繁操作DOM，合并到一起插入
6. 节流防抖

### 缓存
1. 静态资源加hash后缀，根据文件内容计算hash值，内容改变时，hash值改变，文件名改变，浏览器会重新加载资源，触发http缓存机制304。
2. cdn
3. ssr服务端渲染
4. 懒加载：先加载预览图，等出现在可视区域时，再加载高清图

### 防抖 debounce
1. 监听一个输入框的输入事件，在事件触发时执行一个函数。
2. 每次操作延迟一段时间后才执行，如果在这个时间内再次触发事件，则会取消之前的延时调用。
```js
function debounce(fn,delay = 500){
  let timer = null
  return function(){
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```

### 节流 throttle
拖拽场景下，无论拖动速度多快，都会在固定时间间隔内只执行一次。

```js
function throttle(fn,delay = 500){
  let timer = null
  return function(){
    if(timer) return
    timer = setTimeout(()=>{
      fn.apply(this, arguments)
      timer = null
    },delay)
  }
}
```

## web安全

### XSS 跨站脚本攻击
1. 存储型XSS：将脚本代码提交到服务器，然后再请求页面时执行。
2. 反射型XSS：将脚本代码作为请求的一部分，服务器解析后返回。
3. DOM型XSS：通过修改页面DOM结构，执行脚本。

预防措施：
1. 对输入内容进行转义 替换特殊字符 `<script> 为 &lt;script&gt`;
2. 设置cookie的httpOnly属性，防止js读取cookie。

### XSRF 跨站请求伪造
1. 攻击者诱导用户访问恶意网站或点击恶意链接，利用用户在目标网站的已登录状态发起请求。
2. img标签的src属性，可以发起get请求。

预防措施：
1. 验证请求的来源，检查Referer字段。
2. 验证码
3. 随机token，每次请求携带一个随机生成的token，服务器验证token是否正确。
4. post请求

## 变量提升

1. 变量提升：在函数中，使用var声明的变量会被提升至函数的顶部。
2. 函数提升：在全局作用域中，使用function声明的函数会被提升至代码的最顶部。
3. 块级作用域：使用let和const声明的变量不会被提升，只能在声明所在的代码块中使用。(for循环中，let声明的变量只在循环体内有效)
4. const声明的是常量，一旦声明就不能再被赋值。
5. 暂时性死区：在let和const声明变量之前，该变量的引用会抛出错误。
```js
// es5 中会将变量的声明提升至顶部，但是赋值不会被提升。
console.log(a) // undefined 
var a = 10
console.log(a) // 10

// es6 
console.log(b) // ReferenceError: b is not defined
let b = 10
console.log(b) // 10
```

## 强制类型转换
1. paresInt() 字符串转数字
2. paresFloat() 字符串转浮点数
3. toSring() 数字转字符串

## 隐式类型转换
1. if语句中，会将非布尔值转换为布尔值
2. 加号（+）会将字符串转换为数字
3. 比较运算符（==）会将不同类型的值转换为相同的类型

## 深度比较
```js
function isEqual(obj1,obj2){
  if(typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2
  if(obj1 === obj2) return true
  if(Object.keys(obj1).length !== Object.keys(obj2).length) return false
  for(let key in obj1){
    if(!obj1.hasOwnProperty(key)) return false
    // 递归比较每个属性值
    const res = isEqual(obj1[key],obj2[key])
    if(!res) return false
  }
  return true
}
```

## 数组的常用方法
1. 数组的常用方法有：push()、pop()、shift()、unshift()、slice()、splice()、concat()、join()、reverse()、sort()等。
2. 数组的遍历方法有：forEach()、map()、filter()、reduce()等。
3. 数组的查找方法有：indexOf()、lastIndexOf()、find()、findIndex()等。
4. pop() 删除数组的最后一个元素，并返回该元素。
5. shift() 删除数组的第一个元素，并返回该元素。
6. unshift() 在数组的开头添加一个或多个元素，并返回新的长度。
7. push() 在数组的末尾添加一个或多个元素，并返回新的长度。
8. slice() 返回一个新数组，包含从开始到结束（不包括结束）的数组元素。是一个纯函数，不会改变原数组。arr.slice([start[, end]])
9. splice() 通过删除现有元素和/或添加新元素来更改一个数组的内容。array.splice(start, deleteCount, item1, item2, ...)
10. reverse() 颠倒数组中元素的顺序。返回颠倒后的数组。
11. sort() 对数组的元素进行排序，并返回数组。
12. concat() 用于合并两个或多个数组。此方法不会改变现有的数组，而仅仅会返回被合并数组的一个副本。是一个纯函数，不会改变原数组。

## `[10,20,30].map(parseInt)` 输出什么
```js
// parseInt(string, radix) 第二个参数是进制数(2-36之间)，如果省略或为0，JavaScript会根据字符串前缀自动判断
[10,20,30].map((item,index)=>parseInt(item,index)) // [10, NaN, NaN]
```

## 闭包
1. 闭包的变量不会被垃圾回收机制回收
2. 闭包可以访问到函数外部的变量
3. 闭包可以封装私有变量

## 如何减少DOM操作
1. 缓存DOM查询结果
2. 使用DocumentFragment进行批量DOM操作
3. 避免频繁的DOM操作，合并到一起插入

## jsonp 为什么不是真正的ajax
1. 只能实现get请求
2. 不是xhr请求，而是动态创建script标签
3. 只能实现跨域请求

## 函数声明和函数表达式的区别
1. 函数声明会被提升至顶部，而函数表达式不会被提升。
2. 函数声明可以命名，而函数表达式必须使用变量来引用。

## new Object() 和 Object.create() 的区别
1. 都是创建对象的方法
2. new Object() 创建一个空对象，相当于{},然后通过原型链继承Object的属性和方法
3. Object.create() 创建一个新对象，指定一个对象作为原型

## new 关键字做了什么
1. 创建一个空对象
2. 将空对象的__proto__指向构造函数的prototype
3. 将构造函数的this指向这个空对象
4. 执行构造函数，将构造函数的属性添加到这个空对象上
5. 返回这个空对象

## trim() 方法
```js
String.prototype.trim = function(){
  return this.replace(/^\s+|\s+$/g, '')
}
```

## 获取多个数字中的最大值
```js
Math.max(...[1,2,3]) // 3
// 或者使用apply方法
Math.max.apply(null,[1,2,3]) // 3
function max(...args){
  const nums = Arrat.slice(0,args.length)
  let max = 0
  nums.forEach(item=>{
    if(item>max){
      max = item
    }
  })
  return max
}
```

## 如何用js实现继承
1. class继承 extends 关键字 继承父类的属性和方法
2. prototype继承 原型链继承 子类的prototype指向父类的实例

## 如何捕获js中的异常
1. 捕获全局异常 window.addEventListener('error', function(e){})
2. 捕获单个异常 try...catch

## 解析URL参数
1. location.search 获取URL中的查询字符串
2. new UrlSeachParams 对象 的 get 方法

## requstAnimationFrame
1. 浏览器会在下一次重绘之前调用指定的回调函数更新动画
2. 可以在回调函数中更新动画状态，并再次调用requestAnimationFrame
3. 浏览器会自动优化动画性能，例如在浏览器标签不可见时暂停动画。
4. 浏览器根据屏幕刷新率自动调整动画的帧数，通常是60fps