# Zustand
  [Zustand官网](https://zustand-demo.pmnd.rs/)

## 基础使用
  1. 安装 npm install zustand
  2. 创建store
  3. 绑定store到组件

```js
import {create} from 'zustand'
// 创建store 返回的是一个hook函数，用这个hook可以获取store中的数据和修改数据的函数
// create的参数是一个函数，这个函数的返回值就是一个store对象，这个对象中可以定义任意数据和修改数据的函数
// set函数是用来修改数据的，set函数的参数也是一个对象，这个对象的属性就是要修改的数据的名称和值
const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    setCount: (count) => set(() => ({ count }))
  }))

export default useStore;
```

```js
import useStore from '@/zustand/index.js';
function PagesZustand() {
    const { count,increment,decrement,setCount } = useStore();
    return (
      <div>
        <p>PagesZustand</p>
        
        <div style={{display:'flex'}}>
          <button onClick={increment}>+</button>
          <p>count: {count}</p>
          <button onClick={decrement}>-</button>
        </div>
        <button onClick={()=>{setCount(100)}}>设为100</button>
      </div>
    );
}
export default PagesZustand;
```

## 异步操作

```js
import {create} from 'zustand'
const useStore = create((set) => ({
    count: 0,
    asyncHandle: async () => {
      // 这里使用async await语法，模拟异步操作
      const data = await new Promise(resolve => setTimeout(()=>resolve(666), 1000));
      set(() => ({ count: data }));
    }
}))
export default useStore;
```
## 切片模式 + 持久化存储
 相当于vuex 的 模块modules

### user.js
```js
const useUser = set=>({
  token: null,
  // 异步获取token
  setToken: async () => {
    const res = await new Promise(resolve => setTimeout(() => resolve("token-wdm-0620"), 1000));
    set({ token: res });
  }
})
export default useUser;
```
### index.js
```js
import { create } from 'zustand'
import useUser from './user.js'
import useCount from './count.js'
import { persist,createJSONStorage } from 'zustand/middleware'
// 切片模式 + 持久化存储
const useStore = create(persist(
  (...a)=>{
      return {
        ...useUser(...a),
        ...useCount(...a)
      }
  },
  {
    name: 'zustand', // 唯一名称
    storage: createJSONStorage(() => sessionStorage), // 存储方式 localStorage | sessionStorage
    partialize: (state) => ({ 
      count: state.count,
      token:state.token
     }) // 持久化存储的字段
  }
))
export default useStore;
```
### 组件中使用
```js
import useStore from '@/zustand/index.js';
function PagesZustand() {
    const {count,increment,decrement,setCount,asyncHandler,token,setToken} = useStore();
    return (
      <div>
        <p>PagesZustand</p>
        <div style={{display:'flex'}}>
          <button onClick={increment}>+</button>
          <p>count: {count}</p>
          <button onClick={decrement}>-</button>
        </div>
        <button onClick={()=>{setCount(100)}}>设为100</button>
        <br />
        <button onClick={asyncHandler}>异步操作</button>
        <br />
        <button onClick={setToken}>异步获取token:{token}</button>
      </div>
    );
}
```