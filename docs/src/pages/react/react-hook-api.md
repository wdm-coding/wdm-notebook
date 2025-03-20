# React Hook 以及 Api

## 自定义Hook函数
  自定义Hook函数就是一个普通的JavaScript函数，它的名称必须以“use”开头。
  自定义Hook可以让你将组件逻辑提取到可重用的函数中，这样可以减少代码的重复性，并使得你的组件更加简洁和易于理解。
  自定义Hook可以接受参数，并且可以使用其他的Hooks（如useState、useEffect等）。'
  自定义Hook可以让你在不同的组件之间共享逻辑，而不需要将相同的代码复制到每个组件中。
```js
// 一般写法
  const [show,setShow] = useState(true)
  const toggle = ()=>{
    setShow(!show)
  }
  <div>{show?'显示':'隐藏'}</div>
  <button onClick={toggle}>切换</button>
// hook写法
  import {useState} from 'react'
  function useToggle(){
      // 可复用的逻辑
      const [show, setShow] = useState(false);
      const toggle = ()=>{
        setShow(!show)
      }
      // 返回一个对象，包含show和toggle两个属性
      return { show, toggle };
  }
  export default useToggle;

  // 使用hook
  const {show,toggle} = useToggle()
  <div>{show?'显示':'隐藏'}</div>
```

::: waring
1. 只能在函数组件中使用自定义Hook，不能在类组件中直接使用。
2. 只能在组件的顶层调用自定义Hook，不能在条件语句或循环中调用。
:::


## useEffect
  useEffect是React中的一个Hook，用于在组件渲染后执行副作用操作。它可以让你在函数式组件中执行诸如数据获取、订阅或手动更改DOM等操作。
### useEffect参数说明
  1. useEffect用于在react组件中创建不是有事件引起而是有渲染本身引起的操作，可能包括数据获取、订阅或手动更改 React 组件中的 DOM。
  2. useEffect 可以接受两个参数：一个是要执行的函数，另一个是依赖项数组。当依赖项数组中的值发生变化时，useEffect 中的函数会重新执行。

  <div style="color:red;margin-top:15px">
    组件渲染完毕要执行的操作，而不是用户交互发生的操作，相当于vue的onMounted与watch的结合
  </div>
  <div style="color:red;margin-top:15px">
    useEffect副作用函数的执行时机存在多种情况，根据传入的依赖项不同，会有不同的表现
  </div>
  <img src="/assets/react/3.png" alt="useEffect依赖项参数说明" style="margin-top:15px">

  ```js
    let compCount = 0;
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    function UseEffectHook(){
        compCount++
        console.log(`组件渲染${compCount}次`);
        const [list,setList] = useState([]);
        const [obj,setObj] = useState({name:'xxx'});                           
        // 1.没有依赖项，组件每次渲染都会执行
        useEffect(()=>{
            count1++
            console.log(`useEffect没有依赖项执行${count1}次`)
        })
        // 2.依赖项为空数组，组件渲染时执行一次
        useEffect(()=>{
          count2++
          console.log(`useEffect依赖项为空数组执行${count2}次`)
        },[])
        // 3.依赖项为list，当list变化时执行
        useEffect(()=>{
          count3++
          console.log(`useEffect依赖项为list执行${count3}次`)
        },[list])
        const handleClick = ()=>{
            // setList执行多次，组件会重新渲染多次
            setList([...list,1])
        }
        const handleClick2 = ()=>{
          setObj({...obj,name:'www'})
        }
        return (
          <div>
            <h3>UseEffectHook</h3>
            <button onClick={handleClick}>点击{list}</button>
            <button onClick={handleClick2}>点击{obj.name}</button>
          </div>
        );
    }
  ```
### useEffect清除副作用
  组件卸载时，需要清除副作用。例如：取消订阅、定时器等 相当于vue的onUnmounted

  关于useEffect清除副作用的执行时机，主要有两个关键点：
  1. 组件卸载时：当组件从DOM中移除时，React会执行useEffect的返回函数（如果有的话）来清除副作用。
  2. 依赖项变化，导致副作用重新运行时：如果useEffect的依赖项发生变化，导致副作用函数重新运行，那么在运行新的副作用函数之前，React会先执行旧的副作用的返回函数（如果有的话）来清除旧的副作用。
```js
useEffect(()=>{
  const timer =  setInterval(()=>{
    console.log('定时器执行中')
  },1000)
  return ()=>{
    // clearInterval(timer)
    console.log('组件卸载')
  }
},[])
```

## useReduer
  useReducer是React中的一个Hook，用于管理组件的复杂状态。它类似于Redux中的reducer函数，可以让你通过dispatch来更新状态，而不是直接修改状态。类似于useState，useReducer也可以接受一个初始状态和一个reducer函数作为参数。
  1. 定义reducer函数，该函数接收当前状态和要执行的动作作为参数，并返回新的状态。
  2. 使用useReducer Hook，将reducer函数和初始状态作为参数传入。
  3. 使用dispatch函数来更新状态，并通过useReducer返回的状态值在组件中渲染。
