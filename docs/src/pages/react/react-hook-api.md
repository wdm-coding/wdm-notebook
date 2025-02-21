# React Hook 以及 Api

## useEffect

  useEffect(()=>{},[])

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

  