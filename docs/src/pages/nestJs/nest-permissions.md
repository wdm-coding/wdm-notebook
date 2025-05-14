# nest 权限控制模块

+ 前端权限控制：前端路由控制、按钮权限控制。
+ 后端权限控制：接口权限控制、数据权限控制。
+ RABC 即 Role-Based Access Control 基于角色的权限控制：角色拥有一定的权限，用户通过分配角色来获取相应的权限。
+ ACL 即 Access Control List 基于策略的权限控制：通过策略列表来定义用户可以访问的资源。
+ 混合模式：结合角色和策略的权限控制。

## 创建权限控制模块
1. nest创建roles增删改查模块
```bash
$ nest g resource roles --no-spec
# 选择REST 
```

2. nest创建menus增删改查模块
```bash
$ nest g resource menus --no-spec
# 选择REST 
```

3. 编辑menus的Entity文件
```ts
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Roles } from '../roles/roles.entity'
@Entity()
export class Menus {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  path: string
  @Column()
  icon: string
  @Column()
  order: number
  @Column()
  acl: string
  // 多对多关系，一个菜单可以属于多个角色，一个角色可以拥有多个菜单。
  @ManyToMany(() => Roles, roles => roles.menus)
  @JoinTable({ name: 'role_menu' })
  roles: Roles[]
}
```

4. 编辑roles的Entity文件
```ts
@ManyToMany(() => Menus, menus => menus.roles) // 关系装饰器，告诉 TypeORM 这个属性是多对多关系。
menus: Menus[] // 菜单字段
```

## 通过 migration 更新数据库
1. migration:create 创建迁移文件
```bash
$ npm run migration:create src/migrations/init
```

2. 执行迁移文件，更新数据库
```bash
$ npm run migration:generate --name=menus
```

## 方案一、RBAC权限控制模块(基于角色的权限控制)
1. 新建`role.enum.ts`文件，定义角色枚举
```ts
export enum Role {
  ADMIN = 'admin', // 管理员
  USER = 'user', // 用户
  GUEST = 'guest' // 游客
}
```

2. 新建`role.decorator.ts`文件，定义角色装饰器
```ts
import { SetMetadata } from '@nestjs/common'
import { Role } from '../enum/role.enum'
export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
```
::: tip SetMetadata使用
+ SetMetadata 是一个装饰器，用于设置元数据。在 NestJS 中，我们经常使用它来传递额外的信息给拦截器、守卫和过滤器等中间件组件。例如，我们可以利用 SetMetadata 来定义一个路由的权限角色，然后在相应的守卫中读取这个元数据，从而实现基于角色的访问控制。
角色装饰器是如何工作的？
1. 接受可变数量的 Role 参数，返回 SetMetadata 设置的元数据。
2. 实际使用中，@Roles(Role.Admin) 会将该路由的所需角色存储到元数据。
:::

3. 新建`role.guard.ts`文件，定义角色守卫
```ts
$ nest g gu guards/role --no-spec

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decotator/role.decorator'
import { Role } from '../enum/role.enum'
import { UserService } from '../user/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // 使用userService 必须在使用此守卫的模块中导入UserModel模块，否则会报错
    private userService: UserService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // reflector 获取装饰器中的数据
    // getAllAndOverride 获取路由上的元数据，第一个参数是装饰器的key值，第二个参数是装饰器所在的类或者方法
    // getAllAndMerge 合并类和方法的元数据，第一个参数是装饰器的key值，第二个参数是装饰器所在的类或者方法
    const requestRole = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
    if (!requestRole) return true
    // 获取当前请求的用户信息
    const req = context.switchToHttp().getRequest()
    // 查询用户信息
    const user = await this.userService.findOneByName(req.user.username)
    if (!user) throw new ForbiddenException('用户不存在')
    const roles = user.roles?.map(role => role.code)
    const flag = requestRole.some(role => roles?.includes(role))
    if (!flag) throw new ForbiddenException('无权限访问')
    return true
  }
}
```

