# nestjs 数据库模块

## ORM（Object Relational Mapping）对象关系映射
  
  1. 允许开发者使用面向对象的方式来操作数据库
  2. 维护数据模型和数据库之间的映射关系
  3. ORM的第三方库：TypeORM、prisma、Sequelize、knex,EdgeDB等
  4. nestjs 官方推荐的 ORM：TypeORM
  5. 最新版本的 nestjs 官方推荐的 ORM：Prisma

::: tip 对象关系映射
  定义一个对象,对应数据库中的一个表,对象的实例对应数据库中的一个行数据
:::

## 关系型数据库
  1. 采用关系模型存储数据,数据之间存在关联关系
  2. 本质上就是若干个存储数据的二维表。
  3. 常见关联关系：一对一、一对多、多对多。
  4. ERD实体关系图（Entity Relationship Diagram），包括实体（Entity）、属性（Attribute）和关系（Relationship）。
  5. 优点：数据冗余较小，数据一致性较好。易于维护，支持复杂查询。
  6. 缺点：读写性能较差，灵活性差。
  7. 场景：业务系统，电商系统等。

  [数据库建表参考网站](https://open.yesapi.cn/list.html)

## 非关系型数据库
  1. 采用键值对存储数据，数据之间不存在关联关系。
  2. 优点：读写性能较高，灵活性高。
  3. 缺点：数据冗余较大，数据一致性较差。不易维护，复杂查询效率低。
  4. 场景：日志系统，缓存系统等。

## 数据库概念
  1. 表头-字段名称
  2. 表体-字段值
  3. 主键-唯一标识一条记录的字段
  4. 外键-用于建立两个表之间的关联关系
  5. 索引-用于提高查询效率的数据结构

<img src="/assets/nest/10.png" alt="数据库" style="margin-top:10px">

## nestjs 数据库解决方案

### 一、@nestjs/typeorm

  [Typeorm文档](https://typeorm.bootcss.com/one-to-one-relations)

  1. 安装依赖
  ```js
  npm install @nestjs/typeorm typeorm mysql2
  ```
  2. 配置数据库连接 `app.module.ts`
  ```js
  import { Module } from '@nestjs/common'
  import { ConfigModule, ConfigService } from '@nestjs/config'
  import { TypeOrmModule } from '@nestjs/typeorm'
  import { EnvConfig } from './enum/env.enum'
  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true, // 全局配置
        envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'] // 如果在多个文件中找到某个变量，则第一个变量优先。
      }),
      // 数据库模块 读取当前环境的数据库连接信息
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule], // 导入配置模块
        inject: [ConfigService], // 注入配置服务
        useFactory: (configService: ConfigService) => ({
          type: 'mysql', // 数据库类型
          host: configService.get(EnvConfig.DB_HOST), // 读取配置文件中的 DB_HOST 环境变量值作为主机名
          port: configService.get(EnvConfig.DB_PORT), // 读取配置文件中的 DB_PORT 环境变量值并转换为数字，作为端口号
          username: configService.get(EnvConfig.DB_USERNAME), // 读取配置文件中的 DB_USER 环境变量值作为用户名
          password: configService.get(EnvConfig.DB_PASSWORD), // 读取配置文件中的 DB_PASSWORD 环境变量值作为密码
          database: configService.get(EnvConfig.DB_DATABASE), // 读取配置文件中的 DB_NAME 环境变量值作为数据库名
          entities: [], // 实体类列表
          synchronize: true, // 自动同步数据库结构，开发环境使用，生产环境禁用。
          logging: ['error'] // 日志级别 'debug', 'log', 'warn', 'error'
        })
      })
      // 其他模块...
    ],
    controllers: [],
    providers: []
  })
  export class AppModule {}
  ```
## 数据库设计
  <img src="/assets/nest/11.png" alt="数据库设计" style="margin-top:10px">

## 实体类
<div class="warning">实体类创建数据库表的映射关系</div>

### 1. 创建实体类
  1. 创建实体类文件 `src/entities/user/user.entity.ts`
  ```js
  import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
  @Entity() // 实体类装饰器，告诉 TypeORM 这个类是一个实体类。
  export class User {
    @PrimaryGeneratedColumn() // 主键字段装饰器，告诉 TypeORM 这个属性是主键。
    id: number
    @Column({ type: 'varchar', length: 255 }) // 字段装饰器，告诉 TypeORM 这个属性是一个数据库列。
    name: string
    @Column({ type: 'varchar', length: 255 }) // 字段装饰器，告诉 TypeORM 这个属性是一个数据库列。
    password: string
  }
  ```
  2. 在`app.module.ts`注册实体类 
  ```js
  import { User } from './user/user.entity'
  import { Profile } from './profile/profile.entity'
  import { Roles } from './roles/roles.entity'
  import { Logs } from './logs/logs.entity'
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule], // 导入配置模块
    inject: [ConfigService], // 注入配置服务
    useFactory: (configService: ConfigService) =>
      ({
        type: configService.get(EnvConfig.DB_TYPE), // 数据库类型
        host: configService.get(EnvConfig.DB_HOST), // 读取配置文件中的 DB_HOST 环境变量值作为主机名
        port: configService.get(EnvConfig.DB_PORT), // 读取配置文件中的 DB_PORT 环境变量值并转换为数字，作为端口号
        username: configService.get(EnvConfig.DB_USERNAME), // 读取配置文件中的 DB_USER 环境变量值作为用户名
        password: configService.get(EnvConfig.DB_PASSWORD), // 读取配置文件中的 DB_PASSWORD 环境变量值作为密码
        database: configService.get(EnvConfig.DB_DATABASE), // 读取配置文件中的 DB_NAME 环境变量值作为数据库名
        entities: [User, Profile, Roles, Logs], // 实体类列表
        synchronize: true, // 自动同步数据库结构，开发环境使用，生产环境禁用。
        logging: ['error'] // 日志级别 'debug', 'log', 'warn', 'error'
      }) as any
  })
  ```
### 2. 创建实体类之间的关系

  1. 一对一关系：一对一是一种 A 只包含一个 B 实例，而 B 只包含一个 A 实例的关系。
  ```js
  // user 与 profile 关系
  // 一个用户只有一个个人资料，而一个个人资料只属于一个用户。
  import { Users } from 'src/user/user.entity'
  import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
  @Entity()
  export class Profile {
    @PrimaryColumn()
    id: number // 主键id字段
    @Column({ type: 'int' })
    gender: number // 性别字段
    @Column({ type: 'varchar', length: 11 })
    phone: string // 手机号字段
    @Column({ type: 'varchar', length: 255 })
    address: string // 地址字段
    // 一对一创建关联关系
    @OneToOne(() => Users) // 关联到User实体类
    @JoinColumn({ name: 'user_id' }) // 关联字段名
    users: Users // 用户字段
  }
  ```
  ::: tip 提示：
    1. 在profile文件中添加@OneToOne、@JoinColumn
    2. @OneToOne、@JoinColumn必选项并且只能在关系的一侧设置。
    3. 设置@JoinColumn的哪一方，哪一方的表将包含一个"relation id"和目标实体表的外键。
  :::

  2. 多对一/一对多关系：是指 A 包含多个 B 实例的关系，但 B 只包含一个 A 实例。。

  ```js
  // user 与 logs 关系
  // 一个用户可以有多个日志记录，但每个日志只属于一个用户。
  // 在 User 实体类中定义关系
  @OneToMany(() => Logs, logs => logs.users) // 关系装饰器，告诉 TypeORM 这个属性是一对多关系。
  logs: Logs[]
  // 在 Logs 实体类中定义关系
  @ManyToOne(() => Users, users => users.logs) // 关系装饰器，告诉 TypeORM 这个属性是一对多关系。
  @JoinColumn({ name: 'user_id' }) // 关联列装饰器，告诉 TypeORM 这个属性是外键字段。
  users: Users
  ```

  3. 多对多关系：多对多是一种 A 包含多个 B 实例，而 B 包含多个 A 实例的关系。

  ```js
  // user 与 roles 关系
  // 一个用户可以有多个角色，一个角色也可以被多个用户拥有。
  // 在 User 实体类中定义关系
  @ManyToMany(() => Roles, roles => roles.users) // 关系装饰器，告诉 TypeORM 这个属性是多对多关系。
  @JoinTable({
    name: 'users-roles', // 关联表的名字。
    joinColumn: {
      // 关联表的外键字段。
      name: 'users_id', // 外键字段的名字。
      referencedColumnName: 'id' // 外键字段引用的列名。
    },
    inverseJoinColumn: {
      // 关联表的另一个外键字段。
      name: 'roles_id', // 另一个外键字段的名字。
      referencedColumnName: 'id' // 另一个外键字段引用的列名。
    },
    schema: 'nest-test-db'
  }) // 关联表装饰器，告诉 TypeORM 这个属性是多对多关系并且需要创建一个关联表。
  roles: Roles[]
  // 在 Roles 实体类中定义关系
  @ManyToMany(() => Users, users => users.roles) // 关系装饰器，告诉 TypeORM 这个属性是多对多关系。
  users: Users[] // 用户字段
  ```

  ::: tip 提示：@OneToMany、@ManyToOne、@ManyToMany的参数
  1. 第一个参数是关联的实体类，可以是实体类本身或者实体类的构造函数。
  2. 第二个参数是一个回调函数，用于指定反向关系。
  :::

  ::: tip 提示：@JoinColumn选项
  1. @JoinColumn() 当我们设置@ JoinColumn时，它会自动在数据库中创建一个名为propertyName + referencedColumnName的列。
  2. j@JoinColumn({ name: "cat_id" }) 当我们在@JoinColumn中指定name时，它将创建一个名为"cat_id"的列。
  3. @JoinColumn({ referencedColumnName: "name" }) 当我们指定referencedColumnName时，它将创建一个名为propertyName的列，但会将外键指向"name"字段。
  :::

  ::: tip 提示：@JoinTable选项
  1. @ JoinTable用于“多对多”关系，并描述"junction"表的连接列。 
  2. 联结表是由 TypeORM 自动创建的一个特殊的单独表，其中的列引用相关实体。 
  3. 你可以使用@ JoinColumn更改联结表及其引用列中的列名： 你还可以更改生成的"junction"表的名称。
  :::

### 3. 使用已有数据库创建实体类
  
  + 下载插件 `typeorm-model-generator`
  ```js
  npm install typeorm-model-generator -D
  ```
  + 生成实体类
  ```js
  typeorm-model-generator -h 127.0.0.1 -d mydatabase -p 3306 -u root -x password -e mysql -o ./src/entity
  ```
  + package.json 添加脚本
  ```js
  "scripts": {
    "gen": "typeorm-model-generator -h 127.0.0.1 -d [数据库] -p [端口] -u [用户名] -x [密码] -e mysql -o [实体类存放路径]"
  }
  ```
  + 执行脚本
  ```js
  npm run gen
  ```

## Typeorm增删改查

可以通过`getRepository(Entity)`访问存储库。
```ts
// 在user.service.ts中导入Repository
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from '../entities/users/users.entity'
@Injectable() // NestJS装饰器，用于将类标记为服务。
export class UserService {
  constructor(
    @InjectRepository(Users) // 注入Repository<Users>类型，
    private readonly userRepository: Repository<Users> // 并将其赋值给userRepository属性。
  ) {}
  findAll() { // 查询所有用户信息
    return this.userRepository.find()
  }
}
```
### 查询数据
  + find 方法：查找所有记录。
    ```js
    const users = await getRepository(Users).find()
    console.log('users', users)
    ```
  + findOne 方法：根据条件查找一条记录。
    ```js
    const user = await getRepository(Users).findOne({ id: 1 })
    console.log('user', user)
    ```
  + findByIds 方法：根据多个id查找多条记录。
    ```js
    const users = await getRepository(Users).findByIds([1, 2])
    console.log('users', users)
    ```
  + findAndCount 方法：同时返回符合条件的记录和总数。
    ```js
    const [users, count] = await getRepository(Users).findAndCount()
    console.log('users', users)
    console.log('count', count)
    ```
  + findBy 方法：根据一个或多个字段的值来查找记录。
    ```js
    const users = await getRepository(Users).findBy({ name: '张三' })
    console.log('users', users)
    ```
### 插入数据
  + save 方法：插入一条记录。
    ```js
    const user = new Users()
    user.name = '张三'
    await getRepository(Users).save(user)
    console.log('user', user)
    ```
### 更新数据
  + update 方法：根据id更新一条记录。
    ```js
    await getRepository(Users).update({ id: 1 }, { name: '李四' })
    ```
  + save 方法：更新一条记录。
    ```js
    const user = await getRepository(Users).findOne({ id: 1 })
    user.name = '王五'
    await getRepository(Users).save(user)
    ```
### 删除数据
  + delete 方法：根据id删除一条记录。
    ```js
    await getRepository(Users).delete({ id: 1 })
    ```
  + remove 方法：删除一条记录。
    ```js
    const user = await getRepository(Users).findOne({ id: 1 })
    await getRepository(Users).remove(user)
    ```
### 关联查询 nestjs-8-10
1. relations 选项：指定要加载的关联关系。
```ts
// 查询用户详情信息
findProfile(id: number) {
  return this.userRepository.findOne({
    relations: {
      profile: true
    },
    where: { id }
  })
}
// 查询用户日志信息
async findUserLogs(id: number) {
  const user = await this.findOne(id)
  return this.logsRepository.find({
    relations: {
      users: false
    },
    where: { users: user as Users }
  })
}
```
2. QueryBuilder：构建复杂的查询。
```ts
// 日志高级查询
  async findLogsByGroup(id: number) {
    // 查询logs 的 result 字段分组统计
    // this.logsRepository.query(
    //   'SELECT result, COUNT(result) as count FROM logs GROUP BY result',
    // )
    return this.logsRepository
      .createQueryBuilder('logs') // 创建查询构建器，指定别名logs
      .select(['logs.result as result', 'COUNT(logs.result) as count']) // 指定查询的字段和别名
      .leftJoinAndSelect('logs.users', 'user') // 左连接users表，并选择相关字段
      .where('user.id = :id', { id: id }) // 添加查询条件，指定用户ID
      .groupBy('logs.result') // 根据logs.result字段分组统计
      .orderBy('count', 'DESC') // 根据统计结果降序排序
      .addOrderBy('result', 'DESC') // 根据日志结果升序排序
      .offset(1) // 设置查询偏移量，用于分页查询-pageNumber
      .limit(3) // 限制查询结果数量为10条 -pageSize
      .getRawMany() // 执行查询并返回原始结果集
  }
```
3. 原生SQL查询：直接执行原生SQL语句。
```ts
this.logsRepository.query(
  'SELECT result, COUNT(result) as count FROM logs GROUP BY result',
)
```



## ORM

1. ORM，全称为Object Relational Mapping（对象关系映射），是一种编程技术，用于在面向对象的编程语言和关系型数据库管理系统之间建立桥梁。

2. 每个数据库表对应一个类，表中的每行记录对应一个对象，每个字段对应一个属性。

[数据库参考](https://open.yesapi.cn/list.html)

### TypeOrm
<img src="https://typeorm.bootcss.com/logo/logo.png" style="margin:0 auto">

### [TypeOrm中文文档](https://typeorm.bootcss.com/)

```js
npm install --save @nestjs/typeorm typeorm mysql2
```
### TypeOrmModule配置
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


### typeorm-model-generator

一个用于自动生成 TypeORM 实体类和迁移文件的工具。它可以从现有的数据库结构中读取信息，并基于这些信息生成相应的 TypeScript 代码。这个工具可以帮助开发者节省手动创建和维护实体类的时间，提高开发效率。

```js
pnpm i -D typeorm-model-generator
// package.json中添加命令
"generate:models": "typeorm-model-generator -h 127.0.0.1 -p 3306 -d nestdb -u root -x example -e mysql - -o src/entities"
```































