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

2. 下载 vscode 插件`quokka.js`，用于测试代码片段
 + 安装插件后，在代码片段中输入`quokka`即可测试












