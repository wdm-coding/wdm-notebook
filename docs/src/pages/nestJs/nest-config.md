# nestjs 配置模块
## 创建变量枚举
 1. 在src目录下创建enum文件夹，在该文件夹中创建枚举文件。例如：config.enmu.ts
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
2. 在获取配置时使用枚举文件键值。
```ts
  import { AppConfig } from './enum/config.enum'
  console.log(process.env[AppConfig.PORT])
  console.log(process.env[AppConfig.HOST])
  console.log(process.env[AppConfig.DATABASE])
```

## 多环境配置
  运行时指定环境变量NODE_ENV，来加载不同的配置文件。
1. 使用cross-env包 设置环境变量
```bash
$ npm install cross-env
```
2. package.json中指定环境变量
```bash
"start:dev": "cross-env NODE_ENV=development nest start --watch",
"start:prod": "cross-env NODE_ENV=production nest start --watch",
"start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
"build:prod": "cross-env NODE_ENV=production node dist/main"
```
### dotenv
  [dotenv文档](https://github.com/motdotla/dotenv)
1. 安装
```bash
$ npm install dotenv
```

2. 项目根目录下创建.env文件，配置环境变量。
```bash
  # 键值对格式
  NODE_ENV=development
  PORT=3306
```

3. 在main.ts中引入dotenv
```ts
// 引入dotenv模块
import 'dotenv/config'
```

4. 使用环境变量
```ts
// 读取.env文件中的环境变量
console.log('NODE_ENV----', process.env.NODE_ENV)
console.log('PORT----', process.env.PORT)
```
::: warning 缺点
不利于读取嵌套的配置，例如：DB_HOST=127.0.0.1,DB_PORT=3306
:::

### config
  [config文档](https://github.com/node-config/node-config)

1. 安装
```bash
$ npm install config
```
2. 项目根目录下创建config文件夹,在config文件夹下创建default.json文件，配置默认环境变量。
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
3. config.get读取配置
```ts
import * as config from 'config'
console.log(config.get('port'))
console.log(config.get('database'))
```

### nestjs-config
[nestjs-config文档](https://github.com/nestjs/config)

本质上是对dotenv库的封装

1. 安装
```js
npm i --save @nestjs/config
```

2. 项目根目录下创建.env文件，配置环境变量。
```bash
NODE_ENV= development
PORT= 3306
DB = mysql
DB_HOST = 127.0.0.1
DB_NAME = root
DB_PASSWORD = password
```

3. 在app.module.ts中引入ConfigModule
```ts
// app.module.ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot() // 配置模块的导入，用于加载环境变量文件。此处使用了默认路径 .env 文件。
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```

4. 在app.service或者app.controller中使用环境变量
```ts
// app.service.ts
import { ConfigService } from '@nestjs/config'
import { Injectable, Inject } from '@nestjs/common'
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `Hello World! ${this.configService.get('DB_NAME')}`
  }
}
```
5. ConfigModule.forRoot方法参数
  + isGlobal: true 全局使用，不需要在每个模块中单独引入。
```ts
// app.module.ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```
6. nestjs-config读取yaml文件
  + 项目根目录下创建config文件夹,在config文件夹下创建default.yaml文件，配置默认环境变量。
  + 在src文件夹下创建configuration.ts文件，配置自定义环境变量。
  (7.6)





