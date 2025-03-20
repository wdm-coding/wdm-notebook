# Reach Class类组件
  1. 需要导入`Component`类
  2. 数据存储在`state`属性中
  3. 更新`state`使用`setState()`方法
  4. 模版写在`render()`方法中

```js
import React from 'react'
import { Component } from 'react'

export default class Welcome extends Component {
  state = {
    name: 'John'
  }
  clickHandler = () => {
    this.setState({ name: 'John Doe' })
  }
  render() {
    return <h1 onClick={this.clickHandler}>Hello, {this.state.name}</h1>
  }
}
```