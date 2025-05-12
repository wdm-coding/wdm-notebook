# nest 权限控制模块(RBAC)

+ RABC 即 Role-Based Access Control，基于角色的访问控制。
+ 前端权限控制：前端路由控制、按钮权限控制。
+ 后端权限控制：接口权限控制、数据权限控制。
+ 基于角色的权限控制：角色拥有一定的权限，用户通过分配角色来获取相应的权限。
+ 基于策略的权限控制：通过策略列表来定义用户可以访问的资源。ACL 即 Access Control List，访问控制列表。
+ 混合模式：结合角色和策略的权限控制。

## 创建权限控制模块

1. nest创建roles增删改查模块
```bash
$ nest g resource roles --no-spec
# 选择REST 
```
2. migration:create 创建迁移文件
```bash
$ npm run migration:create src/migrations/init
```













