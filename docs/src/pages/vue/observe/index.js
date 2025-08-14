/* 模拟vue的响应式原理，实现数据劫持和依赖收集*/

// 触发视图更新
function updateView(){
  console.log('视图更新');
}
// 监听数据变化，更新视图
function defineReactive(target,key,value){
  Object.defineProperty(target,key,{
    enumerable:true, // 可枚举
    configurable:true, // 可配置
    get(){
      return value;
    },
    set(newValue){
      if(value !== newValue){
        console.log('属性值变化',key);
        value = newValue;
        updateView(); // 视图更新
      }
    }
  })
}
// 遍历对象，监听每个属性变化
function observe(obj){
  if(typeof obj !== 'object' || obj === null) return obj;
  Object.keys(obj).forEach((key)=>{
    if(typeof obj[key] === 'object' && obj[key] !== null){
      observe(obj[key]);
    }else{
      defineReactive(obj,key,obj[key]);
    }
  })
}
// 响应式数据对象
const data = {
  name:'wdm',
  age:18,
  info:{
    height:180,
    weight:70,
    desc:{
      a:1
    }
  },
  arr:[1,2,3]
}
// 监听数据变化
observe(data);

data.name = 'wdm2'; // 监听单个属性变化，视图更新
data.age = 19; // 监听单个属性变化，视图更新
data.info.height = 185; // 深度监听，视图更新
data.info.desc.a = 2; // 深度监听，视图更新
data.arr.push(4); // 数组变化，视图更新