```js
import {useReducer} from 'react';
import {Button} from 'antd';
function UseReducerHook(){
    // 1.定义一个reducer函数，接收state和action作为参数
    const reducerFun = (state,action)=>{
        switch(action.type){
            case 'increment':
                return {...state,count:state.count+1}
            case 'decrement':
              return {...state,count:state.count-1}
            case 'change':
              return {...state,count:action.payload}
            default:
              return state;
        }
    }
    // 2.调用useReducer钩子，传入reducer函数和初始状态值，返回一个数组[state,dispatch]
    const [state,dispatch] = useReducer(reducerFun,{count:0});
    // 3.使用dispatch进行逻辑处理,更新state值与UI更新
    const add = ()=>{
        dispatch({type:'increment'})
    }
    const minus = ()=>{
        dispatch({type:'decrement'})
    }
    const update = (payload)=> {
      dispatch({type:'change',payload})
    }
    return (
      <>
        <h1>UseReducerHook</h1>
        <p>Count:{state.count}</p>
        <Button color="primary " variant="solid" onClick={add} style={{marginRight:'15px'}}>
          增加
        </Button>
        <Button color='danger' variant="solid" onClick={minus}>
          减少
        </Button>
        <Button color='success' variant="solid" onClick={()=>update(10)} style={{marginLeft:'15px'}}>
          更新
        </Button>
      </>
    );
}

export default UseReducerHook;
```
## useMemo
  useMemo是React中的一个Hook，用于缓存计算结果。它可以让你在组件渲染时避免不必要的重新计算，从而提高性能。
  类似于vue的computed
  1. 定义一个函数，该函数接收一些参数并返回计算结果。
  2. 使用useMemo Hook，将该函数和依赖项数组作为参数传入。
  3. useMemo会缓存计算结果，并在依赖项不变的情况下返回相同的值。
  4. 在组件中，你可以直接使用useMemo返回的结果。
```js
import {useMemo,useState} from 'react';
import {Button} from 'antd';
const fib=(n)=>{
  console.log('计算属性执行了')
  if(n<=1) return n;
  return fib(n-1)+fib(n-2);
}

function UseMemoHook(){
  const [count1,setCount1] = useState(0);
  // const result = fib(count1)
  const result = useMemo(()=>fib(count1),[count1]);
  const [count2,setCount2] = useState(0);
  console.log('组件渲染了');
  return (
    <>
      <h1>UseMemoHook</h1>
      <p>result:{result}</p>
      <Button color='success' variant="solid" onClick={()=>setCount1(count1+1)}>
        count:{count1}
      </Button>
      <Button color='success' variant="solid" onClick={()=>setCount2(count2+1)} style={{marginLeft:'15px'}}>
        count:{count2}
      </Button>
    </>
  );
}
export default UseMemoHook;
```
## React.memo
  1. React.memo是React中的一个高阶组件.
  2. 用于缓存组件的渲染结果。当组件的props没有发生变化时，React.memo会直接返回上一次渲染的结果，从而避免不必要的重新渲染，提高性能。
  类似于vue的computed
```js
import { memo,useState,useMemo } from "react";
import {Button} from 'antd';
// 子组件
function Child1({name}){
  console.log("Child1子组件渲染了");
  return (
    <div>
      <h3>我是子组件</h3>
      <p>name:{name}</p>
    </div>
  );
}
function Child2({info}){
  console.log("Child2子组件渲染了");
  return (
    <div>
      <h3>我是子组件</h3>
      <p>{JSON.stringify(info)}</p>
    </div>
  );
}
// 子组件使用memo包裹子组件，让其变成记忆组件
const ChildMemo1 = memo(Child1);
const ChildMemo2 = memo(Child2);
// 父组件
function ReactMemo(){
    console.log("父组件渲染");
    // 当传递的props是基本类型，这里修改name会导致子组件重新渲染，因为name是父组件传递给子组件的props的一部分
    const [name, setName] = useState("张三") 
    // 这里修改count不会导致子组件重新渲染，因为count不是父组件传递给子组件的props的一部分
    const [count, setCount] = useState(0) 
    // 当传递的数据是对象或数组，即使内容没有变化，也会导致子组件重新渲染(会比较引用是否相同)
    const [age, setAge] = useState(18);
    const info = {sex:'男',age};
    // 如何解决这个问题，可以使用useMemo包裹info
    const memoInfo = useMemo(()=>info,[age]);
    return(
      <>
        <div>我是父组件</div>
        <Button color='success' variant="solid" onClick={()=>setCount(count+1)} style={{margin:'15px'}}>
          修改count:{count}
        </Button>
        <ChildMemo1 name={name}/>
        <Button color='success' variant="solid" onClick={()=>setName('李四')} style={{margin:'15px'}}>
          修改name
        </Button>
        <ChildMemo2 info={memoInfo}/>
        <Button color='success' variant="solid" onClick={()=>setAge(10)} style={{margin:'15px'}}>
          修改age
        </Button>
      </>
    );
}

export default ReactMemo
```
::: warning 注意 React.memo-props的比较机制
  1. 使用原生方法Object.is进行比较，它会根据类型和值来判断两个对象是否相等。

      Object.is(3,3) // true

      Object.is('a','b') // false

      Object.is({},{}) // false

      Object.is([],[]) // false

  2. 对于基本数据类型（如字符串、数字等），它会直接比较值。
  3. 对于对象和数组，它会比较引用是否相同。如果新旧props的引用不同（即指向不同的内存地址），则认为它们不相等，组件会重新渲染。
  React.memo默认只会对props进行浅比较，这意味着如果新旧props引用相同（即指向同一个对象），则不会触发组件的重新渲染。如果要实现深层次的对象或数组的比较，  可以使用`useMemo`或自定义比较函数。
