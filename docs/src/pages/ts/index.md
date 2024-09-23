# Typescript基础

[typescript 官网](https://www.typescriptlang.org/)

[typescript 中文网站](https://www.tslang.cn/)

[typescript 中文文档](https://typescript.bootcss.com/)

[typescript 外部链接](https://front-end.toimc.com/notes-page/basic/ts/)

## 生成tsconfig.json

```bash
npx tsc --init
```

## 编译ts文件

```bash
npm i -D typescript nodemon ts-node

nodemon --exec ts-node src/index.ts
```

## 基础类型

boolean, number, string,  symbol, null 和undefined

```typescript
// string
const msg:string = 'Hello World!!';
// boolean
const isDone:boolean = true;
// Array 字面量
const a:number[] = [1,2,3];
const b:any[] = [1,2,'3'];
const arr3: (string | number)[] = ['1','2',3];
// Array 构造函数
const arr1: Array<string> = ['1','2',1];
const arr2: Array<string | number> = ['1','2',3];
// object 字面量
const objS:{name:string,age?:number} = {name:'Jack'};
// object 构造函数
const obj:object = {name:'Jack'};
```


## 对象类型

```typescript
{} 或者 object,  [] 或者 Array<any>, 还有function, Class类型
```

## 可选属性 ？

```typescript
const objS:{name:string,age?:number} = {name:'Jack'};
```

## Object 与 {} 与 object

::: warning
与Object类型相同的{}是最不具体的，可以将对象、数组和基元分配给它；

object是更具体的，类似于{ [key: string]: any }；

可以给它分配对象和数组，但不能分配原始类型的数据；

{ [key: string]: string }是最具体的，它不允许任何原始类型、数组或具有非字符串值的对象被分配到它。
:::

```typescript
var o: object;
o = { prop: 0 }; // OK
o = []; // OK
o = 42; // Error
o = "string"; // Error
o = false; // Error
o = null; // Error
o = undefined; // Error

var p: {}; // or Object
p = { prop: 0 }; // OK
p = []; // OK
p = 42; // OK
p = "string"; // OK
p = false; // OK
p = null; // Error
p = undefined; // Error

var q: { [key: string]: any };
q = { prop: 0 }; // OK
q = []; // OK
q = 42; // Error
q = "string"; // Error
q = false; // Error
q = null; // Error
q = undefined; // Error

var r: { [key: string]: string };
r = { prop: 'string' }; // OK
r = { prop: 0 }; // Error
r = []; // Error
r = 42; // Error
r = "string"; // Error
r = false; // Error
r = null; // Error
r = undefined; // Error
```
::: warning
number和Number的区别：TS中指定类型的时候要用number，这个是TypeScript的类型关键字。而Number为JavaScript的原生构造函数，用它来创建数值类型的值；

TypeScript 和 JavaScript 一样，所有数字都是浮点数，所以只有一个number类型，而没有int或者float类型；

TypeScript 还支持 ES6 中新增的二进制和八进制数字字面量，TypeScript 中共支持二、八、十和十六四种进制的数值；

默认情况下 undefined 和 null 可以赋值给任意类型的值；当你在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，那必须严格对待，undefined 和 null 将只能赋值给它们自身和 void 类；TS 对可选属性和对可选参数的处理一样，会被自动加上|undefined；

object是引用类型
:::

## any 任意类型 (可以赋值任何类型,可以调用任何属性)

## void 空类型 (只能赋值undefined)

## never 永远不会返回的类型

## unknow 未知类型 (可以赋值任何类型,但是不能调用任何属性,除非有类型判断)

## tuple 元组类型 
固定类型与长度的数组

数组中每个元素都有类型,且不能添加或删除元素,且不能修改元素的值

```typescript
  let x: [string, number];
  x = ['hello', 10]; // OK
  x = [10, 'hello']; // Error
  x[3] = 'world'; // Error
  x[1] = 20; // Error
```

## enum 枚举类型

<div>
  <p>Color: {{Color}}</p>
  <p>Gender.Female: {{Gender.Female}}</p>
  <p>Gender[2]: {{ Gender[3] }}</p>
</div>

枚举类型可修改索引值’
<div>
  <p>Index: {{Index}}</p>
  <p>Index.a: {{Index.a}}</p>
  <p>Index[1025]: {{Index[1025]}}</p>
</div>

```typescript
enum Color {Red, Green, Blue}

enum Gender {Male, Female}

enum Index {a,b,c}
```


<script lang='ts' setup>
  enum Color {Red, Green, Blue}
  enum Gender {Male, Female}
  enum Index {
    a = 1024,
    b,
    c
  }
  
</script>