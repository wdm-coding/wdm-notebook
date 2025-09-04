# 添加动态路由

## 1. 将后端菜单数据转换为路由配置
1. `menu.component` 可以是映射数据，也可以是动态组件路径。
2. `route.redirect` 如果是多层次嵌套，需要将每个层级的第一个子路由路径拼接起来。
3. `route.children` 需要递归调用 `transformRoutes(menu.children)`。
```ts
interface MenuItem {
  id: number | string;
  path: string;
  name: string;
  component: string;
  meta: {
    title: string;
    icon?: string;
  };
  children?: MenuItem[];
}
export function transformRoutes(menuData:MenuItem[]):RouteRecordRaw[] {
  return menuData.map(menu => {
    const route:RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      children: []
    }
    if(menu.meta){
      route.meta = { ...menu.meta }
    }
    if (menu.component) {
      if(menu.component === 'CustomUILayout'){
        route.component = () => import('@/custom-ui/Layout/index.vue')
      } else {
        route.component = () => import(`@/custom-ui/pages/${menu.component}/index.vue`)
      }
      if(!route.component){
        console.error(`组件路径@/custom-ui/pages/${menu.component}/index.vue不存在，请检查！`)
      }
    }
    if (menu.children) {
      // 设置route.redirect 为第一个子路由的路径，实现重定向到第一个子路由
      route.redirect = [menu.path,menu.children[0].path].join('/')
      route.children = transformRoutes(menu.children)
    }
    return route
  })
}
```

## 2. 将后端获取的菜单数据生成动态路由
```ts
function addDynamicRoutes(
  dynamicRoutes:RouteRecordRaw[], // 参数1. 后端返回的菜单数据
  parentRoute:RouteRecordNameGeneric | string | null = null, // 参数2. 当前父路由的名称，默认为null
  router:Router // 参数3. Vue Router实例
):void {
  // 将动态路由添加到路由实例中
  dynamicRoutes.forEach(route => {
    if(parentRoute){
      // 如果有父路由，则添加到父路由下
      router.addRoute(parentRoute, route)
    }else{
      // 没有父路由，则直接添加到根路由下
      router.addRoute(route)
    }
    // 递归添加子路由
    if (route.children && route.children.length) {
      addDynamicRoutes(route.children, route.name, router)
    }
  })
  // 注意：通配页面需要最后添加，staticRoutes只需要在最后放在404页面的路由，每次动态添加后需要重新设置404通配路由
  router.addRoute({
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  })
}
```

## 3. 初始化动态路由封装
```ts
async function initDynamicRoutes(router:Router) {
  // 从后端获取菜单数据
  const { code,data } = await getMenuList()
  if(code === 0){
    if(!data || data.length === 0){
      console.error('菜单数据为空，请检查后端接口！')
      return
    }else{
      // 将菜单数据存储到本地缓存中，以便后续使用
      storage.set('menuData', data)
      // 将菜单数据转换为路由配置
      const dynamicRoutes = transformRoutes(data)
      // 将转换后的路由配置添加到Vue Router实例
      addDynamicRoutes(dynamicRoutes, null, router)
    }
  }else{
    console.error('获取菜单数据失败，请检查后端接口！')
  }
}
```

## 4. 在路由守卫中调用初始化动态路由
```ts
function beforeEach(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 判断是否已经加载过动态路由
    const isDynamicRoutesLoaded = storage.get('isDynamicRoutesLoaded')
    // 如果已经加载过，则直接跳转
    if(isDynamicRoutesLoaded){
      next()
    }else{
      // 如果未加载过，则初始化动态路由并设置标志位
      await initDynamicRoutes(router)
      storage.set('isDynamicRoutesLoaded', true)
      // 跳转到当前路由，实现刷新页面效果
      next({ ...to, replace: true })
    }
  })    
}
```

## 5. 在`main.ts`中解决刷新页面时动态路由丢失的问题
```ts
// 刷新页面后获取缓存的菜单数据
const menuData:any[] | null = storage.get('menuData')
// 如果有缓存的菜单数据，则初始化动态路由
if(menuData && menuData.length > 0){
  const dynamicRoutes = transformRoutes(menuData)
  addDynamicRoutes(dynamicRoutes, null, router)
}
```