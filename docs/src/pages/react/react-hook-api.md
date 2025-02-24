# React Hook 以及 Api

## useEffect
  useEffect(()=>{},[])
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