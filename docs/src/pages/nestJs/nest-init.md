# Nest项目初始化

## 1. 创建Nest项目

### node版本 
  + v20.1.0
### 安装nest-cli工具包并创建项目
```shell
# 全局安装nest-cli工具包
$ npm i -g @nestjs/cli
# 创建项目
$ nest new project-name
```
### 使用 Git 安装 TypeScript 初始化项目
```shell
# 克隆项目模板并安装依赖，启动服务
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```
## 2. Nest命令行指令

```shell
  # 创建项目
  nest new|n [options] [name]  
  # 打包项目
  nest build [options] [app]
  # 运行项目
  nest start [options] [app] 
  # 查看项目信息
  nest info|i 
  # 添加库到项目
  nest add [options] <library>
  # 快速生成文件命令
  nest generate|g [options] <schematic> [name] [path]
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
### 快速创建modules文件

```shell
  $ nest g mo users
```

### 快速创建filter文件

```shell
$ nest g f filters/typeorm --flat --no-spec
```
## 3. 项目结构

### 添加eslintrc.js或者eslint.config.mjs配置文件
  1. 在项目根目录下创建`eslintrc.js`或者`eslint.config.mjs`文件，并在rules属性添加以下内容：
```js
  rules: {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true, // 使用单引号
        "trailingComma": "none", // 末尾不加逗号
        "endOfLine": "auto",// 行尾换行符自动识别
        "semi": false // 不加分号
      }
    ]
  }
```
### 配置.prettierrc配置文件
```json
  {
    "singleQuote": true,
    "trailingComma": "none",
    "endOfLine": "auto",
    "semi": false
  }
```
### nest-cli.json 脚手架配置文件

### package.json 运行脚本配置文件
  1. 在`scripts`属性中添加以下内容：
```json
"scripts": {
  "build": "nest build",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/jest/bin/jest --runInBand",
  "test:e2e": "jest --config ./test/jest-e2e.json"
}
```
## 4.文件命名规范
  1. 控制器文件命名：`xxx.controller.ts`
  2. 服务层文件命名：`xxx.service.ts`
  3. 模块文件命名：`xxx.module.ts`
  4. 实体类文件命名：`entity/xxx.entity.ts`
  5. 过滤器文件命名：`filters/xxx.filter.ts`
  6. 中间件文件命名：`middlewares/xxx.middleware.ts`
  7. 管道文件命名：`pipes/xxx.pipe.ts`
  8. 守卫文件命名：`guards/xxx.guard.ts`
  9. 拦截器文件命名：`interceptors/xxx.interceptor.ts`

## 从0开始搭建nest项目初始化框架

### 1. 全局安装nest-cli工具包 npm i -g @nestjs/cli
### 2. 创建项目 nest new nest-project
### 3. 进入项目目录下载依赖包 npm install(node版本需要20.1.0以上版本)
### 4. 添加.prettierrc配置文件,配置prettier规则
### 5. 添加eslintrc.js或者eslint.config.mjs配置文件,配置prettier规则
### 6. 环境变量配置
:::tip 环境变量配置
1. 创建环境变量枚举文件`src/enum/env.enum.ts`,枚举环境变量配置
2. 安装cross-env控制环境变量 npm i cross-env
3. 在package.json中配置环境变量运行脚本
```json
"scripts": {
  "start:dev": "cross-env NODE_ENV=development nest start --watch",
  "start:prod": "cross-env NODE_ENV=production nest start --watch",
  "build:dev": "cross-env NODE_ENV=development nest build",
  "build:prod": "cross-env NODE_ENV=production nest build",
}
```
4. 安装nestjs-config配置模块作为环境配置方案 npm i --save @nestjs/config
5. 在项目根目录下创建`.env`文件,配置默认环境变量信息
6. 在项目根目录下创建`.env.development`文件,配置开发环境变量信息
7. 在项目根目录下创建`.env.production`文件,配置生产环境变量信息
5. 在app.module.ts文件中引入ConfigModule配置模块,并使用ConfigModule.forRoot()方法加载环境变量文件
```ts
ConfigModule.forRoot({
  isGlobal: true, // 全局配置
  envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'] // 如果在多个文件中找到某个变量，则第一个变量优先。
})
```
:::
### 7. 配置Docker-compose文件
:::tip Docker-compose文件配置
1. 项目根目录下创建`docker-compose.yml`文件,配置Docker容器信息
2. 在项目根目录下执行命令`docker-compose up -d`,启动服务
:::





