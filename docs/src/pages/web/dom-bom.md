# DOM-BOM
<p style="font-weight:600;color:red">JS WEB DOM API,网页元素操作的API，执行W3C标准</p>
<p style="font-weight:600;color:red">Document Object Model (文档对象模型)</p>
<p style="font-weight:600;color:red">Browser Object Model (BOM浏览器对象)</p>

## 1.DOM本质
  1. XML（可扩展标记语言）和HTML（超文本标记语言）
  2. DOM是针对HTML和XML文档的一个API（应用程序编程接口）。它提供了独立于平台和语言的方式，允许程序和脚本动态地访问和更新文档的内容、结构以及样式。
  3. DOM将整个页面抽象为一组分层节点。HTML或XML页面的每个部分都是一种类型的节点，拥有各自的属性和方法。DOM描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分而不用重新加载整个页面。
## 2.DOM节点操作
  1. 创建节点
    - document.createElement(tagName) 创建元素节点
    - document.createTextNode(text) 创建文本节点
    - document.createAttribute(name) 创建属性节点
  2. 添加节点
    - appendChild(node) 添加子节点
    - insertBefore(newNode,referenceNode) 添加兄弟节点
    - replaceChild(newNode,oldNode) 替换节点
    - append(node) 添加子节点 在最后添加子节点
    - prepend(node) 添加子节点 在前面添加子节点
    - before(node) 添加兄弟节点 在前面添加兄弟节点
    - after(node) 添加兄弟节点 在后面添加兄弟节点
    - replaceWith(node) 替换节点
    - remove() 移除节点
  3. 查找节点
    - document.getElementById(id) 返回匹配的元素节点 
    - document.getElementsByTagName(tagName) 返回匹配的元素节点列表
    - document.getElementsByClassName(className) 返回匹配的元素节点列表
    - document.querySelector(selector) 返回第一个匹配的元素节点
    - document.querySelectorAll(selector) 返回所有匹配的元素节点列表
    - parentNode 父节点 
    - childNodes 子节点列表
    - firstChild 第一个子节点
    - lastChild 最后一个子节点

**节点属性操作**

<div>
  <p class="dom_p">1</p>
  <p class="dom_p">2</p>
  <p class="dom_p">3</p>
  <p class="dom_p">4</p>
</div>

::: warning
1.property 对象属性
2.attributes html属性集合
:::

```js
const pList = document.querySelectorAll('.dom_p')
const p1 = pList[0]
p1.style.color = 'red'
p1.style.width = '200px'
// property 对象属性
console.log('p1-style-width:', p1.style.width) // 200px
console.log('p1-className:', p1.className) // dom_p
console.log('p1-nodeName:', p1.nodeName) // P
console.log('p1-nodeType:', p1.nodeType) // 1 nodeType: 元素节点
console.log('p1-nodeValue:', p1.nodeValue) // null 文本节点才有nodeValue值
console.log('p1-textContent:', p1.textContent) // 1 文本内容
// attributes html属性集合
p1.setAttribute('id', 'p1')
p1.setAttribute('value', '666')
const className = p1.getAttribute('class')
console.log('p1-attributes:', p1.attributes) // NamedNodeMap {0: class="dom_p", 1: id=""}
console.log('p1-className:', className)
```
**节点结构操作**
<div class="dom-handler"> 

</div>
<div class="dom-move" style="border:1px solid #fff;height:auto"> 
  <p class="move-p1">dom-move中的p1</p>
  <p>dom-move中的p2</p>
</div>

```js
    const root = document.querySelector('.dom-handler')
    // 新建节点
    const p = document.createElement('p')
    // 新建文本节点
    const textNode = document.createTextNode('新建的P标签')
    // 添加子节点
    root.appendChild(p)
    // 添加文本内容
    p.appendChild(textNode)
    // 移动节点
    const moveP = document.querySelector('.move-p1')
    root.appendChild(moveP)
    console.log(root);
    // 获取父元素
    console.log('获取父元素',p.parentNode);
    // 获取子元素
    console.log('获取子元素',root.childNodes);
```
## 3.DOM 性能优化
  1. 减少DOM操作次数
  2. 使用DocumentFragment进行批量DOM操作， DocumentFragment 是一个轻量级的文档片段，它存在于内存中，并不属于DOM树的一部分。它可以包含任意数量的节点，但不会在页面上显示出来，直到它被添加到DOM树中。使用DocumentFragment可以减少多次插入节点时的重绘和回流操作，从而提高性能。

  ```js
    <div id="container"></div>
    // 创建DocumentFragment
    let fragment = document.createDocumentFragment();
    // 创建并配置节点
    for (let i = 0; i < 1000; i++) {
        let div = document.createElement('div');
        div.textContent = `这是一个div，编号：${i + 1}`;
        fragment.appendChild(div);
    }
    // 将DocumentFragment添加到DOM树中
    let container = document.getElementById('container');
    container.appendChild(fragment);
  ```

  3. 避免使用innerHTML，尽量使用textContent或innerText。innerHTML 会导致浏览器重新解析HTML字符串，并重建DOM树。这会导致性能问题，特别是在处理大量数据或频繁更新时。相比之下，textContent和innerText只是简单地获取或设置文本
  4. 使用事件委托（Event Delegation）来处理多个元素的事件。 事件委托是一种技术，允许你将一个事件监听器绑定到一个父元素上，而不是直接绑定到每个子元素。当事件发生时，你可以通过事件的target属性来确定是哪个具体的子元素触发了事件，并相应地处理它。这样可以减少DOM操作的数量，提高性能。
  5. 使用requestAnimationFrame来进行动画效果 ，requestAnimationFrame 方法告诉浏览器你希望执行一个动画，并请求浏览器在下一次重绘之前调用指定的函数来更新动画。这可以确保你的动画与浏览器的渲染流程同步，从而提高性能和流畅度。特别是在处理复杂的动画效果时，使用requestAnimationFrame可以避免不必要的重绘和回流，从而提高页面的响应速度和平滑度。
  6. DOM查询做缓存
  <img src="/assets/web-dom/1.png" style="margin-top:15px">
  <img src="/assets/web-dom/2.png" style="margin-top:15px">

