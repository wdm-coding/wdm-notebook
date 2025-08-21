# vue3 的 响应式原理 proxy

## 为什么 Vue3 使用 Proxy 替代了 Object.defineProperty
1. Object.defineProperty 只能劫持对象的属性，而不能监听数组的变化
2. Object.defineProperty 深度监听需要一次性递归遍历每一个属性，性能较差。
3. Object.defineProperty无法监听属性新增和删除。

## Reflect 是什么?
1. 是一个内置对象，它提供拦截和自定义普通 JavaScript 操作的方法。
2. 它的方法与 Proxy 事件一一对应，基本上是对Proxy的静态方法的封装。
3. 它的作用是让Object操作都变成函数行为。
4. Reflect有get,set,deleteProperty,has等方法，和Proxy的方法一一对应。

## receiver 是什么?
1. 指的是 Reflect 操作的目标对象，或者说 handler 绑定的对象。
2. 正常情况下是 Proxy 实例对象，在 Reflect.get 的 polyfill 实现中需要使用到。
3. 举个例子，当 Reflect.get(target, 'a', receiver)触发时，receiver === proxy。

## 手写proxy实现响应式
1. 实现reactive函数
```js
function reactive(obj){
  // 非对象直接返回，避免不必要的包装
  if(typeof obj !== 'object' || obj === null) return obj;
  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      const ownKeys = Reflect.ownKeys(target);
      const result = Reflect.get(target, key,receiver);
      if(ownKeys.includes(key)){
        console.log(`获取属性${key}`);
        console.log(`获取result----${result}`);
      }
      // 进行深度响应式处理,只有访问对象属性时才进行深度响应式处理，不是一次性递归
      return reactive(result);
    },
    set(target, key, value, receiver) {
      if (value === target[key]) return true; // 避免死循环
      const ownKeys = Reflect.ownKeys(target);
      if(ownKeys.includes(key)){
        console.log(`已有属性----${key}`);
      }else{
        console.log(`新增属性----${key}`);
      }
      const result = Reflect.set(target, key, value,receiver);
      console.log(`设置属性${key}为${value}`);
      updateView(); // 视图更新
      return result;
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log(`删除属性${key}`)
      updateView(); // 视图更新
      return result
    }
  }
  const observed = new Proxy(obj, proxyConf);
  return observed;
}
```
2. 实现ref函数
```js
function ref(val) {
  return reactive({ value: val });
}
```