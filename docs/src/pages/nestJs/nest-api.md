# API开发

<img src="/assets/nest/7.png" style="margin-top:15px">

## 获取参数的注解
1. `@Body() dto:any` 获取body参数
2. `@Query() dto:any` 获取query查询参数
3. `@Param('id') id: number` 获取params路径参数
4. `@Headers() headers:any` 获取headers参数
5. `@Req() request: any` 获取request对象

## Query查询 分页 + 条件查询 + 关联查询 + 排序查询

1. 前端传递的query参数全部是字符串类型
2. 分页查询参数：`page=1&limit=5`
3. 条件查询参数：`username=wdm&gender=1&roleId=2`
4. 关联查询参数：`roleId=2&gender=1`
5. 排序查询参数：`sort=id,DESC`

### createQueryBuilder 查询
1. 创建查询构建器实例
2. 参数是实体类对象
```js
const queryBuilder = this.userRepository.createQueryBuilder('user')
```

### innerJoinAndSelect联合查询
1. 执行内连接（INNER JOIN）查询，并同时选择关联实体的字段。
2. 内连接会返回两个表中满足连接条件的记录。如果某个记录在其中一个表中存在，但在另一个表中没有匹配的记录，则该记录不会被包含在结果集中。
3. 参数：
  + 指定要连接的关联实体的路径
  + 为关联的实体指定别名，用于后续条件筛选
  + 对关联的实体进行筛选
```js
const user = await createQueryBuilder("user")
  .innerJoinAndSelect(
    "user.photos", 
    "photo", 
    "photo.isRemoved = :isRemoved", 
    { isRemoved: false }
  )
const result = [
    {
        "id": 1,
        "username": "admin",
        "password": "admin",
        "roles": [
            {
                "id": 1,
                "name": "超级管理员"
            }
        ],
        "profile": {
            "id": 1,
            "gender": 1,
            "phone": "17693198620",
            "address": "甘肃省兰州市城关区"
        }
    }
]
```

### leftJoinAndSelect联合查询
1. 执行左连接（LEFT JOIN）查询，并同时选择关联实体的字段。
2. 左连接会返回左侧表的所有记录，即使右侧表中没有匹配的记录，也会在结果集中显示为NULL值。
3. 参数：
  + 指定要连接的关联实体的路径
  + 为关联的实体指定别名，用于后续条件筛选
  + 对关联的实体进行筛选
```js
const user = await createQueryBuilder("user")
  .leftJoinAndSelect(
    "user.photos", 
    "photo", 
    "photo.isRemoved = :isRemoved", 
    { isRemoved: false }
  )

const result = [
  {
      "id": 1,
      "username": "admin",
      "password": "admin",
      "roles": [
          {
              "id": 1,
              "name": "超级管理员"
          }
      ],
      "profile": {
          "id": 1,
          "gender": 1,
          "phone": "17693198620",
          "address": "甘肃省兰州市城关区"
      }
  },
  {
      "id": 12,
      "username": "testAdmin",
      "password": "testAdmin",
      "roles": [],
      "profile": null
  }
]
```

### JoinAndSelect 区别

<img src="/assets/nest/8.png" style="margin-top:15px">

### getMany() 与 getRawMany() 区别
1. `getMany()` 返回实体对象数组
```json
[
  {
      "id": 1,
      "username": "admin",
      "password": "admin",
      "roles": [
          {
              "id": 1,
              "name": "超级管理员"
          }
      ],
      "profile": {
          "id": 1,
          "gender": 1,
          "phone": "17693198620",
          "address": "甘肃省兰州市城关区"
      }
  },
  {
      "id": 12,
      "username": "testAdmin",
      "password": "testAdmin",
      "roles": [],
      "profile": null
  }
]
```

2. `getRawMany()` 返回原始数据对象数组
```json
[
  {
      "users_id": 1,
      "users_username": "admin",
      "users_password": "admin",
      "profile_id": 1,
      "profile_gender": 1,
      "profile_phone": "17693198620",
      "profile_address": "甘肃省兰州市城关区",
      "profile_user_id": 1,
      "roles_id": 1,
      "roles_name": "超级管理员"
  }
]
```

### 条件查询
1. `where()` 方法用于添加查询条件
2. `andWhere()` 方法用于添加额外的查询条件
3. `orWhere()` 方法用于添加或条件
4. 注意查询条件为空时，不执行查询，

::: tips 方案一：链式条件构造器模式
```js
findAll(query: UserQuery) {
  const { username, roleId, gender } = query;
  return this.userRepository.createQueryBuilder('users')
    .leftJoinAndSelect('users.profile', 'profile')
    .leftJoinAndSelect('users.roles', 'roles')
    .where(
      username ? 'users.username LIKE :username' : '1=1', 
      username ? { username: `%${username}%` } : {}
    )
    .andWhere(
      roleId ? 'roles.id = :roleId' : '1=1', 
      roleId ? { roleId } : {}
    )
    .andWhere(
      gender ? 'profile.gender = :gender' : '1=1', 
      gender ? { gender } : {}
    )
    .getMany();
}
```
:::

::: tips 方案二：动态条件对象构建
```js
findAll(query: UserQuery) {

}
```
:::







```js
/user/list?page=1&limit=5&username=wdm&gender=1&roleId=2
// 分页查询用户与角色关联查询
const { limit, page, roleId, gender, username } = query
const take = limit || 10
const skip = ((page || 1) - 1) * take
return this.userRepository.find({
  select: {
    id: true,
    username: true,
    roles: { name: true },
    profile: { gender: true }
  },
  relations: ['roles', 'profile'], // 关联查询
  where: {
    username, // 用户名(当前表的字段)
    roles: { id: roleId }, // 角色id (关联表roles的字段)
    profile: { gender } // 性别(关联表profile的字段)
  }, // 查询条件
  skip, // 查询条数
  take, // 查询条数
  order: { id: 'DESC' } // 排序 DESC 倒序 ASC 升序
})
```

## Query Builder 查询



### conditionUtils 工具函数 (查询条件非空判断)


```js

conditionUtils是一个泛型函数，它使用<T>来指定queryBuilder的类型参数。
T代表了你正在查询的实体（Entity）的类型。
这允许conditionUtils函数在不知道具体实体类型的情况下，
接受任何SelectQueryBuilder<T>类型的参数。

import { SelectQueryBuilder } from 'typeorm'
export const conditionUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] })
    }
  })
  return queryBuilder
}

```

### 查询示例

```js
// 创建QueryBuilder对象
const qb = this.userRepository.createQueryBuilder('user')
const total = await qb.getCount() // 计算总数
qb.innerJoinAndSelect('user.roles', 'roles') // 关联查询roles表
qb.innerJoinAndSelect('user.profile', 'profile') // 关联查询profile表
// 查询条件
const queryBuilder = conditionUtils(qb, {
  'user.username': username,
  'roles.id': roleId,
  'profile.gender': gender
})
// 查询结果筛选出部分字段
queryBuilder.select([
  'user.id as id',
  'user.username as username',
  'roles.name as roleName',
  'profile.gender as gender',
  'profile.photo as photo',
  'profile.address as address'
])
// 分页查询
return {
  list: await queryBuilder
    .skip(skip)
    .take(take)
    .orderBy('user.id', 'DESC')
    .getRawMany(),
  total
}
```
## remove 与 delete 区别

<img src="/assets/nest/9.png" style="margin-top:15px">

## update


