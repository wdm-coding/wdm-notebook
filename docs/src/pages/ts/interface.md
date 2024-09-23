# Interface 接口

<div>
  <p>point  {{point}}</p>
</div>

```typescript
  interface Point {
    x: string
    y: number
  }

  const point: Point = {
    x: '123',
    y: 456
  }
```
## 接口的继承 extends

<div>
  <p>inter  {{inter}}</p>
</div>

```typescript
  interface PublicInter {
    a: string
    b: number,
  }
  interface PublicInter2 {
    d: number
  }

  // 继承多个接口
  interface Inter extends PublicInter,PublicInter2 {
    c: number
  }

  const inter: Inter = {
    a: '123',
    b: 456,
    c: 789,
    d: 666
  }
```
## 定义函数接口

```typescript
  interface Func{
    (x:number, y:number): number
  }

  const add3: Func = (x, y) => {
    return x + y;
  }
```
## 定义索引类型

<div>
  <n-alert title="注意" type="error">
    当定义了索引类型后，数组或者对象原型链上的属性或者方法不存在
  </n-alert>
</div>

```typescript
  interface Role {
    [id:number]:string
  }

  const role: Role = ['admin', 'user']
  // role.length(不存在)
  const roleObj: Role = {
    1: 'admin',
    2: 'user'
  }
```
## 绕开多余的属性检查

```typescript
interface MyType {
  color: string,
}
const getTypes = (myType: MyType) => {
  return `${myType.color}`
}
// 1. 类型断言

getTypes({
  color: 'red',
  size: 123
} as MyType)

// 2.索引签名
interface MyType {
  color: string,
  [prop: string]: any
}
getTypes({
  color: 'red',
  size: 123,
  name: 'Jack'
})

// 3.类型兼容(不推荐)

const option = {
  color: 'red',
  size: 123,
  name: 'Jack'
}

const getTypes2 = ({color}: MyType) => {
  return `${color}`
}

getTypes2(option)
```


<script lang="ts" setup>

  interface Point {
    x: string
    y: number,
    z?: number
  }

  // 可以进行属性的扩展
  interface Point {
    a: string
  }

  const point: Point = {
    x: '123',
    y: 456,
    a: '123'
  }

  interface PublicInter {
    a: string
    b: number,
  }
  interface PublicInter2 {
    d: number
  }
  interface Inter extends PublicInter,PublicInter2 {
    c: number
  }
  const inter: Inter = {
    a: '123',
    b: 456,
    c: 789,
    d: 666
  }
  
  interface Func{
    (x:number, y:number): number
  }

  const add3: Func = (x, y) => {
    return x + y;
  }

  interface Role {
    [id:number]:string
  }

  const role: Role = ['admin', 'user']
  // role.length(不存在)
  const roleObj: Role = {
    1: 'admin',
    2: 'user'
  }
</script>