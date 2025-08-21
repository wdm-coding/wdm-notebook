// reactive 函数，用于创建响应式对象
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
// ref 函数，用于创建响应式引用
function ref(val){
  return reactive({value: val})
}
// 视图更新函数，用于模拟视图更新操作
function updateView() {
  console.log("视图更新")
}
const obj = {
  name: 'xxx',
  age: 18,
  hobbies: ['coding', 'reading'],
  desc:{
    face:"a",
    sex:"b",
    other:"c"
  }
}
const arr = [1,2,3]

// reactive 函数测试对象
// const proxyObj = reactive(obj);
// proxyObj.name = 'yyy'; // 触发 get 方法，输出：获取属性 name
// proxyObj.xxx = 'xxx' // 设置原始对象不存在的属性，触发 set 方法，输出：设置属性 xxx 为 xxx
// proxyObj.age = 20; // 触发 set 方法，输出：设置属性 age 为 20
// proxyObj.desc.xxxccc= 'xxxsss'; // 触发 set 方法，输出：设置属性 sex 为 b
// delete proxyObj.hobbies; // 触发 deleteProperty 方法，输出：删除属性 hobbies
// reactive 函数测试数组
// const proxyArr = reactive(arr);
// proxyArr[1] = 'two'; // 触发 set 方法，输出：设置属性 1 为 two
// proxyArr.push(4); // 触发 set 方法，输出：设置属性 length 为 4
// 测试 ref 函数
// const proxyRef = ref(10);
// proxyRef.value = 20; // 触发 set 方法，输出：设置属性 value 为 20