# React 面试题

## React 的核心特性是什么？‌
1. ‌组件化‌：将UI拆分为独立、可复用的组件。
2. ‌虚拟DOM‌：通过高效的Diff算法减少直接操作真实DOM的开销。
3. ‌单向数据流‌：数据通过props从父组件传递到子组件，状态提升保证可预测性。
4. Hooks‌：函数组件中管理状态和副作用的方案（如useState, useEffect）。

## ‌虚拟DOM的工作原理是什么？‌
1. React元素（JSX）转换为虚拟DOM对象。
2. 新旧虚拟DOM比较，生成差异对象。Diff算法通过对比两个虚拟DOM树的结构和属性，生成一个描述差异的对象。。
3. 将差异应用到真实DOM上，完成更新。React会根据差异对象对真实DOM进行更新。只更新那些真正发生变化的节点，而不是重新渲染整个页面。React会尽可能复用现有的DOM节点，以减少不必要的DOM操作，从而提高性能。

## Diff算法如何比较不同类型的节点？
1. 树形结构比较，同层节点比较，最小化变更
2. 不同类型的节点直接替换，不比较子树。
3. Diff算法的优化策略包括：
  + 设置key属性，唯一的key属性可以帮助React更准确地识别哪些节点是稳定的、哪些是新增或删除的。这样可以避免不必要的节点重排和重建，提高渲染效率。
  + 对于函数组件，可以使用React.memo来缓存组件的渲染结果，并在props发生变化时通过浅比较来决定是否重新渲染组件。

## HOC & Render Props：通过高阶组件和渲染属性实现代码复用。
1. HOC是一个函数‌，接收一个组件（类/函数）作为参数，返回一个新的增强版组件。
2. HOC适用于需要操作组件生命周期或 Props 的场景。

## 自定义Hooks：通过自定义Hook实现逻辑复用。
1. 自定义Hook是一个函数，封装可复用的逻辑（如状态管理、副作用操作等），供多个组件共享。
2. ‌避免this问题‌：函数组件无this绑定问题，闭包特性更易理解。
3. 只能在 React 函数组件或其他自定义 Hook 中调用‌，不可在普通函数或类组件中使用。
4. 不能在循环、条件或嵌套函数中调用自定义Hook。

## 类组件 vs 函数组件，如何选择？‌
1. ‌类组件‌：使用ES6类，有生命周期和状态（通过this.state）。
2. ‌函数组件‌：通过Hooks实现状态和生命周期，更简洁，推荐使用。

## 类组件的生命周期方法有哪些？
  1. 挂载阶段：
    + `constructor` 初始化state和绑定事件。
    + `getDerivedStateFromProps(nextProps, nextState)` 用于在组件实例化或接收到新的 props 时，根据 props 更新组件的 state。该方法在组件挂载（mount）和更新（update）时都会被调用。
    + `render` 渲染UI(返回 JSX，描述组件 UI。)。
    + `componentDidMount` 组件挂载后执行。
  2. 更新阶段：
    + `getDerivedStateFromProps(nextProps, nextState)`(同挂载阶段，在每次更新前调用。)
    + `shouldComponentUpdate(nextProps, nextState)` 控制组件是否重新渲染。该方法需要返回一个布尔值。如果返回 true，则组件将继续更新过程（即调用 `render` 方法）；如果返回 false，则组件将不会重新渲染，更新过程将被中断。
    + `render` 渲染UI(同挂载阶段，生成新的虚拟 DOM。)。
    + `getSnapshotBeforeUpdate(prevProps, prevState)` 它在最近一次渲染输出（提交到 DOM 节点）之前被调用。这个方法使得组件能在更新发生之前从 DOM 中捕获一些信息（例如，滚动位置或表单输入值）。这个信息随后可以作为 componentDidUpdate 的第三个参数使用。
    + `componentDidUpdate(prevProps, prevState, snapshot)` DOM 更新完成后执行，适合操作更新后的 DOM 或发起请求。
  3. 卸载阶段：
    + `componentWillUnmount` 组件卸载前执行，清理资源。
  4. 错误处理：
    + `getDerivedStateFromError(error)` 捕获子组件抛出的错误。记录错误信息（如上报日志）。
  ::: tip react生命周期与vue生命周期的比较
  1. 挂载阶段：
  constructor === beforeCreate + created
  render === beforeMount
  componentDidMount === mounted
  2. 更新阶段：
  getSnapshotBeforeUpdate === beforeUpdate
  componentDidUpdate === updated
  3. 卸载阶段：
  componentWillUnmount === beforeDestroy + destroyed
  :::

## 函数式组件useEffect如何模拟生命周期？
1. `useEffect(()=>{},[])` 依赖项数组为空时，useEffect 仅在组件挂载时执行一次：componentDidMount
2. `useEffect(()=>{},[deps])` 依赖项变化时执行：componentDidUpdate。
3. `useEffect(()=>{ return () => {} },[])` 返回清理函数，模拟 componentWillUnmount。

