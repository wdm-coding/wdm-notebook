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
  2. 配置数据库连接











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