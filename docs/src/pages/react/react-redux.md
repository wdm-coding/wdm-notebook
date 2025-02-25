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

```js
  // 安装依赖：
  npm install react-redux @reduxjs/toolkit
```



