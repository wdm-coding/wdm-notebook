# API开发

<img src="/assets/nest/7.png" style="margin-top:15px">

## Query

::: warning
前端传递的query参数全是被解析为string类型
:::

```js
user/getProfile?id=3
@Get('getProfile')
getUserProfile(@Query() query: any): any {
  return this.userService.findProfile(query.id)
}
```

## params

```js
user/byId/3
@Get('byId/:id')
getUserById(@Param() dto: any) {
  const id = dto.id
  return this.userService.findById(id)
}
```

## body

```js
/user/add
{
	"username": "ts-cs",
	"password": "ts-cs-pwd",
	"id": 5
}
@Post('add')
addUser(@Body() dto: User): any {
  return this.userService.create(dto)
}
```

## find查询 

### 分页 + 条件查询 + 关联查询 + 排序查询
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

### JoinAndSelect 区别

<img src="/assets/nest/8.png" style="margin-top:15px">

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


