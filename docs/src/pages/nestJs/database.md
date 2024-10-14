# 数据库模块 typeorm cli

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