## 方案二、ACL权限控制模块(基于策略的权限控制)

1. 下载`casl-ability`包
```bash
$ npm install @casl/ability --save
```

2. 在auth模块下新建`casl-ability.service.ts`文件，定义权限工厂
```ts
import { ForbiddenException, Injectable } from '@nestjs/common'
import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { UserService } from '../user/user.service'
import getEntities from '../utils/getEntities'
@Injectable()
export class CaslAbilityService {
  constructor(private userService: UserService) {}
  async forRoot(username: string) {
    const { can, build } = new AbilityBuilder(createMongoAbility) // CASL 提供的工具，用于构建 Ability 对象。
    const user = await this.userService.findOneByName(username)
    if (!user) throw new ForbiddenException('用户不存在')
    user.roles.forEach(role => {
      role.menus.forEach(menu => {
        menu.acl.split(',').forEach(action => {
          can(action, getEntities(menu.path))
        })
      })
    })
    const ability = build({
      // 生成 Ability 对象 表示用户的权限 并传入配置对象，其中 detectSubjectType 是一个函数，用于确定主体类型。
      detectSubjectType: item => item.constructor.name
    })
    // 在守卫中使用 ability 对象来检查权限等操作。例如，在守卫中可以使用 can 方法来判断用户是否有执行某个操作的权限。
    return ability
  }
}
```
3. 在decotator目录下新建`casl.decorator.ts`文件，定义权限装饰器
```ts
import { SetMetadata } from '@nestjs/common'
import { AnyMongoAbility, InferSubjects } from '@casl/ability'
import { Action } from 'src/enum/action.enum'

export enum CHECK_POLICIES_KEY {
  HANDLER = 'CHECK_POLICIES_HANDLER', // 自定义的权限监察逻辑处理函数
  CAN = 'CHECK_POLICIES_CAN', // 表示用户被允许执行某个操作(ability.can)
  CANNOT = 'CHECK_POLICIES_CANNOT' // 表示用户不被允许执行某个操作(ability.cannot)
}
// 回调函数类型，接收一个 ability 对象（CASL 的权限对象），返回一个布尔值，表示权限检查的结果。
export type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean
// 自定义的权限检查逻辑处理函数类型，可以是单个回调函数或者一个回调函数的数组。
// @CheckPolices 装饰器接收一个或多个回调函数，并将其存储在 CHECK_POLICIES_KEY.HANDLER 中。
export type CaslHandlerType = PolicyHandlerCallback[]
// SetMetadata 将这些回调函数存储到 CHECK_POLICIES_KEY.HANDLER 中
export const CheckPolices = (...handlers: PolicyHandlerCallback[]) => SetMetadata(CHECK_POLICIES_KEY.HANDLER, handlers)
// 定义了一个装饰器 Can，用于将 ability.can 的权限检查逻辑绑定到元数据。

/**
 *
 * @param action 权限动作，例如 'read', 'create' 等。
 * @param subject 权限对象，例如一个模型类或者具体的实例。
 * @param conditions 额外的条件，用于更细粒度的权限控制。例如，在某些情况下你可能需要根据用户的角色或特定的属性来决定是否允许执行某个操作。这些条件会被传递给 ability.can 方法作为第三个参数。
 * @returns 使用 SetMetadata 将 ability.can 的逻辑存储到 CHECK_POLICIES_KEY.CAN 中
 */
export const Can = (action: Action, subject: InferSubjects<any>, conditions?: any) =>
  SetMetadata(CHECK_POLICIES_KEY.CAN, (ability: AnyMongoAbility) => ability.can(action, subject, conditions))

export const Cannot = (action: Action, subject: InferSubjects<any>, conditions?: any) =>
  SetMetadata(CHECK_POLICIES_KEY.CANNOT, (ability: AnyMongoAbility) => ability.cannot(action, subject, conditions))
```

