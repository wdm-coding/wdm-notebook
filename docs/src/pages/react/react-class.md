# Reach Class类组件

## Class类组件写法

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

## 类组件的生命周期

  1. componentDidMount()‌ 组件挂载完成时调用，此时可以执行DOM操作

  2. componentDidUpdate() 组件更新时调用，此时可以执行DOM操作

  3. componentWillUnmount() 组件卸载时调用

## 数据通信

  1. 父组件向子组件通信

    - 通过props传递数据

  2. 子组件向父组件通信

    - 使用回调函数

```js
  import React,{Component} from 'react';
  class Son extends Component{
    componentDidMount(){
      console.log('Son组件挂载完成',this.props.count)
    }
    componentDidUpdate (prevProps, prevState){
      console.log('Son组件更新完成',prevProps, prevState)
    }
    componentWillUnmount(){
      console.log('Son组件即将卸载')
    }
    render() {
      return <div style={{marginTop:'10px'}}>
        <h3>我是Son组件</h3>
        <button onClick={()=>{this.props.onGetSonData('我是来自子组件数据')}}>点击传递数据给父组件</button>
      </div>
    }
  }
```

```js
class PagesClass extends Component{
  state = {
    count:0
  }
  addHandler = () =>{
    this.setState({
      count:this.state.count+1
    })
  }
  getSonData = (data) =>{
    console.log('获取到子组件数据：',data);
  }
  render() {
      return (
        <div>
            <h1 style={{fontSize:'32px'}}>react类组件</h1>
            <h2>当前计数为：{this.state.count}</h2>
            <button onClick={this.addHandler}>点击增加</button>
            {this.state.count > 5 && this.state.count< 10 ? <Son count={this.state.count} onGetSonData={this.getSonData}/> : null}
        </div>
    )
  }
}
```