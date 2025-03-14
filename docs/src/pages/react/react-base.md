# React 基础

## 创建一个react应用
  npx create-react-app my-app(项目名)
  1. 使用 npx（Node Package Executor）临时安装并执行 create-react-app 包。
  npx 会首先检查本地是否已经安装了 create-react-app。如果没有安装，npx 会从 npm（Node Package Manager）上下载并安装它，然后执行。
  2. create-react-app 是一个官方提供的脚手架工具，用于初始化一个新的 React 项目。
  3. my-app 是您想要创建的 React 项目的目录名。

  react中文文档：https://zh-hans.react.dev/learn/creating-a-react-app

## JSX
  JSX 是 JavaScript XML 的缩写，它是 React 特有的语法扩展。
  在 JSX 中，你可以使用大括号 {} 来嵌入表达式（例如变量、函数调用等），但不能直接写语句（如 if-else）。
  1. HTML的声明式写法
  2. js的可编程能力
  3. 需要babel解析工具解析后才能被浏览器识别

  babel官网：https://babeljs.io/
  
  示例：
  ```jsx
  const element = <h1>Hello, {name}!</h1>;
  ```

### jsx中使用js表达式

```js
const count = 100
function fun(){
  return '我是一个函数'
}
function App() {
  return (
    <div className="App">
      <p>this is a react project</p>
      {/* 1.使用引号传递字符串 */}
      <p>{'我是jsx字符串'}</p>
      {/* 2.使用{}包裹js变量 */}
      <p>{count}</p>
      {/* 3.函数调用 */}
      <p>{fun()}</p>
      {/* 4.方法调用 */}
      <p>{new Date().getFullYear()}</p>
      {/* 5.使用style对象 */}
      <p style={{color:'red',fontSize:20}}>我是样式</p>
    </div>
  );
}
```
### JSX中使用循环渲染
  map方法实现循环渲染。
  key属性是必须的，用于提高渲染性能。

```js
const arr = [1,2,3]
function App() {
  return (
    <div className="App">
      {/* 循环渲染 */}
      {
        arr.map((item)=>(<p key={item}>我是数组的第{item}个元素</p>))
      }
    </div>
  );
}
```
### JSX中使用条件渲染
  1. 使用三元运算符。
  2. 使用逻辑与或非代替if-else。
  3. 使用对象代替switch-case。

  示例：
  ```jsx
  const isLogin = true
    function render(){
    if(isLogin){
      return <p>登录成功4</p>
    }else if(!isLogin){
      return <p>未登录</p>
    }else{
      return <p>未知状态</p>
    }
  }
  function App() {
    return (
      <div className="App">
        {/* 三元运算符 */}
        {isLogin ? <p>登录成功</p> : <p>未登录</p>}
        {/* 逻辑与或非代替if-else */}
        {!isLogin && <p>未登录</p>}
        {isLogin && <p>登录成功</p>}
        {/* 使用对象代替switch-case */}
        // 通过[isLogin]语法，代码根据isLogin变量的值从对象中选择对应的属性进行访问。如果isLogin为true，则选择true属性对应的<p>登录成功</p>；如果为false，则选择false属性对应的<p>未登录</p>；如果既不是true也不是false（这里假设为空字符串''表示未知状态，尽管在实际应用中可能需要更明确的未知状态表示），则选择空字符串''属性对应的<p>未知状态</p>。
        {
          {
            true: <p>登录成功</p>,
            false: <p>未登录</p>,
            '': <p>未知状态</p>,
          }[isLogin]
        }
        {/* 复杂条件渲染，通过定义函数（if语句实现） */}
        {render()}
      </div> 
    );
  }
  ```





::: warning
  1. 不能直接写if-else，可以使用三元运算符或者逻辑与或非代替。
  2. 不能直接写for循环，可以使用数组的map方法代替。
  3. 不能直接写switch-case，可以使用对象代替。
:::

## react事件绑定
  语法: on+事件名 = {函数} 整体遵循驼峰命名法。

  示例：
  ```jsx
  function App() {
  function fun(e,a){
    console.log('1-react事件this',this)
    console.log('1-react事件对象e',e)
    console.log('1-自定义参数a',a)
  }
  return (
    <div className="App">
      <p>this is a react project</p>
      <button onClick={(e)=>fun(e,1)}>点击事件1</button>
    </div>
  );
}
```

