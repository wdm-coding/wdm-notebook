# react class 类的生命周期

## 挂载阶段

### constructor 构造函数，初始化状态。

```js
constructor(props) {
  super(props);
  // 初始化状态
  this.state = {};
}
```

### componentWillMount 组件将要挂载时调用，在render之前执行

```js
componentWillMount() {
  // 做一些异步操作，例如ajax请求
}
```

### render 渲染组件

### componentDidMount 组件挂载完成后调用，在render之后执行
```js
componentDidMount() {
  // 执行DOM操作，发送ajax请求等
}
```

### componentWillReceiveProps 组件将要接收新的props时调用
```js
componentWillReceiveProps(nextProps) {
  // 判断新旧props，执行相应操作
}
// 注意：该方法在16.3版本后被标记为不推荐使用，建议使用getDerivedStateFromProps代替
static getDerivedStateFromProps(nextProps, prevState) {
  // 根据新旧props，返回新的state
  return null; // 或者 return newState;
}
```

## 更新阶段
### shouldComponentUpdate 组件是否更新
```js
shouldComponentUpdate(nextProps, nextState) {
  // 根据新旧状态决定是否需要重新渲染
  return true; // 返回true表示需要更新，false则不更新
}
```

### componentWillUpdate 组件即将更新前调用。
```js
componentWillUpdate(nextProps, nextState) {
  // 做一些准备工作，例如重置定时器等
}
```

### componentDidUpdate 组件更新完成后调用。
```js
componentDidUpdate(prevProps, prevState) {
  // 做一些DOM操作，例如滚动到页面底部等
}
```

## 卸载阶段
### componentWillUnmount 组件将要被销毁时调用。
```js
componentWillUnmount() {
  // 清理工作，例如清除定时器、取消网络请求等
}
```

### 错误处理

### componentDidCatch 捕获子组件的错误。
```js
componentDidCatch(error, info) {
  // 处理错误，例如记录日志等
}
```