## React 如何处理事件？
1. 通过JSX直接绑定方法：`<button onClick={handleClick}>点击</button>`。
2. 自动绑定this到当前实例：类组件的constructor中bind(this)。
3. 使用箭头函数自动绑定this：`<button onClick={() => handleClick()}>点击</button>`。
4. 使用useCallback优化性能：`const memoizedHandler = useCallback(() => handleClick(), [])`。

## react 优化性能或避免不必要的组件渲染
1. `memo()`：React中的一个高阶组件，缓存函数组件，浅比较props。
2. `useMemo(()=>{},[])`：useMemo会缓存计算结果，并在依赖项不变的情况下返回相同的值。它可以让你在组件渲染时避免不必要的重新计算，从而提高性能。类似于vue的computed
3. `useCallback(()=>{},[])`：专门用于缓存函数。第一个参数是要缓存的函数，第二个参数是依赖项数组。当函数的依赖项没有发生变化时返回上一次缓存的函数，从而避免不必要的重新创建和绑定事件（如input的onChange事件）。
4. `shouldComponentUpdate()`：类组件中手动控制更新条件。

## 如何实现组件通信？
  1. ‌Props & 回调函数 父子组件通信。
  2. Context API 跨层级组件通信,避免prop 属性穿透，逐层传递。
  ```js
  // React.createContext() 创建一个 Context 对象,Context 对象提供Provider和Consumer组件
  const MyContext = React.createContext();
  //  使用 MyContext.Provider 包裹该组件并通过 value prop 提供要共享的数据。
  <MyContext.Provider value={/* 数据 */}>
    {/* 子组件 */}
  </MyContext.Provider>
  // 使用 MyContext.Consumer 或 useContext Hook 访问共享数据。
  const MyComponent = () => {
    const value = useContext(MyContext);
    return /* 根据 value 渲染组件 */;
  };
  ```
  3. Redux、MobX等状态管理库 全局通信。

## 什么是受控组件和非受控组件？‌
  :::tip 受控组件和非受控组件
  1. ‌受控组件‌：表单值由React state控制（如`<input value={value} onChange={...}/>`）。
  2. ‌非受控组件‌：通过ref直接访问DOM元素的值（如`<input ref={inputRef} />`）。
  :::

## React 中的key有什么作用？‌
  1. ‌识别元素唯一性‌：帮助React在列表更新时正确复用DOM节点。
  2. ‌避免问题‌：不要用数组索引作为key（可能导致状态错乱），应使用唯一ID。

## useEffect 的依赖数组如何工作？‌
  :::tip useEffect
  1. ‌空数组`[]‌`：仅在组件挂载和卸载时执行（模拟componentDidMount和componentWillUnmount）。
  2. 无依赖数组‌：每次渲染后都执行。
  3. ‌特定依赖`[a, b]`‌：当a或b变化时执行。
  :::

## useState 的工作原理是什么？
  1. useState 是一个 Hook，用于在函数组件中添加状态。
  2. 返回一个数组，包含当前状态值和更新状态的函数。
  3. useState 内部使用闭包保存状态，每次调用返回最新值。
  4. 每次渲染都会重新创建新的状态更新函数，但不会影响已渲染的组件。
  ::: warning 执行setState 为什么是异步的？
  在 React 中，状态更新是异步的。当你调用 setState 时，React 会将更新排入队列，并在下一次渲染时应用这些更新。因此，你不能直接通过 setState 的返回值来获取更新后的状态值。
  1. 更新 state 会请求使用新的 state 值再次渲染，但不会影响已运行事件处理程序中的 JavaScript 变量。
  2. 如果需要使用 next state，可以在传递给 set 函数之前将其保存在变量中：
  3. 调用 setState 并传递一个新的值来更新state状态
  3. 当更新状态依赖于前一个状态时，你可以使用函数式更新的方式来更新state状态
  :::

## 类组件的setState 的工作原理是什么？
1. 传递一个对象来更新组件的状态。这个对象包含了你想要更新的状态字段和它们的新值。
2. 当更新状态依赖于前一个状态时，你可以使用函数式更新的方式来避免竞争条件。
3. setState 还接受一个可选的回调函数作为第二个参数。这个回调函数将在状态更新并且组件重新渲染后被调用。这通常用于在状态更新后执行一些副作用操作，如设置DOM属性或调用其他函数等。
4. setState 的异步行为 是为了性能优化，React 会批量处理多个 setState 调用。如果你需要在更新后立即获取最新的状态值，可以使用回调函数或 useEffect Hook 来访问最新状态。
::: tip 为什么setState 是异步的？
性能优化：React 会批量处理多个 setState 调用，只在组件重新渲染时应用它们。这样可以减少不必要的更新和重绘操作。
:::

## useReduer 的工作原理是什么？
1. useReducer 是一个 Hook，用于在函数组件中管理复杂状态。
2. 它接收一个 reducer函数 和一个 初始状态 作为参数。
3. reducer 函数 类似于 Redux 的 reducer，根据当前状态和动作返回新状态。
4. 返回一个数组，包含当前状态值和dispatch函数。 