## React组件
  一个组件就是首字母大写的函数或者类。渲染组件有两种方式： 
  1. 直接使用标签形式渲染。
  2. 使用JSX语法渲染。

  ```jsx
  function Header() {
    return (
      <div>
        <h1>this is a header</h1>
      </div>
    );
  }
  function App() {
    return (
      <div className="App">
        <p>this is a react project</p>
        <Header></Header>
      </div>
    );
  }
  ```
## react数据状态变更useState
  useState是React中的一个Hook，用于在函数组件中添加状态（state）管理功能。
    
  ```jsx
    import { useState } from "react";
    function App() {
      // 定义一个状态和一个修改状态的函数
      const [count,setCount] = useState(0);
      const addCount = () => {
        // 修改状态的值,重新渲染组件,数据驱动视图
        setCount((pre)=>pre + 1);
      };
      // 修改对象
      const [obj,setObj] = useState({name:'lisi',age:18});
      const addObj = () => {
        setObj({...obj,name:'wangwu'})
      }
      // 修改数组
      const [arr,setArr] = useState([1,2,3]);
      const addArr = () => {
        // 增加数组
        setArr([...arr,4])
        // 删除数组
        setArr(arr.filter((item)=>item !== 3))
        // 修改数组
        setArr(arr.map((item)=>{
          if(item === 2){
            return item + 10;
          }
          return item;
        }))
      }
      return (
        <div className="App">
          <p>this is a react project</p>
          <p>{count}</p>
          <button onClick={addCount}>增加</button>
          <p>{obj.name}</p>
          <button onClick={addObj}>修改对象</button>
          <p>{arr.join(',')}</p>
          <button onClick={addArr}>修改数组</button>
        </div>
      );
    }
  ```

::: warning
  1. useState是React中的一个Hook，只能在函数组件中使用。
  2. useState返回一个数组，第一个元素是状态值，第二个元素是一个函数，用于修改状态值。
  3. 修改状态值后，组件会重新渲染。
  4. 任何由useState Hook返回的更新函数的行为在表面上看似异步,但实际上并不是。
  5. 当你调用setCount时，React并不会立即更新count的状态值。相反，它会将更新操作排入一个队列中。
  随后，React会在其内部机制允许的情况下，即在当前的渲染周期结束后和下一个渲染周期开始前，应用这些更新。这种行为给人一种setCount是“异步”的错觉，因为它不会立即反映状态的变化。
  6. React采用这种批量更新策略是为了提高性能，避免不必要的多次渲染。通过将多个状态更新合并为一个，React可以减少DOM操作的次数，从而提升应用的整体效率。
  7. 状态不可变，只是新值替换旧值
:::

## 组件基础样式方案
  1. 行内样式
  2. class类名控制
## classnames 优化类名控制
  *** npm install classnames ***
  classnames库可以简化类名控制的写法，特别是在需要根据条件动态添加或移除多个类时。

```jsx
  import classnames from 'classnames';
  1. 对象语法：
  const cx = classnames({
    'class-a': true,
    'class-b': false,
    'class-c': someCondition
  });
  2. 数组语法：
  const cx = classnames(['class-a', 'class-b', someCondition ? 'class-c' : null]);
  3. 混合语法：
  const cx = classnames('class-a', { 'class-b': true }, 'class-c');
```
## 受控表单绑定
  在React中，受控表单是一种表单处理方式，其中表单元素的值由React组件的状态来控制。
  1. 在组件的状态中初始化表单数据。
  2. 使用onChange事件处理器来更新组件的状态，当表单元素的值发生变化时。
  3. 将表单元素的值设置为组件状态中的对应值。

  <img src="/assets/react/1.png" alt="受控表单" style="margin-top:15px">

```js
  function ContralBindInput(){
    const [value,setValue] = useState('init value')
    const changeValue = (e)=>{
      setValue(e.target.value)
    }
    return (
      <div>
        <h3>受控表单绑定(双向绑定)</h3>
        <p>{value}</p>
        <input type="text" value={value} onChange={changeValue}/>
      </div>
    )
  }
```
## react获取dom元素
  在React中，通过ref来获取对DOM节点的引用。
  1. 使用useRef Hook创建ref对象。
  2. 将ref对象的current属性设置为要引用的DOM节点。
  3. 渲染完毕后，可以通过ref对象的current属性访问到DOM节点。

