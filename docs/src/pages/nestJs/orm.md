# ORM

1. ORM，全称为Object Relational Mapping（对象关系映射），是一种编程技术，用于在面向对象的编程语言和关系型数据库管理系统之间建立桥梁。

2. 每个数据库表对应一个类，表中的每行记录对应一个对象，每个字段对应一个属性。

[数据库参考](https://open.yesapi.cn/list.html)

## TypeOrm
<img src="https://typeorm.bootcss.com/logo/logo.png" style="margin:0 auto">

# [TypeOrm中文文档](https://typeorm.bootcss.com/)

```js
npm install --save @nestjs/typeorm typeorm mysql2
```
## TypeOrmModule配置
```js
// TypeOrmModule.forRoot({
  //   type: 'mysql', // process.env.DB_TYPE, 数据库类型
  //   host: 'localhost', // process.env.DB_HOST,
  //   port: 3306, // process.env.DB_PORT,
  //   username: 'root', // process.env.DB_USERNAME,
  //   password: 'example', // process.env.DB_PASSWORD,
  //   database: 'nestdb', // process.env.DB_DATABASE, 要连接的数据库名称
  //   entities: [], //一个数组，包含要由 TypeORM 管理的实体类。这些实体类通常对应于数据库中的表
  //   synchronize: true, // 如果设置为 true，当你运行应用程序时，TypeORM 会自动创建或更新数据库表以匹配实体类的定义 同步本地的schema与数据库，初始化时候使用 生产环境不使用
  //   logging: ['error'] //指定 TypeORM 应记录哪些类型的日志。在这里，它设置为仅记录错误日志。
  // }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      ({
        type: configService.get(ConfigEnum.DB_TYPE), // process.env.DB_TYPE, 数据库类型
        host: configService.get(ConfigEnum.DB_HOST), // process.env.DB_HOST,
        port: configService.get(ConfigEnum.DB_PORT), // process.env.DB_PORT,
        username: configService.get(ConfigEnum.DB_USERNAME), // process.env.DB_USERNAME,
        password: configService.get(ConfigEnum.DB_PASSWORD), // process.env.DB_PASSWORD,
        database: configService.get(ConfigEnum.DB_DATABASE), // process.env.DB_DATABASE, 要连接的数据库名称
        entities: [], //一个数组，包含要由 TypeORM 管理的实体类。这些实体类通常对应于数据库中的表
        synchronize: configService.get(ConfigEnum.DB_SYNCHRONIZE), // 如果设置为 true，当你运行应用程序时，TypeORM 会自动创建或更新数据库表以匹配实体类的定义 同步本地的schema与数据库，初始化时候使用 生产环境不使用
        logging: configService.get(ConfigEnum.DB_LOGGING) //指定 TypeORM 应记录哪些类型的日志。在这里，它设置为仅记录错误日志。
      }) as TypeOrmModuleOptions
  }),
```


## typeorm-model-generator

一个用于自动生成 TypeORM 实体类和迁移文件的工具。它可以从现有的数据库结构中读取信息，并基于这些信息生成相应的 TypeScript 代码。这个工具可以帮助开发者节省手动创建和维护实体类的时间，提高开发效率。

```js
pnpm i -D typeorm-model-generator
// package.json中添加命令
"generate:models": "typeorm-model-generator -h 127.0.0.1 -p 3306 -d nestdb -u root -x example -e mysql - -o src/entities"
```