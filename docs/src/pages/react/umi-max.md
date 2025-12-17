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
    render
    patchClientRoutes
    rootContainer
    getInitialState
    onRouteChange
    layout

### layout 函数
```ts
const layoutConfig: RunTimeLayoutConfig = (props) => {
  console.log('layout');
  const { initialState } = props;
  return {
    title: '我的umi-max',
    pageTitleRender: (props,defaultPageTitle,info)=>{
      return info?.pageName + ''
    },
    siderWidth: 200,
    contentStyle: {
      padding: '0',
    },
    menu: {
      locale: false,
      // 如果只需要根据用户权限‌显示不同的菜单‌，但所有页面的路由路径都是固定的、预先定义好的，那么‌只用 menu.request 就够了‌
      // 如果需要‌动态添加或删除整个页面的访问路由‌，才需要使用 patchClientRoutes
      // request:async (params, defaultMenuData) => {
      //   return defaultMenuData;
      // },
    },
    layout: 'mix',
    menuHeaderRender:initialState?.showMenuHeader ?() => <div>头部</div> : undefined,
    menuItemRender: (item,dom:any) => { // 定制化菜单渲染
      const newDom = {
        ...dom,
        props: {
          ...dom.props,
          children:[
            {...dom.props.children[0]},
            {
              ...dom.props.children[1],
              props:{
                ...dom.props.children[1].props,
                children: item.name
              }
            }
          ]
        }
      }
      // 修改菜单名称
      // Umi.js 的菜单渲染机制默认只显示一级菜单的图标，这是出于设计考虑
      return (
        <Link to={item.path!}>
          <div style={{display:'flex',alignItems:'center'}}>
            {item.pro_layout_parentKeys && 
              item.pro_layout_parentKeys.length > 0 &&
              <span style={{paddingRight:'10px'}}>
                {item.icon}
              </span>}
            {newDom}
          </div>
        </Link>
      )
    },
    rightContentRender: () => <div>右侧内容</div>,
    childrenRender: (children) => {
      return <div>
              {children}
             </div>
    },
    footerRender: () => {
      return <div style={{textAlign:'center',color:'#999'}}>
        umi-max 页脚配置
        </div>
    },
    unAccessible: <div>无权限</div>,
    noFound: <div>404</div>,
    logout: async () => {
      // 退出登录逻辑
    },
  };
};
```

## 自定义layout的方式
1. 自定义框架layout
2. 完全自定义layout

## 动态创建路由
1. patchClientRoutes 中获取远程数据
2. 转换成路由配置数据格式
3. 动态添加到路由