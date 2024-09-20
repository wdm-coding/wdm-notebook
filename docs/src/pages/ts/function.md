# 函数相关

## 函数

```typeScript
function add (x:number, y:number):number {
  return x + y;
}
```

## 箭头函数

```typeScript
const add2 = (x:number, y:number):number => {
  return x + y;
}
```

## 匿名函数

```typeScript
const add3: (x:number, y:number) => number  = (x:number, y:number) => x + y
```

## 类型推导

```typeScript
const result = add2(1, 2);
```

## 函数重载
TypeScript的函数重载通过为一个函数指定多个函数类型定义，从而对函数调用的返回值进行检查

```typeScript
// 这个是重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
function handleData(x: string): string[];
// 这个也是重载的一部分，指定当参数类型为number时，返回值类型为string
function handleData(x: number): string; 

// 这个就是重载的内容了，这是实体函数，不算做重载的部分
function handleData(x: any): any { 
  if (typeof x === "string") {
    return x.split("");
  } else {
    return x
      .toString()
      .split("")
      .join("_");
  }
}

handleData("abc").join("_");
handleData(123).join("_"); // error 类型"string"上不存在属性"join"
handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。
```
