# 核心概念

## 客户端 < ----- > 控制器 < ----- > 服务 < ----- > 数据接入

  1. Controller 控制器 负责处理客户端请求 并调用服务
  2. Service 服务 负责处理业务逻辑 并调用数据接入
  3. DataAccess 数据接入 负责与数据源交互

<img src="/assets/nest/2.png">

## 生命周期

  1. 客户端请求到达
  2. 控制器处理请求
  3. 服务处理业务逻辑
  4. 数据接入与数据源交互
  5. 返回结果

 <img src="/assets/nest/1.png">

## 模块 Module
 1. 功能模块
 2. 共享模块
 3. 全局模块 (配置，数据库连接，日志)
 4. 动态模块 (使用时动态加载)

```typescript
@Module({
  imports: [], // 导入模块
  controllers: [], // 控制器
  providers: [] // 服务
})
```
## MVC 
Model View Controller
 1. Model 数据模型
 2. View 视图 (pug,hus,ejs)
 3. Controller 控制器

## DTO 
Data Transfer Object 数据传输对象

## DAO
Data Access Object 数据访问对象

<img src="/assets/nest/3.png">



