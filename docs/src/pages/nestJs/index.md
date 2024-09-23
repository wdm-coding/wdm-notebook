# NestJs

## 1.创建项目
```shell
$ npm i -g @nestjs/cli
$ nest new project-name
```
## 2.命令
 
 ```shell
  new|n [options] [name]        //创建项目
  build [options] [app]         //编译项目
  start [options] [app]         //运行项目
  info|i                        //查看项目信息
  add [options] <library>       //添加库
  generate|g [options] <schematic> [name] [path]  //生成
    在@nestjs/ Schematics集合上提供的原理图:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │  
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      │ service       │ s           │ Generate a service declaration               │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘
 ```
 ## 3.资源合集

 官方示例 : https://github.com/nestjs/nest/tree/master/sample

 Awesome Nest ： https://github.com/nestjs/awesome-nestjs

 ## OOP 
  面向对象编程
  
  1. 抽象现实生活中的事物特征，抽象出类，属性，方法
  2. 封装，继承，多态
  3. 依赖注入
  java C#

 ## FP
  函数式编程

  1. 确定的数据输入 -> 确定的数据输出 -> 没有副作用 -> 相对独立
  2. 引用透明性
  
 ## FRP
  函数式响应式编程
  
  1. 适合需要对事件流进行复杂处理的场景
  2. 多用于异步场景
  3. RxJS

 ## AOP
 面向切面编程

 AOP通过动态代理的方式，在不修改源代码的情况下对程序进行功能增强，它能够将业务逻辑和非业务逻辑（如日志记录、事务管理、权限验证等）进行隔离，从而降低各部分之间的耦合度，提高程序的可重用性和开发效率。

 核心原理：AOP的核心原理是使用动态代理的方式，在目标方法执行前后或出现异常时加入相关的逻辑。这些逻辑被称为“切面”，它们可以被应用到程序中的多个点上，而不需要在每个地方都编写相同的代码。

 1. 扩展功能方便，不形象业务之间的逻辑
 2. 逻辑集中管理
 3. 利与复用

 ## IOC 控制反转
  将组件的控制权从组件本身转移到外部容器，以实现组件之间的解耦

 ## DI 依赖注入
  旨在降低程序组件之间的耦合度，提高代码的可测试性、可维护性和可扩展性

