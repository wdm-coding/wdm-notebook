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

## any 任意类型 和 unknown 未知类型的区别？
1. any 类型可以赋值给任意类型，任意类型也可以赋值给 any；
2. unknown 类型只能赋值给任意类型，任意类型不能赋值给 unknown；
3. ​​any​​：​​关闭​​了 TypeScript 的类型检查。它是一张“免死金牌”，允许你对它进行任何操作，而编译器不会抱怨。​​
4. unknown​​：​​强制​​你进行类型检查。它是一个类型安全的“盒子”，在你不明确里面是什么东西之前，你不能对它进行任何操作,一般用于函数参数。
5. any 任意，unknown 不确定的 
```ts
let a: any = 'hello'; // 正确
let b: unknown = 'hello'; // 正确
let c: any = b; // 正确
let d:number = b; // 错误
```

## void 空类型
只能赋值undefined,不能赋值其他类型

## never 永远不会返回的类型
1. 一个函数如果返回 never，意味着它​​永远不会正常返回​​（即不会执行到函数终点并返回一个值）
2. 表示不可能存在的空集合
```ts
// 情况 1: 抛出错误
function throwError(message: string): never {
  throw new Error(message);
}

// 情况 2: 无限循环
function infiniteLoop(): never {
  while (true) {
    // do something...
  }
}
// 情况 3: 表示不可能存在的空集合
let n: never;
n = 123; // 错误：Type 'number' is not assignable to type 'never'.
n = "hello"; // 错误
n = true; // 错误
// 任何赋值操作都会失败
```

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
1. 数字枚举
key 和 value 的双向映射关系
2. 字符串枚举
key 和 value 的单向映射关系,类似于对象
3. 优点：有默认值和自增值，节省编码时间，可读性强
```ts
// 数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
// 数字枚举的取值默认会被编译成从0开始递增
Direction.Up; // 1
Direction.Down; // 2
Direction['left'] // 3
Direction[3] // 'Left'

// 字符串枚举
enum Colors {
  Red = 'red',
  Blue = 'blue',
}
Colors.Red; // 'red'
Colors['Red']; // 'red'
Colors[0]; // error'
// 常量枚举
const enum Month {
    Jan,
    Feb,
    Mar,
}
Month.Jan; // 0
```

## 2.14