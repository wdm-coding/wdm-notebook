# Umi-Max 框架

## 项目初始化
+ 执行 npx create-umi@latest
+ 选择 Ant Design Pro

## app.ts 中的执行顺序
1. render函数
2. patchClientRoutes函数：react-router 渲染前执行
3. getInitialState函数：获取初始状态(自定义全局数据)
4. onRouteChange函数：路由变化时执行
5. layout函数：每次路由页面变化时执行


## 自定义layout的方式
1. 自定义框架layout
2. 完全自定义layout

## 动态创建路由
1. patchClientRoutes 中获取远程数据
2. 转换成路由配置数据格式
3. 动态添加到路由