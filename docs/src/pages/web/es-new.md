# ES6 +

## 无序 和 有序
1. 无序的集合 Object 操作快
2. 有序的集合 Array 操作慢

## Map 和 Object
1. Map 本质上是键值对的集合,但是一个有序结构。
2. Object 的本质是键值对的集合（但传统上用于保存具有可枚举属性的对象）
3. 迭代顺序：Map 按插入顺序，Object 按创建顺序
4. 性能：在频繁增删键的情况下，Map 表现出色；相比之下，Object 的 key 是字符串，更类似于数组。
5. 键类型：Map的键可以是任意值，包括函数、对象或任何基本类型，而Object的键只能是字符串或者Symbol。
6. 大小属性：Map有size属性可以直接获取其成员总数，而Object没有这个属性，要知道一个对象有多少个键只能手动去遍历。
7. 清除方法：Map直接使用clear()可以清除所有成员，而Object需要结合for循环等其他方法来删除所有元素。
8. 计算属性名：在ES6中可以使用`[ ]`来设置对象的动态属性名，而在Map中可以直接通过set(key, value)添加数据。
9. 转换方便性：如果想将Map转换为数组，[...map]即可实现，而对于Object则需要使用Object.keys(), Object.values(), Object.entries()等方法配合展开运算符来实现类似的功能
```js
const m = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3']
])
// 添加一个新键值对或更新一个已存在的键值对
m.set('key4', 'value4')
// 删除一个键值对
m.delete('key2')
// 检查Map中是否存在某个键值对
m.has('key3') // 输出: true
// 获取Map的大小（即键值对的数量）
m.size // 输出: 3
// 清空Map中的所有键值对
m.clear()
// 获取Map的迭代器，可以遍历所有的键、值或[键, 值]数组
m.forEach((value, key) => {
  console.log(key, value)
})
m.keys() // 输出: MapIterator {"key1", "key2", "key3"}
m.values() // 输出: MapIterator {"value1", "value2", "value3"}
// 遍历Map中的所有键值对
for (const [key, value] of map.entries()) {
  console.log(key, value)
}
// key可以是任意类型，包括对象
const objKey = { name: 'John' }
m.set(objKey, 'value5')
// 获取键对应的值
m.get(objKey) // 输出: 'value5'
// 获取键对应的值，如果不存在则返回undefined
m.get('key10') // 输出: undefined
// 转换为数组
const arr = [...m] // 输出: [['key1', 'value1'], ['key3', 'value3'], [objKey, 'value5']]
```

## Set 和 数组 的对比
1. Set 是一个值的集合，其中的值都是唯一的。
2. Set 是无序的,没有索引。
```js
const arr = new Set([1, 2, 3])
// 新增元素
arr.add(4)
// 删除元素
arr.delete(3)
// 判断是否存在某个元素
// console.log(arr.has(2))
// 清除所有元素
// arr.clear()
// size 属性
// console.log(arr.size)
// 遍历元素
for (let item of arr) {
  // console.log(item)
}
// 遍历key
console.log(arr.keys())
// 遍历value
console.log(arr.values())
// 遍历key和value
for (let [key, value] of arr.entries()) {
  console.log(key, value)
}
```

## WeakMap
1. WeakMap 只接受对象作为键名（null除外），不接受其他类型的值作为键名。
2. WeakMap 是弱引用，即如果其他对象都不再引用该对象，那么这些对象占用的内存就会被垃圾回收掉。
3. WeakMap 不能遍历，因此没有keys()、values()和entries()方法。
4. 使用场景：两个对象建立关联关系，又想保证两个对象独立
```js
const wMap = new WeakMap()
function fun(){
  const obj = { name: 1 }
  wMap.set(obj, 'abc') // gc 回收 obj
}
console.log(wMap)
```
## WeakSet
1. WeakSet 是一个集合，其中的元素都是唯一的。
2. WeakSet 是弱引用，只能用对象作为成员，不能用其他类型的值。
3. WeakSet 没有size属性，不能遍历。
```js
const wSet = new WeakSet()
function fun(){
  const obj = { name: 1 }
  wSet.add(obj) // gc 回收 obj
}
fun()
console.log(wSet)
```

