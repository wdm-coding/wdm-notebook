# JS 相关记录

## AbortController 批量取消事件监听
1. 创建控制器
```js
const controller = ref(null)
if(controller.value){
  controller.value.abort()
  controller.value = null
}
controller.value = new AbortController(); // 创建控制器实例
const signal = controller.signal; // 获取信号对象
```

2. 注册监听事件
```js
onMounted(()=>{
  window.addEventListener('click', () => {}, { signal }); // 注册点击事件，传入信号对象
  window.addEventListener('mousemove', () => {}, { signal }); // 注册鼠标移动事件，传入信号对象
  window.addEventListener('scroll', () => {}, { signal }); // 注册滚动事件，传入信号对象
  // ... 其他事件监听
})
```

3. 取消所有注册的监听事件
```js
onUnmounted(()=>{
  controller.abort(); // 调用控制器实例的 abort 方法，所有绑定该 signal 的操作会被取消
  controller.value
})
```

4. 间接实现批量取消计时器
```js
const controller = ref(null)
if(controller.value){
  controller.value.abort()
  controller.value = null
}
controller.value = new AbortController(); // 创建控制器实例
const signal = controller.signal; // 获取信号对象
const timers = ref([])
timers.value[0] = setTimeout(()=>{}, 1000)
timers.value[1] = setTimeout(()=>{}, 2000)
timers.value[3] = setTimeout(()=>{}, 2000)

signal.addEventListener('abort', () => {
  timers.value.forEach(timer => clearTimeout(timer))
  timers.value = []
})

onUnmounted(()=>{
  controller.abort(); // 调用控制器实例的 abort 方法，所有绑定该 signal 的操作会被取消
  controller.value = null
})
```