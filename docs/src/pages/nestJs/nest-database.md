# nestjs 数据库模块

## ORM（Object Relational Mapping）对象关系映射

  1. 允许开发者使用面向对象的方式来操作数据库
  2. 维护数据模型和数据库之间的映射关系
  3. ORM的第三方库：TypeORM、prisma、Sequelize、knex,EdgeDB等
  4. nestjs 官方推荐的 ORM：TypeORM
  5. 最新版本的 nestjs 官方推荐的 ORM：Prisma









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