:::

## useCallback
  1. useCallback是React中的一个Hook，用于缓存函数。
  2. 它类似于useMemo，但专门用于缓存函数。当函数的依赖项没有发生变化时，useCallback会返回上一次缓存的函数，从而避免不必要的重新创建和绑定事件

  <img src="/assets/react/10.png" alt="useCallback" style="margin-top:15px">

```js
  import {memo,useState,useCallback} from 'react'
  import {Button} from 'antd';
  const Input = memo(function Input({onChange}){
      console.log('Input 渲染了');
      return (
          <div>
              <div style={{marginBottom:'15px'}}>Input</div>
              <input type='text' onChange={(e)=>{onChange(e.target.value)}}/>
          </div>
      )
  })
  function UseCallbackHook(){
      console.log('UseCallbackHook 渲染了');
      // onChange函数是引用类型，相当于子组件的props，当父组件重新渲染时，子组件也会跟着重新渲染
      // const onChange = (value) => {
      //     console.log('value',value)
      // }
      // 使用useCallback包裹，可以避免不必要的渲染
      const onChange = useCallback((value)=>{
          console.log(value)
      },[])
      // 触发父组件重新渲染的按钮
      const [count,setCount] = useState(0)
      return (
          <>  
              <Input onChange={onChange}/>
              <div style={{marginTop:'15px'}}>UseCallbackHook</div>
              <Button 
                  color='success'
                  variant="solid" 
                  onClick={()=>setCount(count+1)}
                  style={{margin:'15px'}}
              >
                  count:{count}
              </Button>
          </>
      )
  }

  export default UseCallbackHook;
```

## forwordRef 与 useImperativeHandle
  1. forwardRef是React中的一个高阶组件，用于在父组件获取子组件的ref引用。
  2. 它允许你将一个ref对象传递给函数式组件或类组件的实例，以便在这些组件内部访问DOM节点或其他元素。
  3. useImperativeHandle是React中的一个Hook，用于在函数式组件中自定义暴露给父组件的ref对象的方法。
  4. useImperativeHandle参数 第一个参数是ref对象，第二个参数是一个函数，该函数的返回值会被暴露给父组件。

```js
import {useRef,forwardRef,useImperativeHandle} from 'react'
import {Button} from 'antd'
const Son = forwardRef(function({},ref){
  // 子组件方法
  const sonFun = () => {
    console.log('子组件方法执行了')
  }
  // 用useImperativeHandle来自定义暴露给父组件的实例值
  useImperativeHandle(ref,() => ({
    ref:ref.current,// 暴露给父组件的实例值，这里的ref.current就是子组件的dom元素
    sonFun // 子组件方法暴露给父组件
  }))
  return (
    <div ref={ref}>我是子组件</div>
  )
})

function ForwordRefHoc(){
  const sonRef = useRef(null);
  const getInstanceByDom = () => {
    console.log('父组件',sonRef.current);
  }
  // 父组件调用子组件方法
  const callSonFun = () => {
    sonRef.current.sonFun();
  }
  return (
    <>
      <Son ref={sonRef}></Son> 
      <div>我是父组件-forwordRef</div>
      <Button 
          color='success'
          variant="solid" 
          onClick={getInstanceByDom}
          style={{margin:'15px'}}
      >
          获取子组件实例
      </Button>
      <Button 
          color='success'
          variant="solid" 
          onClick={callSonFun}
          style={{margin:'15px'}}
      >
          调用子组件方法
      </Button>
    </>
  )
}

export default ForwordRefHoc;
```