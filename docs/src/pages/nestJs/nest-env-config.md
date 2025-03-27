# NestJS 环境变量配置

## 创建环境变量枚举
 ### 1. 在src目录下创建enum文件夹，在该文件夹中创建枚举文件。例如：config.enmu.ts
```ts
export enum AppConfig {
  PORT = 'PORT',
  HOST = 'HOST',
  DATABASE = 'DATABASE',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_HOST = 'DATABASE_HOST'
}
```
### 2. 在获取配置时使用枚举文件键值。
```ts
  import { AppConfig } from './enum/config.enum'
  console.log(process.env[AppConfig.PORT])
  console.log(process.env[AppConfig.HOST])
  console.log(process.env[AppConfig.DATABASE])
```

## cross-env控制环境变量
  运行时指定环境变量NODE_ENV，来加载不同的配置文件。
### 1. 使用cross-env包 设置环境变量
```bash
$ npm install cross-env
```
### 2. package.json中指定环境变量
```bash
"start:dev": "cross-env NODE_ENV=development nest start --watch",
"start:prod": "cross-env NODE_ENV=production nest start --watch",
"start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
"build:prod": "cross-env NODE_ENV=production node dist/main"
```

## 方案一、dotenv 模块读取环境变量
  [dotenv文档](https://github.com/motdotla/dotenv)
### 1. 安装
```bash
$ npm install dotenv
```

### 2. 项目根目录下创建.env文件，配置环境变量。
```bash
  # 键值对格式
  NODE_ENV=development
  PORT=3306
```

### 3. 在main.ts中引入dotenv
```ts
// 引入dotenv模块
import 'dotenv/config'
```

### 4. 使用环境变量
```ts
// 读取.env文件中的环境变量
console.log('NODE_ENV----', process.env.NODE_ENV)
console.log('PORT----', process.env.PORT)
```
::: warning 缺点
不利于读取嵌套的配置，例如：DB_HOST=127.0.0.1,DB_PORT=3306
:::

## 方案二、config模块读取环境变量
  [config文档](https://github.com/node-config/node-config)

### 1. 安装
```bash
$ npm install config
```
### 2. 项目根目录下创建config文件夹,在config文件夹下创建default.json文件，配置默认环境变量。
+ json格式
```json
  {
    "NODE_ENV":"development",
    "port":3306,
    "host":"127.0.0.1",
    "user":"root",
    "password":"123456",
    "database":{
      "user":"db-user",
      "password":"db-pwd"
    }
  }
```
+ yaml格式 需要安装js-yaml包
```bash
# 安装js-yaml包
$ npm install js-yaml
# 安装类型定义文件
$ npm install @types/js-yaml
```
```yaml
port: 3306
host: 127.0.0.1
user: root
password: 123456
database:
  user: db-user
  password: db-pwd
```
### 3. config.get读取配置
```ts
import * as config from 'config'
console.log(config.get('port'))
console.log(config.get('database'))
```

## 方案三、nestjs-config官方配置插件
[nestjs-config文档](https://github.com/nestjs/config)

本质上是对dotenv库的封装

### 1. 安装
```js
npm i --save @nestjs/config
```

### 2. 读取.env文件的环境变量。
+ 项目根目录下创建.env文件，配置默认环境变量。
+ 项目根目录下创建.env.development文件，配置开发环境变量。
+ 项目根目录下创建.env.production文件，配置生产环境变量。
```bash
NODE_ENV= development
PORT= 3306
DB = mysql
DB_HOST = 127.0.0.1
DB_NAME = root
DB_PASSWORD = password
```

### 3. 在app.module.ts中引入ConfigModule
```ts
// app.module.ts 使用ConfigModule.forRoot()方法加载环境变量文件。
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // 全局使用，不需要在每个模块中单独引入。
    }) // 配置模块的导入，用于加载环境变量文件。此处使用了默认路径 .env 文件。
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
// user.controller.ts 使用ConfigService读取环境变量
import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService
  ) {
    console.log('config-env', this.configService.get('DB_HOST'))
  }
  @Get('info')
  getUserInfo(): object {
    return this.userService.getUserInfo()
  }
}
```

### 4. 读取yaml文件
  + 项目根目录下创建config文件夹,在config文件夹下创建config.yml文件，配置默认环境变量。
  + 在config文件夹下创建config.development.yml文件，配置开发环境变量。
  + 在config文件夹下创建config.production.yml文件，配置生产环境变量。

  ```yml
  // config.yml
  port: 3306
  host: 127.0.0.1
  user: root
  password: 123456
  database:
  user: db-user
  password: db-pwd
  // config.development.yml
  database:
  user: dev-user
  password: dev-pwd
  // config.production.yml
  database:
  user: prod-user
  password: prod-pwd
  ```

### 5. 在src文件夹下创建configuration.ts文件，配置自定义环境变量。
  ```ts
  // configuration.ts
  import { readFileSync } from 'fs'
  import * as yaml from 'js-yaml'
  import { join } from 'path'
  import * as _ from 'lodash'
  // 定义公共配置文件的文件名和路径
  const YAML_COMMON_CONFIG_FILENAME = 'config.yml'
  const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME)
  // 定义环境配置文件的文件名和路径，根据NODE_ENV变量动态加载不同的文件
  const envPath = join(
    __dirname,
    '../config',
    `config.${process.env.NODE_ENV || 'development'}.yml`
  )
  const commonConfig = yaml.load(readFileSync(filePath, 'utf8'))
  const envConfig = yaml.load(readFileSync(envPath, 'utf8'))
  // 使用lodash的merge方法深度合并配置文件
  const config = () => _.merge({}, commonConfig, envConfig)
  // 为什么要返回一个函数，而不是直接返回合并后的配置对象？
  // 因为这样可以在每次调用时都重新合并配置，确保最新的配置被使用。
  export default config
  ```

### 6. ConfigModule.forRoot()方法加载自定义配置文件。
  load 方法可以接受一个数组，用于加载自定义配置文件。
  ```ts
  // app.module.ts
  import { Module } from '@nestjs/common'
  import { AppController } from './app.controller'
  import { AppService } from './app.service'
  import { ConfigModule } from '@nestjs/config'
  import configuration from './configuration'
  @Module({
    imports: [
      ConfigModule.forRoot({
        load: [configuration], // 加载自定义配置文件
      })
    ],
    controllers: [AppController],
    providers: [AppService]
  })
  export class AppModule {}
  // user.controller.ts 使用ConfigService读取环境变量

  import { Controller, Get } from '@nestjs/common'
  import { UserService } from './user.service'
  import { ConfigService } from '@nestjs/config'
  @Controller('/user')
  export class UserController {
    constructor(
      private readonly userService: UserService,
      private configService: ConfigService
    ) {
      console.log('config-yml', this.configService.get('database'))
    }
    @Get('info')
    getUserInfo(): object {
      return this.userService.getUserInfo()
    }
  }
  ```

## 配置文件参数的校验

### 1. 安装Joi库
```js
npm i --save joi
```
### 2. 在app.module.ts中引入Joi库
```ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import configuration from './configuration'
import * as Joi from 'joi'
@Module({
  imports: [
    // 配置模块的导入，用于加载环境变量文件。此处使用了默认路径 .env 文件。
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
      load: [configuration], // 加载自定义配置文件，此处为 configuration.ts 文件。
      validationSchema: Joi.object({
        PORT: Joi.number().valid(3306), // 此处配置了环境变量 PORT 的验证规则，确保其为数字且等于 3306。
        DB_HOST: Joi.string().ip() // 此处配置了环境变量 DB_HOST 的验证规则，确保其为有效的 IP 地址。
      })
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```




























































































































