```js
    import { useRef } from 'react'
    function GetDom(){
      const inputRef = useRef(null)
      return (
        <div>
          <h3>获取DOM</h3>
          <input ref={inputRef} type='text'/>
          <button onClick={()=>console.log('inputRef',inputRef.current)}>
            获取dom
          </button>
        </div>
      )
    }
```
## 组件通信
  组件通信是指在React应用中，不同组件之间如何传递数据或状态。
### 1. 父子通信
  父子通信是最常见的组件间通信方式，主要通过props和回调函数实现。
  1. 父组件通过props将数据传递给子组件。
  2. 子组件可以通过onChange事件向父组件传递信息或触发状态更新，在子组件中调用父组件的函数进行参数传递。
  3. 单向数据流：父组件到子组件的通信是单向的，从顶层向下传递。
  4. 子组件不能直接修改父组件的状态，只能通过回调函数通知父组件进行状态更新。
  5. 通过展开运算符（...）可以将父组件的多个props传递给子组件。
  
  ::: info
    特殊的props.children属性可以接收任意类型的数据，包括React元素。
    当组件标签内包含子元素时，这些子元素会被自动添加到props.children中。相当于插槽的概念。
  :::
### 2. 兄弟组件通信

  兄弟组件通信通常通过共同的父组件作为中介进行。
  1. 兄弟组件各自维护自己的状态，并通过回调函数或事件将数据传递给父组件。
  2. 父组件接收子组件的数据后，可以通过props将这些数据传递到另一个子组件中。

  <img src="/assets/react/2.png" alt="兄弟组件通信" style="margin-top:15px">
    
```js
    function Father(){
      const name = 'son-one';
      const info = {
        age: 18,
        sex: 'male',
        arr:[1,2,3],
        jsx: <strong style={{color:'red'}}>jsx数据</strong>,
        fn:()=>{console.log('fn')},
        obj:{a:1,b:2},
        date: new Date()
      }
      const [sonMsg,setSonMsg] = useState('')

      const changeHandler = (msg)=>{
        setSonMsg(msg)
      }
      const [branthName,setBranthName] = useState('')
      const getbranth = (bn)=>{
        setBranthName(bn)
      }
      return (
        <div>
          <h3>父子组件通信</h3>
          <ChildOne name={name} {...info} onGetSonMsg={changeHandler} onGetbranth={getbranth}>
            <h1>我是props.children</h1>
          </ChildOne>
          <h2>子传父</h2>
          <p>{sonMsg}</p>
          <h2>兄弟组件</h2>
          <ChildTwo name={branthName}/>
        </div>
      )
    }
    function ChildOne(props){
      console.log('ChildOne',props);
      return (
        <div>
          <p>ChildOne name is {props.name}</p>
          <p>ChildOne age is {props.age}</p>
          <p>ChildOne hobby is {props.hobby}</p>
          <p>ChildOne address is {props.address}</p>
          <p>{props.jsx}</p>
          <p>{props.children}</p>
          <button onClick={()=>props.onGetSonMsg('来自子组件的数据')}>向父组件发送数据</button>
          <br/>
          <br/>
          <button onClick={()=>props.onGetbranth('来着兄弟组件的数据')}>向兄弟组件发送数据</button>
        </div>
      )
    }
    function ChildTwo(props){
      return (
        <div>
          <p>ChildTwo name is {props.name}</p>
        </div>
      )
    }
```

### 3. Context API跨级组件通信
    + 1.createContext创建上下文对象
    + 2.Context.Provider在祖先组件上包裹要共享数据的子组件
    + 3.使用Context.Consumer渲染子组件，并通过value属性获取上下文数据

::: warning 子组件暴露方法和属性给父组件 useImperativeHandle
  1. 使用useImperativeHandle自定义暴露给父组件的方法或属性。
  2. 在父组件中，通过ref对象访问子组件的实例或方法。
```js
  const { ref } = props;
  // 暴露图表方法给父组件
  useImperativeHandle(ref, () => ({
    // 获取 ECharts 实例
    getInstance: () => myChart.current,
    // 手动触发 resize
    resize: () => {
      if (myChart.current) {
        myChart.current.resize();
      }
    }
  }));
  // 父组件使用
  <Chart ref={chartRef} />
  chartRef.current.resize();
```
:::


    