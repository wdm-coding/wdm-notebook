/* 模拟vue的响应式原理，实现数据劫持和依赖收集*/

// 触发视图更新
function updateView(key){
  console.log(`${key}-视图更新`);
}
// 监听数据变化，更新视图
function defineReactive(target,key,value){
  observe(value);
  Object.defineProperty(target,key,{
    enumerable:true, // 可枚举
    configurable:true, // 可配置
    get(){
      return value;
    },
    set(newValue){
      if(value !== newValue){
        observe(newValue);
        // 设置新值是也要监听变化，深度监听
        value = newValue;
        updateView(key); // 视图更新
      }
    }
  })
}
// 重写数组的方法，监听数组变化
const oldArrayProto = Array.prototype; // 获取原始数组原型对象
const newArrayProto = Object.create(oldArrayProto); // 创建新数组原型对象，继承原始数组原型对象
['push','pop','shift','unshift','splice',''].forEach((method)=>{
  newArrayProto[method] = function(){
    // 调用原始数组方法
    oldArrayProto[method].call(this,...arguments);
    updateView(...arguments); // 视图更新
  }
})
// 遍历对象，监听每个属性变化
function observe(obj){
  if(typeof obj !== 'object' || obj === null) return
  if(Array.isArray(obj)){
    obj.__proto__ = newArrayProto; // 重写数组原型对象，监听数组变化
    return
  }
  Object.keys(obj).forEach((key)=>{
    defineReactive(obj,key,obj[key]);
  })
}
// 定义set方法，监听对象变化
function $set(target,key,value){
  defineReactive(target,key,value);
  updateView(key); // 视图更新
}
// 定义delete方法，监听对象变化
function $delete(target,key){
  delete target[key];
  updateView(key); // 视图更新
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
data.info = {
  height:190,
  desc:{
    a:10
  }
}
delete data.name;
data.arr.push(4); // 数组变化，视图更新
$set(data,'x',100)
$set(data.arr,1,100);
$delete(data.info.desc,'a')