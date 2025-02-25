# redux 状态管理工具

## 单独使用redux

  1. 定义一个reducer函数(根据业务修改返回一个新的状态对象)。
  2. 使用createStore方法，传入reducer函数，创建一个store实例对象。
  3. 使用store实例对象的subscrible方法，订阅数据的变化，数据一旦变化，执行回调函数。
  4. 使用store实例对象的dispatch方法，分发一个action对象，触发reducer函数执行，更新状态。
  5. 监听store实例对象的变化，在回调函数中获取最新的状态值。

  <img src="/assets/react/4.png" style="margin-top:15px">

  ```html
    <div style="display: flex;align-items: center;">
      <button id="decrement">-</button>
      <p id="count" style="padding: 0 10px;">0</p>
      <button id="add">+</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/redux@latest/dist/redux.min.js"></script>
    <script>
      // 1. 定义一个reducer函数(根据业务修改返回一个新的状态对象)。
      // 根据不同的action类型，返回一个新的状态对象。基于原始状态对象，返回一个新的状态对象。
      // state:管理的数据状态对象。
      // action:一个对象，包含type属性和其他属性。、
      function reducer(state={count:0},action){
        switch(action.type){
          case 'INCREMENT':
            return {...state,count:state.count+1};
          case 'DECREMENT':
            return {...state,count:state.count-1};
          default:
            return state;
        }
      }
      // 2. 使用createStore方法，传入reducer函数，创建一个store实例对象。
      const store = Redux.createStore(reducer);
      // 3. 使用store实例对象的subscrible方法，订阅数据的变化，数据一旦变化，执行回调函数。
      store.subscribe(()=>{
        console.log('数据变化了',store.getState().count);
        document.getElementById('count').innerText = store.getState().count;
      });
      // 4. 使用store实例对象的dispatch方法，分发一个action对象，触发reducer函数执行，更新状态。
      const addBtn = document.getElementById('add');
      addBtn.addEventListener('click',()=>{
        store.dispatch({type:'INCREMENT'});
      })
      const decrementBtn = document.getElementById('decrement');
      decrementBtn.addEventListener('click',()=>{
        store.dispatch({type:'DECREMENT'});
      })
    </script>
  ```

## react使用redux
  1.  react-redux 连接React组件和Redux的工具库。
  2. Redux Toolkit 库，简化store的配置方式，内置immer支持可变式状态参数，内置thunk中间件支持异步action。
  
  <img src="/assets/react/5.png" style="margin-top:15px">

### 使用Redux Toolkit配置store
  1. 创建一个store module userStore.js文件，通过createSlice方法定义一个slice对象，包含name、initialState和reducers属性,
  2. 解构slice对象，获取actions。
  3. 根据userStore.reducer属性，生成reducer函数。
  4. 导出actions和reducer。
  5. 导出reducer函数。
  6. 在项目中创建store文件夹，在store文件夹中创建index.js文件，配置store对象。
  7. 使用configureStore方法创建一个根store实例对象。
  8. 引入modules文件夹中所有模块的reducer函数。
  9. 导出store根对象。

  <img src="/assets/react/6.png" style="margin-top:15px">

```js
  // 安装依赖：
  // npm install react-redux @reduxjs/toolkit
  // 创建store文件夹，在store文件夹中创建modules文件
  // 在modules文件夹中创建userStore.js文件
  import {createSlice} from "@reduxjs/toolkit";
  // 1.创建slice对象
  const userStore = createSlice({
      name: "user", // 切片名称，唯一标识
      initialState: { // 初始状态
        userInfo: null,
      },
      reducers:{ // 同步操作函数集合，每个方法对应一个action类型
        SetUserInfo:(state,action)=>{
            state.userInfo = action.payload;
        }
      }
  })
  // 2.从slice对象中导出action创建函数和reducer函数
  const {setUserInfo} = userStore.actions;
  const userReducer = userStore.reducer;
  // 3.导出action创建函数和reducer函数
  export {setUserInfo};
  export default userReducer;

  // 在store文件夹中创建index.js文件
  import {configureStore} from '@reduxjs/toolkit'
  // 1. 引入reducer模块文件
  import userReducer from './modules/userStore.js'
  // 2. 创建store根对象

  const store = configureStore({
    // 3. 配置reducer对象模块文件
    reducer: {
      user: userReducer,
    },
  })
  // 4. 导出store对象
  export default store
```
### 使用react-redux连接React组件和Redux

```js
  // 在react index.js文件中引入store对象
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import store from './store';
  // 2. 使用Provider组件包裹App组件，将store对象传递给所有子组件
  import { Provider } from 'react-redux';
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider  store={store} >
      <App />
    </Provider>
  );

```

