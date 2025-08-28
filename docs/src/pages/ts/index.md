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

## 函数类型的rest参数
1. rest参数会将所有传入的可变数量的参数表示为一个数组。
2. rest参数只能是最后一个参数。
```ts
function fun(data:string,...rest:number[]){
  console.log(data,rest);
}
fun('hello',1,2,3)
```

## 函数类型
```ts
type Fun = (data: string) => string;
const fun: Fun = (data) => {
    return data
}

const fun1:Fun = function(data){
    return data.toUpperCase();
}
```

## 可选属性`？`
```typescript
const objS:{name:string,age?:number} = {name:'Jack'};
```

## Object 与 {} 与 object
1. 与Object类型相同的{}是最不具体的，可以将对象、数组和基元分配给它；
2. object是更具体的，类似于{ [key: string]: any },可以给它分配对象和数组，但不能分配原始类型的数据；
3. { [key: string]: string }是最具体的，它不允许任何原始类型、数组或具有非字符串值的对象被分配到它。

## undefined 和 null 类型
1. undefined 和 null 都是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量；
2. any,unknown,undefined 类型可以接受 null 和 undefined，但是不能赋值给它们。
3. 当你在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，那必须严格对待，undefined 和 null 将只能赋值给它们自身和 void 类
4. TS 对可选属性和对可选参数的处理一样，会被自动加上 | undefined；
```ts
function fun(data?:string){
    console.log(data);
}

fun("hello");
// fun(undefined) === fun()
```

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

## 可变元组类型
1. 使用扩展运算符 ... 来表示数组的长度或类型是可变的
```ts
let tuple: [string, ...number[]] = ['hello', 10, 20];
```
2. 解构元组
```ts
let [a, b,...rest]:[string,number,...any[]] = ['hello', 10,12,3,'dsd'];
console.log(a,b,rest); // hello 10 [12,3,'dsd']
```
3. 元组tag
```ts
let t:[a:string,b:number,...rest:any[]] = ['hello', 10,12,3,'dsd'];
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

## interface 接口
1. 接口是对对象的形状（结构）进行描述
2. 接口是一组命名属性类型，但不包含属性的值或其实现的细节。它只定义了所有类必须遵循的规范。
3. 接口可以继承其他接口 extends
4. 一个类可以实现多个接口 implements
5. 接口可以被扩展和实现
6. 接口可索引签名 [key: string]: any;
```ts
interface Person {
  name: string;
  age?: number; // 可选属性
  eat?(food: string): void; // 可选方法
}
interface Man extends Person {
  sex: string; // 继承接口
  readonly hobby?: string[]; // 只读属性，可选属性
}

let man: Man = {
  name: 'Jack',
  sex: 'male', // 必须实现接口中的属性
  hobby: ['football'], // 可选属性可以不实现，但必须有?号
};
interface List<T> {
  add(item: T): void;
  remove(item: T): void;
}
// 实现
class StringList implements List<string> {
  private items: string[] = [];
  add(item: any): void {
      this.items.push(item);
  }
  remove(item: any): void {
      this.items = this.items.filter(i => i !== item);
  }
}

class NumberList implements List<number> {
  private items: number[] = [];
  add(item: number): void {
      this.items.push(item);
  }
  remove(item: number): void {
      this.items = this.items.filter(i => i !== item);
  }
}
```

## 索引访问类型
索引访问类型允许你通过一个对象类型的已知键来获取其对应的属性值的类型。
```ts
const symbolKey = Symbol('product');
interface Product{
    [symbolKey]: string;
    id: number;
    name: string;
    price: number;
}
type A = Product['name']
type B = Product['price']
type C = Product[typeof symbolKey]
// 联合类型
type Pkeys = keyof Product // 等同于 "id" | "name" | "price" | typeof symbolKey
// 提取所有键
type AllKeys<T> = T extends any ? keyof T : never
type AKeys = AllKeys<Product> // 等同于 "id" | "name" | "price" | typeof symbolKey
```

## interface 和 type 的关联
1. interface 可以继承type
2. type 可以是几个interface 的 联合类型
3. type 可以定于元组类型
4. interface 定义相同的接口会合并，type 定义相同的类型会报错

## Class 类
1. 静态属性：使用 static 关键字修饰的属性，属于类本身而不是类的实例
2. 静态方法：使用 static 关键字修饰的方法，属于类本身而不是类的实例