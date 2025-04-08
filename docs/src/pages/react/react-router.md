# react 路由

## 安装依赖
  npm install react-router-dom

## 路由基本使用

### 1.创建router实例对象并且配置路由表

```js
import {createBrowserRouter} from 'react-router-dom';

import Home from '../pages-c/views/home.js';
import Login from '../pages-c/views/login.js';
const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    }
])

export default router;
```
### 2.使用Router组件包裹layout根组件

```js
import {RouterProvider} from 'react-router-dom'
import router from '../router/index.js'
function PagesC(){
    return (
        <div>
            <h1 style={{fontSize:'32px'}}>React-Router</h1>
            <hr />
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}
export default PagesC;
```

## 路由导航

### 1.声明式导航
  使用Link组件进行导航
  ```js
    import { Link } from 'react-router-dom'
    <Link to="/login">登录</Link>
  ```
### 2.编程式导航
  使用useNavigate钩子函数实现导航跳转
  ```js
    import { useNavigate } from 'react-router-dom'
    const navigate = useNavigate()
    navigate('/login')
  ```

## 路由传参
  
### 1.查询参数 使用useSearchParams钩子函数获取查询参数
  + 以问号开头，跟在路径后面传递参数，传递多个参数使用&连接。
  + 使用useSearchParams钩子函数获取查询参数
```js
  import { useSearchParams } from 'react-router-dom'
  <Link to="/login?id=1&name=zhangsan">登录</Link>
  // 在组件中使用useSearchParams钩子函数获取查询参数
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
```
### 2.URL参数 使用useParams钩子函数获取params参数
  + 路由配置中使用:定义动态路由参数 
  + 在组件中使用useParams钩子函数获取params参数
```js
  // /user/:id 路径中id为动态路由参数
  import { useParams } from 'react-router-dom'
  <Link to="/user/1">用户</Link>
  // 在组件中使用useParams钩子函数获取params参数
  const params = useParams();
  const id = params.id;
```
### 3.状态参数 使用useLocation钩子函数获取state参数
  + 使用state属性传递状态参数
  + 在组件中使用useLocation钩子函数获取state参数
```js
  import { useNavigate, useLocation } from 'react-router-dom'
  const navigate = useNavigate();
  navigate('/login',{ state: { id: 1, name: 'zhangsan' } });
  // 在组件中使用useLocation钩子函数获取state参数
  const location = useLocation();
  const state = location.state;
  const id = state.id;
  const name = state.name;
```

## 路由嵌套
  + 在父路由中配置子路由
  + 使用outlet组件渲染子路由
```js
  import { Outlet } from 'react-router-dom'
  const router = createBrowserRouter([
      {
        path: '/',
        element: <AuthGuard />,
        children:[
          {path: '/', element: <Home />},
          {path: '/user/:id', element: <User />},
        ]
      },
      {
        path: '/login',
        element: <Login />,
      }
  ])
  // 在AuthGuard组件中使用Outlet组件渲染子路由
  function AuthGuard() {
    return <div><Outlet /></div>;
  }
```

::: tip
  + index属性设置默认二级路由渲染 
  ```js
  在设置二级路由去掉配置的path属性，在父路由中使用index属性标记默认渲染的子路由。
  const router = createBrowserRouter([
      {
        path: '/',
        element: <AuthGuard />,
        children:[
          {element: <About />,index: true},
          {path: '/home', element: <Home />},
          {path: '/user/:id', element: <User />},
        ]
      },
      {
        path: '/login',
        element: <Login />,
      }
  ])
  ```
:::

## 404页面配置
  + 使用*配置404页面
```js
const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthGuard />,
      children:[
        {index: true, element: <About />},
        {path: '/home', element: <Home />},
        {path: '/user/:id', element: <User />},
      ]
    },
    {
      path: '/login',
      element: <Login />,
    },
    // 配置404页面
    {
      path: '*',
      element: <NotFound />,
    }
])
```

## 路由模式
  <img src="/assets/react/7.png" alt="路由模式" style="margin-top:15px">

## Token 控制路由权限
  1. 定义路由守卫组件(高阶组件)
  <img src="/assets/react/9.png" alt="路由模式" style="margin-top:15px">
  2. 使用路由守卫组件控制路由权限

