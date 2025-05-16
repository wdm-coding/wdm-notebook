# Jest 测试
1. 官方文档：https://jestjs.io/zh-Hans/docs/getting-started
2. 安装依赖
```bash
npm install --save-dev jest
```

## 单元测试
1. 在 `package.json` 中添加以下配置

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --verbose --watchAll",
}

"jest": {
    "verbore":true,
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
```
2. 编写测试用例
```ts
import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { Users } from '../../entities/users/users.entity'
describe('AuthController(鉴权-控制器)', () => {
  let controller: AuthController
  // 模拟AuthService服务
  const mockAuthService: Partial<AuthService> = {
    signUp: parmas => Promise.resolve(parmas as Users),
    signIn: () => Promise.resolve('token')
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('鉴权-初始化-实例化', () => {
    expect(controller).toBeDefined()
  })
  it('鉴权-注册用户', async () => {
    const result = await controller.signUp({ username: 'test', password: '123456' })
    expect(result).not.toBeNull()
    expect(result.username).toBe('test')
    expect(result.password).toBe('123456')
  })
  it('鉴权-登录用户', async () => {
    const result = await controller.signIn({ username: 'test', password: '123456' })
    expect(result).toBe('token')
  })
})
```

## 集成测试(e2e测试)

1. 使用docker新建测试数据库
```yaml
db1: # 数据库服务名称
  image: mysql # 指定镜像名称，这里使用的是官方 MySQL 镜像
  restart: always # 容器重启策略，这里设置为总是重启
  environment: # 设置环境变量，这里设置了 MySQL 根密码为 123456
    MYSQL_DATABASE:testdb
    MYSQL_ROOT_PASSWORD:123456 # 数据库根密码
  ports: # 端口映射，将容器的3306端口映射到宿主机的3090端口
    - "3308:3308"
```

2. 将全局配置统一处理到`setupApp.ts`
```ts
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AllExceptionsFilter } from './filters/all-exception.filter'
import { HttpAdapterHost } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'

export const setupApp = (app: INestApplication) => {
  // 使用全局日志记录器
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // 使用全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost), app.get(WINSTON_MODULE_NEST_PROVIDER)))
  // 设置全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // 移除多余属性
    })
  )
}
// main.ts中调用
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupApp } from './setup'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error']
  })
  setupApp(app)
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```
3. 创建初始化函数`test/app.factory.ts`

```ts
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { setupApp } from '../src/setup'
import { INestApplication } from '@nestjs/common'
import dataSource from '../ormconfig'
import { DataSource } from 'typeorm'
export class AppFactory {
  connection: DataSource
  constructor(private app: INestApplication) {}
  get instance() {
    return this.app
  }
  // 初始化APP实例
  static async init() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    const app = moduleFixture.createNestApplication()
    setupApp(app)
    await app.init()
    return new AppFactory(app)
  }

  // 初始化数据库
  async initDB() {
    if (!dataSource.isInitialized) {
      await dataSource.initialize()
      console.log('数据库连接成功')
    }
    this.connection = dataSource
  }
  // 清空数据库数据
  async clearDB() {
    // 获取所有实体对应的表名
    const entities = this.connection.entityMetadatas
    for (const entity of entities) {
      const repository = this.connection.getRepository(entity.name)
      await repository.query(`DELETE FROM \`${entity.tableName}\``)
    }
  }
  // 断开数据库连接
  async closeDB() {
    await this.connection.destroy()
  }
}
```

4. 单独封装初始化逻辑`test/setup-jest.ts`
```ts
import { AppFactory } from './app.factory'

let appFactory: AppFactory
global.beforeEach(async () => {
  appFactory = await AppFactory.init()
  await appFactory.initDB()
})
global.afterEach(async () => {
  await appFactory.clearDB()
})
```

5. 集成pactum
```bash
npm install pactum -D
```

6. 编写测试用例`test/app.e2e-spec`
```ts
import * as pactum from 'pactum'

describe('鉴权模块(e2e)集成测试', () => {
  beforeEach(() => {
    pactum.request.setBaseUrl('http://localhost:3000')
  })
  it('鉴权模块-测试', () => {
    return pactum.spec().get('/api/auth/test').expectStatus(200).expectBodyContains('Hello World!')
  })
  it('鉴权模块-登录', () => {
    return pactum.spec().post('/api/auth/signin').withBody({ username: 'admin', password: '123456' }).expectStatus(200)
  })
  it('鉴权模块-注册', () => {
    return pactum.spec().post('/api/auth/signup').withBody({ username: 'admin', password: '123456' }).expectStatus(200)
  })
})
```
