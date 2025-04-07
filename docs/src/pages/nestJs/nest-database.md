# nestjs 数据库模块

## ORM（Object Relational Mapping）对象关系映射
  
  1. 允许开发者使用面向对象的方式来操作数据库
  2. 维护数据模型和数据库之间的映射关系
  3. ORM的第三方库：TypeORM、prisma、Sequelize、knex,EdgeDB等
  4. nestjs 官方推荐的 ORM：TypeORM
  5. 最新版本的 nestjs 官方推荐的 ORM：Prisma

::: tip 对象关系映射
  定义一个对象,对应数据库中的一个表,对象的实例对应数据库中的一个行数据
:::

## 关系型数据库
  1. 采用关系模型存储数据,数据之间存在关联关系
  2. 本质上就是若干个存储数据的二维表。
  3. 常见关联关系：一对一、一对多、多对多。
  4. ERD实体关系图（Entity Relationship Diagram），包括实体（Entity）、属性（Attribute）和关系（Relationship）。
  5. 优点：数据冗余较小，数据一致性较好。易于维护，支持复杂查询。
  6. 缺点：读写性能较差，灵活性差。
  7. 场景：业务系统，电商系统等。

  [数据库建表参考网站](https://open.yesapi.cn/list.html)

## 非关系型数据库
  1. 采用键值对存储数据，数据之间不存在关联关系。
  2. 优点：读写性能较高，灵活性高。
  3. 缺点：数据冗余较大，数据一致性较差。不易维护，复杂查询效率低。
  4. 场景：日志系统，缓存系统等。

## 数据库概念
  1. 表头-字段名称
  2. 表体-字段值
  3. 主键-唯一标识一条记录的字段
  4. 外键-用于建立两个表之间的关联关系
  5. 索引-用于提高查询效率的数据结构

<img src="/assets/nest/10.png" alt="数据库" style="margin-top:10px">

## nestjs 数据库解决方案

### 一、@nestjs/typeorm
  1. 安装依赖
  ```js
  npm install @nestjs/typeorm typeorm mysql2
  ```
  2. 配置数据库连接 `app.module.ts`
  ```js
  import { Module } from '@nestjs/common'
  import { ConfigModule, ConfigService } from '@nestjs/config'
  import { TypeOrmModule } from '@nestjs/typeorm'
  import { EnvConfig } from './enum/env.enum'
  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true, // 全局配置
        envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'] // 如果在多个文件中找到某个变量，则第一个变量优先。
      }),
      // 数据库模块 读取当前环境的数据库连接信息
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule], // 导入配置模块
        inject: [ConfigService], // 注入配置服务
        useFactory: (configService: ConfigService) => ({
          type: 'mysql', // 数据库类型
          host: configService.get(EnvConfig.DB_HOST), // 读取配置文件中的 DB_HOST 环境变量值作为主机名
          port: configService.get(EnvConfig.DB_PORT), // 读取配置文件中的 DB_PORT 环境变量值并转换为数字，作为端口号
          username: configService.get(EnvConfig.DB_USERNAME), // 读取配置文件中的 DB_USER 环境变量值作为用户名
          password: configService.get(EnvConfig.DB_PASSWORD), // 读取配置文件中的 DB_PASSWORD 环境变量值作为密码
          database: configService.get(EnvConfig.DB_DATABASE), // 读取配置文件中的 DB_NAME 环境变量值作为数据库名
          entities: [], // 实体类列表
          synchronize: true, // 自动同步数据库结构，开发环境使用，生产环境禁用。
          logging: ['error'] // 日志级别 'debug', 'log', 'warn', 'error'
        })
      })
      // 其他模块...
    ],
    controllers: [],
    providers: []
  })
  export class AppModule {}
  ```










## ormconfig.ts

```js

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Logs } from 'src/logs/logs.entity'
import { Profile } from 'src/profile/profile.entity'
import { Roles } from 'src/roles/roles.entity'
import { User } from 'src/user/user.entity'

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'example',
  database: 'nestdb',
  entities: [User, Profile, Logs, Roles],
  synchronize: true,
  logging: true
} as TypeOrmModuleOptions

```

## ts-node

```js
npm install ts-node --save-dev

在 package.json 中的 scripts 下添加 typeorm 命令
"script" {
    ...
    "typeorm": "typeorm-ts-node-commonjs"
}
```