::: warning
1. 回流：页面布局改变，视觉属性不变。当DOM的几何属性发生变化时，浏览器会重新计算元素的布局。例如，改变元素的大小、位置或隐藏/显示一个元素等操作都会导致回流。
2. 重绘：页面外观改变，布局不变。当DOM的视觉属性发生变化时，浏览器会重新绘制元素。例如，改变元素的背景色、边框或字体大小等操作都会导致重绘。
:::

## 4.BOM操作
1. navigator 对象提供了关于浏览器和用户代理的信息。例如，它可以用来检测浏览器的类型、版本号以及是否启用了某些功能等。
2. location 对象提供了当前页面的URL信息，包括协议、主机名、端口号、路径和查询字符串等。你可以使用它来获取或设置当前页面地址的各个部分。
3. screen 对象提供了关于用户屏幕的信息，例如分辨率、颜色深度等。
4. history 对象允许你操作浏览器的历史记录，例如前进、后退或访问特定的历史条目。
5. window 对象是BOM的核心，它代表了浏览器窗口。你可以使用它来访问浏览器的各种功能，例如打开新窗口、设置定时器等。

```js
1. 识别浏览器类型
  const ua = navigator.userAgent // 获取用户代理字符串
  const isChrome = /Chrome/.test(ua) // 判断是否为Chrome浏览器

2. 屏幕分辨率
  const screenWidth = window.screen.width // 屏幕宽度
  const screenHeight = window.screen.height // 屏幕高度

3. 页面跳转
  window.location.href = 'https://www.baidu.com' // 页面跳转
  window.location.reload() // 页面刷新
  window.location.assign('https://www.baidu.com') // 页面跳转，保留当前历史记录
  window.location.replace('https://www.baidu.com') // 页面跳转，替换当前历史记录
  window.open('https://www.baidu.com') // 打开新窗口
  window.close() // 关闭当前窗口
  location.host() // 获取当前页面的主机名
  location.hostname() // 获取当前页面的主机名
  location.pathname() // 获取当前页面的路径
  location.search() // 获取当前页面的查询字符串
  location.hash() // 获取当前页面的哈希值
  location.origin() // 获取当前页面的协议和主机名
  location.protocol() // 获取当前页面的协议
  location.port() // 获取当前页面的端口号
  
4. 历史记录操作
  window.history.back() // 后退
  window.history.forward() // 前进
  window.history.go(-1) // 前进或后退到历史记录中的特定位置
  window.history.pushState(state, title, url) // 添加新的历史记录条目
  window.history.replaceState(state, title, url) // 替换当前历史记录条目
  window.history.state // 获取当前历史记录条目的状态对象
  window.history.length // 获取历史记录条目的数量
```







<!-- ## 4.DOM事件
  1. 事件类型
    - 鼠标事件：click、dblclick、mousedown、mouseup、mouseover、mousemove、mouseout等。
    - 键盘事件：keydown、keypress、keyup等。
    - 表单事件：change、input、submit等。
    - 页面事件：load、unload、resize、scroll等。
  2. 事件监听器
    - addEventListener(type, listener[, options])
    - removeEventListener(type, listener[, options])
  3. 事件对象
    - event.target 获取触发事件的元素
    - event.currentTarget 当前正在处理的元素
    - event.preventDefault() 阻止默认行为
    - event.stopPropagation() 阻止冒泡
    - event.stopImmediatePropagation() 阻止当前事件的其他监听器的执行 -->

<script setup>
  import { onMounted } from 'vue'
  onMounted(()=>{
    // const pList = document.querySelectorAll('.dom_p')
    // const p1 = pList[0]
    // p1.style.color = 'red'
    // p1.style.width = '200px'
    // // property 对象属性
    // console.log('p1-style-width:', p1.style.width) // 200px
    // console.log('p1-className:', p1.className) // dom_p
    // console.log('p1-nodeName:', p1.nodeName) // P
    // console.log('p1-nodeType:', p1.nodeType) // 1 nodeType: 元素节点
    // console.log('p1-nodeValue:', p1.nodeValue) // null 文本节点才有nodeValue值
    // console.log('p1-textContent:', p1.textContent) // 1 文本内容
    // // attributes html属性集合
    // p1.setAttribute('id', 'p1')
    // p1.setAttribute('value', '666')
    // const className = p1.getAttribute('class')
    // console.log('p1-attributes:', p1.attributes) // NamedNodeMap {0: class="dom_p", 1: id=""}
    // console.log('p1-className:', className)
    // const root = document.querySelector('.dom-handler')
    // // 新建节点
    // const p = document.createElement('p')
    // // 新建文本节点
    // const textNode = document.createTextNode('新建的P标签')
    // // 添加子节点
    // root.appendChild(p)
    // // 添加文本内容
    // p.appendChild(textNode)
    // // 移动节点
    // const moveP = document.querySelector('.move-p1')
    // root.appendChild(moveP)
    // console.log(root);
    // // 获取父元素
    // console.log('获取父元素',p.parentNode);
    // // 获取子元素
    // console.log('获取子元素',root.childNodes);
  })
</script>