# 声明文件

在TypeScript中，声明文件（Declaration Files）是一种特殊类型的文件，它们使用.d.ts扩展名，并且包含了TypeScript的声明。这些文件主要用于两种场景：

为已存在的JavaScript库提供TypeScript支持：当你想要在一个TypeScript项目中使用某个只提供了JavaScript版本的库时，你可以通过创建一个声明文件来为这个库提供TypeScript的类型信息。这样，当你在TypeScript代码中使用这个库时，TypeScript编译器就能提供类型检查和自动补全等功能。

环境声明：在全局作用域中声明变量、函数等，这些声明将影响整个项目中所有文件的类型检查。

```js
  npx tsc --init
```