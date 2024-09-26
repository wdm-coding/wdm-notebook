# 配置相关

```js
npm i --save @nestjs/config
```
## 配置文件

```js
// .env
DB=mysql
DB_HOST=127.0.0.1
// .env.development
DB=mysql-dev
DB_HOST=127.0.0.1
// .env.production
DB=mysql-prod
DB_HOST=127.0.0.1
```
## 配置package.json

```json
"scripts": {
  "start:dev": "cross-env NODE_ENV=development nest start --watch",
  "start:prod": "cross-env NODE_ENV=production node dist/main",
}
```
## 配置ConfigModule

```js
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv'
import * as Joi from 'joi'
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`
ConfigModule.forRoot({
  isGlobal: true, // 全局使用
  load: [() => dotenv.config({ path: envFilePath })], // 加载配置文件
  ignoreEnvFile: true, // 不加载.env文件
  // env变量校验
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),// 默认development
    DB_PORT: Joi.number().default(3306), // 默认3306
    DB_URL: Joi.string().domain(),  // 域名
    DB_HOST: Joi.string().ip() // ip地址
  })
}),
```