4. 在enum目录下新建`action.enum.ts`文件，定义操作枚举
```ts
export enum Action {
  Manage = 'manage', // 管理权限
  Create = 'create', // 创建权限
  Read = 'read', // 读取权限
  Update = 'update', // 更新权限
  Delete = 'delete' // 删除权限
}
```

5. 在guards目录下新建`casl-ability.guard.ts`文件，定义权限守卫
```bash
$ nest g guard guards/casl-ability --no-spec
```

```ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslHandlerType, CHECK_POLICIES_KEY, PolicyHandlerCallback } from '../decotator/casl.decorator'
import { CaslAbilityService } from 'src/auth/casl-ability.service'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // 用于获取装饰器上的数据
    private caslAbilityService: CaslAbilityService // 用于获取当前用户的权限
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // handlers‌：读取 CHECK_POLICIES_KEY.HANDLER 对应的自定义权限检查逻辑
    const handlers = this.reflector.getAllAndMerge<PolicyHandlerCallback[]>(CHECK_POLICIES_KEY.HANDLER, [
      context.getHandler(),
      context.getClass()
    ])
    // canHandlers：读取 CHECK_POLICIES_KEY.CAN 对应的权限检查逻辑
    const canHandlers = this.reflector.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.CAN, [
      context.getHandler(),
      context.getClass()
    ]) as CaslHandlerType
    // cannotHandlers：读取 CHECK_POLICIES_KEY.CANNOT 对应的权限检查逻辑
    const cannotHandlers = this.reflector.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.CANNOT, [
      context.getHandler(),
      context.getClass()
    ]) as CaslHandlerType
    // 判断，如果用户未设置上述的任何权限，那么就直接返回true
    if (handlers.length === 0 && canHandlers.length === 0 && cannotHandlers.length === 0) return true
    const req = context.switchToHttp().getRequest()
    if (!req.user) throw new ForbiddenException('用户不存在')
    // 获取当前用户的权限 调用 CaslAbilityService 的 forRoot 方法，根据用户的用户名生成一个 Ability 对象，表示用户的权限。
    const ability = await this.caslAbilityService.forRoot(req.user.username)
    let flag = true
    // 如果 handlers 存在，遍历每个回调函数，传入 ability 对象，检查是否都返回 true。
    if (handlers) {
      flag = flag && handlers.every(handler => handler(ability))
    }
    // 如果 flag 为 true，并且 canHandlers 存在，再次遍历每个回调函数，传入 ability 对象，检查是否都返回 true。
    if (flag && canHandlers) {
      flag = flag && canHandlers.every(handler => handler(ability))
    }
    // 如果 flag 为 true，并且 cannotHandlers 存在，再次遍历每个回调函数，传入 ability 对象，检查是否都返回 false。
    if (flag && cannotHandlers) {
      flag = flag && cannotHandlers.every(handler => handler(ability))
    }
    return flag
  }
}
```
7. 在controller目录下使用定义的装饰器
```ts
@UseGuards(JwtGuard, CaslGuard)
@CheckPolices(ability => ability.can(Action.Read, Logs))
@Can(Action.Read, Logs)
```

::: tip CASL 权限管理的流程
1. CaslAbilityService 负责根据用户信息构建权限对象。类似于
```js
[
  { action: 'read', subject: [class Users] },
  { action: 'create', subject: [class Users] },
  { action: 'delete', subject: [class Users] },
  { action: 'update', subject: [class Users] },
  { action: 'manage', subject: [class Users] },
  { action: 'read', subject: [class Logs] },
  { action: 'create', subject: [class Logs] },
  { action: 'delete', subject: [class Logs] }
]
```
2. CaslGuard 负责根据CaslAbilityService构建的权限对象，判断当前用户是否有对应的操作权限来进行守卫。
3. CaslDecorator 负责在控制器或者方法上定义权限规则。(CheckPolices, Can, Cannot)
:::







