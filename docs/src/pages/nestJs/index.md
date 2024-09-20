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

 