## useRef() 的作用是什么？
1. useRef 是一个 Hook，用于在函数组件中创建可变的引用。
2. 返回一个对象，包含current属性。
3. 可用于直接访问DOM元素或保存任何可变值。

## forwordRef 的作用是什么？
1. forwardRef 是一个高阶组件，用于转发ref到子组件。
2. 允许父组件将ref传递给子函数组件。
3. forwardRef 返回一个组件，该组件接收ref作为第二个参数。

## useImperativeHandle 的作用是什么？
1. useImperativeHandle 是一个 Hook，用于自定义暴露给父组件的ref对象。
2. 它接收一个ref对象和一个创建对象的函数作为参数。
3. 可以控制哪些属性和方法可以被外部访问。

## React Router 的核心API有哪些？‌ 
### 数据模式
1. createBrowserRouter 创建浏览器路由, 返回一个router对象。
2. createHashRouter 创建hash路由, 返回一个router对象。
3. router对象包含path,Component,loader,action等属性。
4. RouterProvider 渲染路由组件。
### 声明式模式
1. BrowserRouter组件包裹应用，提供路由功能。
2. Routes组件包裹路由规则。
3. Route组件定义路由规则，path,element属性。
4. 路由可以嵌套在父路由中。
5. 子路由通过父路由中的 `<Outlet/>` 进行呈现。
### 路由导航
1. Link组件用于导航，to属性指定路径。
2. NavLink组件用于导航，具有active样式。
3. useNavigate 编程式导航函数。
### 路由参数
1. 查询参数 useSearchParams 获取查询字符串`(?name=xxx&age=18)`。
2. 动态路由参数 useParams 获取路径参数`(path:/id)`。
3. state参数 useLocation 获取location对象。(`{path:'/',state:{name:'xxx'}}`)

## Redux 的工作流程是怎样的？‌
1. ‌Action‌：描述事件的普通对象`（如{type: 'ADD_TODO', payload: '...'}）`。
2. Reducer‌：纯函数，根据旧状态和`Action`生成新状态。
3. Store‌：保存全局状态，通过`dispatch(action)`触发更新。
4. ‌Middleware‌：处理异步逻辑`（如redux-thunk）`。

## redux-thunk 的作用是什么？
1. redux-thunk 是 Redux 的一个中间件.
2. 返回一个函数，该函数接收dispatch和getState作为参数。
3. 允许异步操作，如API请求。
```js
// 1.安装 redux-thunk npm install redux-thunk
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export const fetchData = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch('');
      const data = await response.json();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', error });
    }
  };
};
```

## `jsx`是什么？
:::tip JSX
1. `JSX` 是 `JavaScript XML` 的缩写，允许在`JS`代码中写`HTML`。
2. 编译时转换为`React.createElement`调用。
3. 可以使用`Babel`插件如`@babel/preset-react`进行转换。
4. 使用`className`代替`class`，使用驼峰命名法。
5. 可以嵌入表达式`{expression}`。
6. 绑定事件如`onClick={handleClick}`。
7. 绑定样式。
8. 绑定变量。
:::

## React 的懒加载`（Lazy Loading）`如何实现？
1. `React.lazy`用于动态导入组件。
2. `Suspense` 包裹懒加载的组件，显示`loading`状态。
3. 使用`import()`语法进行代码分割。
```js
const LazyComponent = React.lazy(() => import('./LazyComponent'));
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
``` 

 ## 纯函数是什么？
1. 纯函数是指不改变外部状态的函数。
2. 接受相同的输入，总是返回相同的结果。
3. 无副作用，不修改外部变量。

## react 中 css 模块化方案有哪些？
1. CSS Modules：通过webpack等构建工具实现，使用类名局部作用域。编译时将类名转换为唯一哈希值。
2. CSS-in-JS：如styled-components，使用JavaScript编写样式 组件级样式隔离、动态样式、自动前缀、主题支持。。
3. tailwindcss：实用优先的CSS框架，通过工具类实现快速样式。

## React 和 Vue 的核心差异？
React 强调灵活性（JS 优先），Vue 提供更多内置功能（如模板语法、响应式系统）。

## 什么是单向数据流？为什么重要？
1. 单向数据流是一种架构模式，其中数据只能从父组件流向子组件。
2. 重要是因为它简化状态管理、提高可预测性和维护性。
3. React 通过props实现单向数据流，确保应用逻辑清晰和易于追踪。

## ‌SPA（单页应用）的优缺点？
1. 优点：快速加载、无需重新加载页面即可更新内容。
2. 缺点：首屏加载时间长，SEO较差（可通过SSR解决）。

## React 18 的新特性有哪些？
1. 并发模式（Concurrent Mode）：通过可中断的渲染过程，允许 React 同时处理多个状态更新，优先响应用户交互，提升应用流畅性。
2. 自动批处理（Automatic Batching）：多个状态更新合并为单次渲染，提升性能。异步操作中的多次 setState 会被合并，触发一次渲染。
3. 新Hooks：useId（生成唯一ID）、useTransition（区分紧急/非紧急更新）。
4. createRoot 替代 `ReactDOM.render`‌：启用并发特性必须使用 createRoot。