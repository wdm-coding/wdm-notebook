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


  





    