```js
import { Navigate } from 'react-router-dom'
function AuthGuard({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

## 项目中路由配置

### API 路由配置
1. 安装React-Router
```bash
$ npm install react-router-dom
```
2. 项目根目录下创建`src/router/index.tsx`文件
3. 配置文件内容
```js
import { createHashRouter, RouteObject } from 'react-router-dom'
const router: RouteObject[] = [
	{ path: '/', element: <div>首页</div> },
	{ path: '/about', element: <div>关于</div> },
	{ path: '/user', element: <div>用户</div> }
]
export default createHashRouter(router)
```

4. 通过RouterProvider组件包裹App
```js
import { RouterProvider } from 'react-router-dom'
import router from './router'
function App() {
	return <RouterProvider router={router} />
}
export default App
```

5. 创建嵌套路由
```js
import { createHashRouter, RouteObject } from 'react-router-dom'
const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'user', element: <div>用户</div> },
      { path: 'about', element: <div>关于</div> }
    ]
  }
]
export default createHashRouter(router)
// 在Home.tsx中使用
import { Outlet } from 'react-router-dom'
function Home() {
  return (
    <div>
      Home
      <Outlet />
    </div>
  )
}
export default Home
```

6. 创建动态路由
```js
import { createHashRouter, RouteObject } from 'react-router-dom'
const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'user/:id', element: <User /> },
      { path: 'about', element: <div>关于</div> }
    ]
  }
]
export default createHashRouter(router)
// 在User.tsx中使用
import { useParams } from 'react-router-dom'
function User() {
  const { id } = useParams()
  return <div>用户{id}</div>
}
export default User
```
7. Loader API
 + Loader API 允许你在路由加载时执行异步操作，例如从服务器获取数据。
 + 使用`loader: async () => {}`
 + 使用`useLoaderData()`获取数据

8. Action API
 + Action API 允许你在表单提交时执行异步操作，例如向服务器发送数据。
 + 使用`action: async () => {}`
 + 使用`useActionData()`获取数据


```js
import { createHashRouter, RouteObject } from 'react-router-dom'
const router: RouteObject[] = []
```
### 组件化路由配置
1. 在`APP.tsx`引入BrowserRouter或者HashRouter组件
2. 引入Routes和Route组件
3. 在`APP.tsx`中使用Routes和Route组件包裹页面组件

```js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App
```

4. 创建嵌套路由
```js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
import User from '@/views/Home/User.tsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<div>首页</div>} />
          <Route path="user" element={<User />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
```

5. 创建动态路由
```js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
import User from '@/views/Home/User.tsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<div>首页</div>} />
          <Route path="user/:id" element={<User />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
```

### 路由跳转的方式
  + Link 组件包裹a标签，实现路由跳转
  ```js
  import { Link } from 'react-router-dom'
  <Link to="/about">关于</Link>
  ```
  + NavLink 组件包裹a标签，实现路由跳转并高亮当前路径
  ```js
  import { NavLink } from 'react-router-dom'
  <NavLink to="/about">关于</NavLink>
  ```
  + Navigate 组件实现路由重定向
  ```js
  import { Navigate } from 'react-router-dom'
  <Navigate to="/about" />
  ```
  + useNavigate hook 实现路由跳转
  ```js
  import { useNavigate } from 'react-router-dom'
  const navigate = useNavigate()
  navigate('/about')
  ```
  
### API路由 + 组件化路由配置
1. 安装React-Router
```bash
$ npm install react-router-dom
```
2. 项目根目录下创建`src/router/index.tsx`文件
```ts
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import NotFound from '@/views/NotFound.tsx'
import Home from '@/views/Home/index.tsx'
import Layout from '@/layout/index.tsx'
// 定义路由配置数组
const router: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: 'home', element: <Home /> },
			{ path: 'about', element: <div>about</div> }
		]
	},
	{ path: '/login', element: <Login /> },
	{ path: '/404', element: <NotFound /> },
	{ path: '*', element: <Navigate to="/404" /> }
]
// 创建路由组件
function Router() {
	return useRoutes(router)
}
export default Router
// 在App.tsx中使用
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
// API+组件化创建的路由
function App() {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	)
}
export default App
```



    

