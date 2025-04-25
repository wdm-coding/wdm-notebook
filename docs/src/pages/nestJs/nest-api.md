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
// 1. unils文件中封装动态条件对象构建函数db.helper.ts
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
export const conditionUtils = <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  record: Record<string, unknown>
) => {
  Object.keys(record).forEach(key => {
    if (record[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: record[key] })
    }
  })
  return queryBuilder
}
// 2. 调用封装好的函数
  async findAll(query: UserQuery) {
    const { username, roleId, gender, pageNum, pageSize } = query
    // 分页参数，默认为第一页每页10条数据
    const take = Number(pageSize) || 10 // 每页显示多少条数据
    const skip = (Number(pageNum || 1) - 1) * take // 跳过多少条数据
    // 1. 关联查询
    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('users.roles', 'roles')
      // 2. 动态查询条件，如果条件为空则不添加该条件。(第一个查询条件为1=1，后续的条件为AND条件)
      .where(username ? 'users.username LIKE :username' : '1=1', username ? { username: `%${username}%` } : {})
    const searchList = {
      'roles.id': roleId,
      'profile.gender': gender
    }
    const list = conditionUtils<Users>(queryBuilder, searchList)
    const total = await list.getCount() // 总条数
    const result = await list.skip(skip).take(take).getMany()
    // getRawMany()不直接支持分页，因为它只是执行原始SQL查询。
    return {
      pageSize: take, // 每页显示多少条数据
      pageNum: Number(pageNum || 1), // 当前页码
      total, // 总条数
      list: result.map(item => ({
        userId: item.id,
        password: '',
        address: item.profile?.address,
        gender: item.profile?.gender,
        phone: item.profile?.phone,
        username: item.username,
        roleName: item.roles.map(role => role.name).join(','),
        roleIds: item.roles.map(role => role.id).join(',')
      }))
    }
  }
```
:::

::: warning 注意
1. getRawMany()方法本身不直接支持分页，因为它只是简单地执行SQL查询并返回原始结果。相比之下，getMany()方法在内部处理了分页逻辑，这是通过调用take()和skip()方法实现的。
2. 字段唯一性设置：在entity中，如果想让某个字段唯一，可以使用`unique: true`约束。
```ts
@Column({ type: 'varchar', length: 255, unique: true })
username: string
```
:::

## 创建typeorm的异常过滤器
1. 在filters目录下创建`typeorm.filter.ts`文件
```bash
$ nest g f filters/typeorm --flat --no-spec
```
2. 编写异常过滤器代码
```ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { QueryFailedError, TypeORMError } from 'typeorm'

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    let msg = exception.message
    if (exception instanceof QueryFailedError) {
      const errno = exception.driverError?.errno || null
      switch (errno) {
        case 1062: // 唯一约束冲突
          msg = `字段重复，请检查数据是否已存在`
          break
        default:
          msg = exception.message || '数据库查询异常'
          break
      }
    }
    response.status(500).json({
      code: -1,
      msg,
      data: null
    })
  }
}
```

3. 单个模块中使用异常过滤器
```ts
import { TypeormFilter } from 'src/filters/typeorm.filter'
@UseFilters(new TypeormFilter())
```












## remove 与 delete 区别

<img src="/assets/nest/9.png" style="margin-top:15px">

## update


