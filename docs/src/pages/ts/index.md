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
# ts-node 直接运行ts文件
nodemon --exec ts-node src/index.ts
```

## 类型注解
为变量指定类型，提高代码的可读性和可维护性。

## 类型推断
TypeScript会在没有明确的指定变量类型的时候推测出一个类型，即自动判断变量的类型。

## 基础类型
boolean, number, string,  symbol, null 和undefined

## 交叉类型
将多个类型合并为一个类型，使用 & 符号连接。 

## 联合类型
表示取值可以为多种类型中的一种,使用 | 符号连接。

## 字面量数据类型
```ts
type num = 1 | 2 | 3;
let name: num = 1;
```

## 字面量 与 构造函数
1. `{} 或者 object`,  
2. `[] 或者 Array<any>`, 
3. 还有function, Class类型

## 可选属性`？`
```typescript
const objS:{name:string,age?:number} = {name:'Jack'};
```

## Object 与 {} 与 object
1. 与Object类型相同的{}是最不具体的，可以将对象、数组和基元分配给它；
2. object是更具体的，类似于{ [key: string]: any },可以给它分配对象和数组，但不能分配原始类型的数据；
3. { [key: string]: string }是最具体的，它不允许任何原始类型、数组或具有非字符串值的对象被分配到它。

## undefined 和 null 类型
1. 默认情况下 undefined 和 null 可以赋值给任意类型的值；
2. 当你在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，那必须严格对待，undefined 和 null 将只能赋值给它们自身和 void 类
3. TS 对可选属性和对可选参数的处理一样，会被自动加上 | undefined；

## any 任意类型 
可以赋值任何类型,可以调用任何属性

## void 空类型
只能赋值undefined,不能赋值其他类型

## never 永远不会返回的类型
1. 抛出异常
2. 无限循环
3. 使用never避免出现未来扩展新的类型，可以使用never类型来阻止编译器推断出新的类型。

## unknow 未知类型
可以赋值任何类型,但是不能调用任何属性,除非有类型判断

## tuple 元组类型 
1. 固定类型与长度的数组 
2. 只能赋值给定义的元素类型，不能添加或删除元素,可以修改元素的值
```typescript
  let x: [string, number];
  x = ['hello', 10]; // OK
  x = [10, 'hello']; // Error
  x[3] = 'world'; // Error
  x[1] = 20; // Error
```

## enum 枚举类型
```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 使用
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
console.log(Days[Days.Sun] === "Sun"); // true
console.log(Days[Days.Mon] === "Mon"); // true
console.log(Days[Days.Tue] === "Tue"); // true
console.log(Days[Days.Sat] === "Sat"); // true
```