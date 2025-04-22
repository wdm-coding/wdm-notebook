# nestjs日志模块

## 日志等级
<img src="/assets/nest/6.png">

## nestjs 内置日志模块
1. 引入nest内置日志模块
```ts
import { Logger } from '@nestjs/common'
const logger = new Logger()
```
2. 在`main.ts`文件中配置日志等级
```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'crypto'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'] // ['error', 'warn', 'log', 'verbose', 'debug', setLogLevels, fatal]
  })
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```
3. 在控制器中使用日志模块
```ts
import { Controller, Delete, Get, Logger, Patch, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { Users } from '../entities/users/users.entity'

@Controller('user')
export class UserController {
  // 引入logger 装饰器，用于打印日志信息。
  private logger = new Logger(UserController.name)
  constructor(private userService: UserService) {
    // 打印日志信息
    this.logger.warn('UserController已经创建成功')
  }
  // 查询用户详情信息
  @Get('profile/:id')
  async getProfile(): Promise<any> {
    const data = await this.userService.findProfile(1)
    this.logger.warn('查询用户详情信息成功')
    return {
      code: 0,
      msg: 'success',
      data
    }
  }
}

```
<div style="color:red;margin-bottom:15px">注意：nest内置日志模块更多用于调试打印</div>
<div style="color:red">注意：nest内置日志模块不支持自定义日志格式，如果要自定义日志格式，可以使用第三方库</div>

## 第三方日志模块 Pino
1. 下载依赖
```bash
$ npm install nestjs-pino
```

2. 测试环境使用`pino-pretty`美化日志
```bash
$ npm install pino-pretty -S
```

3. 生产环境使用文件日志 `pino-roll`
```bash
$ npm install pino-roll -S
```

4. 在`app.module`文件中注册
```ts
import { LoggerModule } from 'nestjs-pino'
import { join } from 'path'
@Module({
  imports: [
    // pino日志模块 读取当前环境的日志配置信息
    LoggerModule.forRoot({
      pinoHttp: {
        // 配置 pino 日志中间件
        transport: {
          // 日志传输配置
          targets: [
            process.env.NODE_ENV === 'development'
              ? {
                  // 开发环境使用 pino-pretty 日志格式化插件，美化日志输出
                  level: 'info',
                  target: 'pino-pretty',
                  options: {
                    colorize: true // 是否美化日志输出，默认为 true
                  }
                }
              : {
                  // 生产环境使用 pino-roll 日志滚动插件，将日志写入文件并每天轮转一次
                  level: 'info',
                  target: 'pino-roll',
                  options: {
                    file: join('log', 'log.txt'), // 日志文件路径
                    frequency: 'daily', // 日志轮转频率，默认为 'daily'
                    size: '10m', // 日志文件大小限制，默认为 '10m'
                    mkdir: true // 是否创建日志目录，默认为 true
                  }
                }
          ]
        }
      }
    }),
    // 其他模块...
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
```

5. 在控制器中使用日志模块
```ts
import { Logger } from 'nestjs-pino'
constructor(
  private userService: UserService,
  private logger: Logger // 引入pino日志
) {
  this.logger.log('UserController 初始化完成')
}
```

## 第三方日志模块 winston
1. 下载依赖
```bash
$ npm install --save nest-winston winston
```

2. winston滚动日志 `winston-daily-rotate-file`
```bash
$ npm install --save winston-daily-rotate-file
```

3. 在config文件夹下创建`winston.config.ts`文件
```ts
// winston 日志配置文件
import * as winston from 'winston' // 引入 winston 日志模块
import { utilities, WinstonModule } from 'nest-winston' // 引入 nest-winston 日志模块
import 'winston-daily-rotate-file' // 引入 winston-daily-rotate-file 日志模块
const consoleBaseConfig = {
  level: 'warn', // 设置日志级别，此处设置为 warn 及以上级别的日志才会输出到控制台
  format: winston.format.combine(
    winston.format.timestamp(), // 添加时间戳
    winston.format.json(), // 添加 json 格式
    // 设置 nestLike 格式，此处设置为 NestJs-Log 应用名称
    utilities.format.nestLike('NestJs-Log', {
      colors: true, // 开启彩色输出
      prettyPrint: true, // 开启美化输出
      processId: true, // 开启进程 ID
      appName: true // 开启应用名称
    })
  )
}
const dailyRotateFileConfig = (level, filename) => ({
  level, // 设置日志级别，此处设置为 info 及以上级别的日志才会输出到文件
  dirname: 'logs/winston-log', // 设置日志文件目录，此处设置为 logs 文件夹下的 winston-log 子文件夹
  filename: `${filename}-%DATE%.log`, // 设置日志文件名，此处设置为当前日期.log
  datePattern: 'YYYY-MM-DD-HH', // 设置日志文件日期格式，此处设置为 YYYY-MM-DD
  zippedArchive: true, // 设置日志文件是否压缩，此处设置为压缩
  maxSize: '20m', // 设置日志文件最大大小，此处设置为 20MB
  maxFiles: '14d', // 设置日志文件最大数量，此处设置为 14 天
  format: winston.format.combine(
    winston.format.timestamp(), // 添加时间戳
    winston.format.simple() // 添加简单格式
  )
})
// 配置 winston 日志模块实例
const instanceWinston = winston.createLogger({
  // 配置日志输出方式
  transports: [
    // 控制台输出
    new winston.transports.Console({ ...consoleBaseConfig }),
    // warn文件输出
    new winston.transports.DailyRotateFile(dailyRotateFileConfig('warn', 'warn')),
    // info文件输出
    new winston.transports.DailyRotateFile(dailyRotateFileConfig('info', 'info'))
  ]
})
const WinstonLogger = WinstonModule.createLogger({ instance: instanceWinston })
export default WinstonLogger
```

4. 在`main.ts`文件中配置
```ts
// 1. 导入WinstonLogger
import WinstonLogger from './config/winston.config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger // 注入 winston 日志模块实例
  })
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

5. 在`app.module.ts`全局注册
```ts
// 1. 导入Logger
import { Logger, Module } from '@nestjs/common'
// 2. 全局注册APP模块 
@Global() 
@Module({
  imports: [],
  controllers: [],
  providers: [Logger],// 3. 全局提供Logger服务
  exports: [Logger] // 4. 导出日志服务，使其可以在其他模块中被注入使用
})
```

6. 在控制器中使用日志模块
```ts
// 1. 导入Logger服务
import { Logger } from '@nestjs/common'
// 2. 注入Logger服务
constructor(private readonly logger: Logger) {
  this.logger.log('UserController 初始化完成')
}
```

## 异常过滤器Filter

<div class="primary">路由过滤器 -- 控制器过滤器 -- 全局过滤器</div>

### http-exception

1. 概念：HttpExceptionFilter 类是一个自定义的异常过滤器，它专门用于捕获 HttpException 类型的异常。此类实现了 ExceptionFilter 接口，并重写了 catch 方法来定义当异常发生时应该如何处理。

2. 使用
:::tip new HttpException 参数：
- 第一个参数是错误信息，可以是字符串或对象。
- 第二个参数是 HttpStatus，它是一个枚举类型，用于指定 HTTP 响应的状态码。
:::

```ts
// 1. 导入HttpException, HttpStatus
import { HttpException, HttpStatus } from '@nestjs/common'
// 2. 实现ExceptionFilter接口
const admin = false
if (!admin) {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
}
```

### 内置 HTTP 异常过滤器
```ts
throw new BadRequestException('无效的请求') // 400 无效的请求
throw new UnauthorizedException('无权限') // 401 无权限
throw new NotFoundException('找不到资源') // 404 
throw new ForbiddenException('禁止访问') // 403 禁止访问
//  ... 更多内置异常类
```

### 全局HTTP异常捕获过滤器

1. 在`src/filters/http-exception.filter.ts`文件中创建异常过滤器
```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from '@nestjs/common'

@Catch(HttpException) // 拦截器装饰器，拦截特定异常类型
export class HttpExceptionFilter implements ExceptionFilter {
  // 记录日志服务注入到构造函数中
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() // 切换到http上下文
    const response = ctx.getResponse() // 获取响应对象
    const request = ctx.getRequest() // 获取请求对象
    const status = exception.getStatus() // 获取异常状态码
    // 记录异常信息
    this.logger.error(exception.message, exception.stack)
    // 设置响应状态码和返回数据
    response.status(status).json({
      statusCode: status, // 状态码
      timestamp: new Date().toISOString(), // 时间戳
      path: request.url, // 请求路径
      message: exception.message || HttpException.name, // 异常信息
      method: request.method // 请求方法
    })
  }
}
```

2. 在`main.ts`文件中全局注册异常过滤器
```ts
// 1. 导入HttpExceptionFilter 和 WinstonLogger
import { HttpExceptionFilter } from './filters/http-exception.filter'
import WinstonLogger from './config/winston.config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger // 注入 winston 日志模块实例
  })
  app.setGlobalPrefix('api')
  // 全局注册异常过滤器 传入日志服务实例
  app.useGlobalFilters(new HttpExceptionFilter(WinstonLogger))
  await app.listen(process.env.PORT ?? 3000)
}
```

### 全局所有异常捕获过滤器
1. 下载获取用户IP地址的库`request-ip`
```bash
$ npm install request-ip --save
```

2. 在`src/filters/all-exception.filter.ts`文件中创建异常过滤器
```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
// 全局所有异常捕获过滤器
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
// 获取用户IP
import * as requestIp from 'request-ip'
@Catch() // 捕获所有异常
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService, // 日志服务
    private readonly httpAdapterHost: HttpAdapterHost // http适配器宿主
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost // 获取http适配器
    const ctx = host.switchToHttp() // 切换到http上下文
    const response = ctx.getResponse<Response>() // 获取响应对象
    const request = ctx.getRequest<Request>() // 获取请求对象
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR // 获取http状态码
    // 响应体数据
    const responseBody = {
      headers: request.headers, // 请求头
      body: request.body, // 请求体
      timestamp: new Date().toISOString(), // 时间戳
      ip: requestIp.getClientIp(request), // 用户IP
      message: exception.message, // 异常信息
      exception: exception.name, // 异常名称
      status: httpStatus, // 状态码
      error: exception.response || '未知错误' // 错误信息
    }
    this.logger.error('捕获异常: ', responseBody) // 打印日志信息
    httpAdapter.reply(response, responseBody, httpStatus) // 返回响应信息
  }
}
```

3. 在`main.ts`文件中全局注册异常过滤器
```ts
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import WinstonLogger from './config/winston.config'
import { AllExceptionsFilter } from './filters/all-exception.filter'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonLogger // 注入 winston 日志模块实例
  })
  app.setGlobalPrefix('api')
  // HttpAdapterHost 是 NestJS 框架中的一个服务，它提供了一个适配器（Adapter）来处理 HTTP 请求和响应。
  // 注入 HttpAdapterHost 服务，可以让我们在全局过滤器中使用 NestJS 的 HTTP 适配器来处理异常。
  const httpAdapter = app.get(HttpAdapterHost)
  // 注入 httpAdapter 到 AllExceptionsFilter 中，以便在全局过滤器中使用 NestJS 的 HTTP 适配器来处理异常。
  app.useGlobalFilters(new AllExceptionsFilter(WinstonLogger, httpAdapter))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

## 重构日志系统（logs模块）9-7

1.  日志`modules`创建
```bash
$ nest g module logs
```

2. 在`src/enum/log.enum.ts`文件中配置日志枚举
```ts
export enum LogConfig {
  LOG_LEVEL = 'LOG_LEVEL',
  LOG_ON = 'LOG_ON'
}
```

3. 在.env文件中配置日志变量
```bash
LOG_LEVEL=info
LOG_ON=true
```

4. 在`logs.module.ts`文件中配置日志
```ts
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { LogConfig } from '../enum/log.enum'
import * as DailyRotateFile from 'winston-daily-rotate-file'
const consoleConfig = () =>
  new winston.transports.Console({
    level: 'info', // 日志等级
    format: winston.format.combine(
      winston.format.timestamp(), // 添加时间戳
      winston.format.json(), // 添加 json 格式
      // 设置 nestLike 格式，此处设置为 NestJs-Log 应用名称
      utilities.format.nestLike('NestJs-Log', {
        colors: true, // 开启彩色输出
        prettyPrint: true, // 开启美化输出
        processId: true, // 开启进程 ID
        appName: true // 开启应用名称
      })
    )
  })
const warnDailyRotateFileConfig = (configService: ConfigService) =>
  new DailyRotateFile({
    level: configService.get(LogConfig.LOG_LEVEL), // 设置日志级别，此处设置为 info 及以上级别的日志才会输出到文件
    dirname: 'logs/winston-log', // 设置日志文件目录，此处设置为 logs 文件夹下的 winston-log 子文件夹
    filename: `${configService.get(LogConfig.LOG_LEVEL)}-%DATE%.log`, // 设置日志文件名，此处设置为当前日期.log
    datePattern: 'YYYY-MM-DD-HH', // 设置日志文件日期格式，此处设置为 YYYY-MM-DD
    zippedArchive: true, // 设置日志文件是否压缩，此处设置为压缩
    maxSize: '20m', // 设置日志文件最大大小，此处设置为 20MB
    maxFiles: '14d', // 设置日志文件最大数量，此处设置为 14 天
    format: winston.format.combine(
      winston.format.timestamp(), // 添加时间戳
      winston.format.simple() // 添加简单格式
    )
  })
const infoDailyRotateFileConfig = () =>
  new DailyRotateFile({
    level: 'info', // 设置日志级别，此处设置为 info 及以上级别的日志才会输出到文件
    dirname: 'logs/winston-log', // 设置日志文件目录，此处设置为 logs 文件夹下的 winston-log 子文件夹
    filename: `info-%DATE%.log`, // 设置日志文件名，此处设置为当前日期.log
    datePattern: 'YYYY-MM-DD-HH', // 设置日志文件日期格式，此处设置为 YYYY-MM-DD
    zippedArchive: true, // 设置日志文件是否压缩，此处设置为压缩
    maxSize: '20m', // 设置日志文件最大大小，此处设置为 20MB
    maxFiles: '14d', // 设置日志文件最大数量，此处设置为 14 天
    format: winston.format.combine(
      winston.format.timestamp(), // 添加时间戳
      winston.format.simple() // 添加简单格式
    )
  })

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // 自定义提供器
        transports: [
          // Console输出
          consoleConfig(),
          // warn文件输出
          warnDailyRotateFileConfig(configService),
          // info文件输出
          infoDailyRotateFileConfig()
        ]
      })
    })
  ]
})
export class LogsModule {}
```

5. 在`main.ts`中全局注册日志
```ts
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
// 1. 全局注册日志
app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)) 
// 2. 全局注册异常过滤器
app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, app.get(WINSTON_MODULE_NEST_PROVIDER))) 
```

6. 在控制器中使用日志
```ts
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston' 
import { Inject,LoggerService } from '@nestjs/common'
constructor(
  private userService: UserService,
  @Inject(WINSTON_MODULE_NEST_PROVIDER)
  private logger: LoggerService
) {
  this.logger.log('log-日志测试')
}
```

## 数据库代码重构：TypeORM与Nestjs整合

1. 在项目根目录下创建`ormconfig.ts`文件，配置数据库连接信息
```ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { EnvConfig } from 'src/enum/env.enum'
// 1. 通过环境变量读取不同的.env文件
function getEnv(env: string): Record<string, unknown> {
  // 检查环境变量文件是否存在
  if (fs.existsSync(env)) {
    // 如果文件存在，则读取文件内容并解析
    return dotenv.parse(fs.readFileSync(env))
  }
  // 如果文件不存在，返回一个空对象
  return {}
}

// 2. 批量导入entities实体文件
const entitiesDir = [__dirname + '/src/entities/**/*.entity{.ts,.js}']

// 3. 通过dotENV来解析不同的配置文件
function buildConnectionOptions() {
  const defaultConfig = getEnv(`.env`) // 从默认环境配置文件读取配置
  const envConfig = getEnv(`.env.${process.env.NODE_ENV}`) // 根据当前环境变量读取相应的环境配置文件
  const config = { ...defaultConfig, ...envConfig } // 合并默认配置和环境配置
  return {
    type: config[EnvConfig.DB_TYPE], // 数据库类型
    host: config[EnvConfig.DB_HOST], // 数据库主机
    port: config[EnvConfig.DB_PORT], // 数据库端口
    username: config[EnvConfig.DB_USERNAME], // 数据库用户名
    password: config[EnvConfig.DB_PASSWORD], // 数据库密码
    database: config[EnvConfig.DB_DATABASE], // 数据库名称
    entities: entitiesDir, // 数据库实体
    synchronize: true, // 是否自动同步数据库架构
    logging: false // 是否记录日志
  } as TypeOrmModuleOptions
}

// 3. 导出配置文件
export const typeOrmConfig = buildConnectionOptions()
// 4. 导出数据源配置文件
export default new DataSource({
  ...typeOrmConfig,
  migrations: ['src/migrations/**'], // 迁移文件路径
  subscribers: [] // 订阅者文件路径
} as DataSourceOptions)
```

2. 在`app.module.ts`中配置TypeORM
```ts
import { typeOrmConfig } from '../ormconfig'
@Module({
  imports:[
    TypeOrmModule.forRoot(typeOrmConfig),
  ]
})
```

## TypeORM异常处理

```typescript
// controller.ts
@Controller('user')
@UseFilters(new TypeormFilter())

// typeorm.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { TypeORMError } from 'typeorm'
const errorTemplate = (message: string) => ({
  code: 1,
  msg: message,
  data: null
})
@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    switch (exception.name) {
      case 'QueryFailedError':
        const errno = (exception as any)?.driverError?.errno
        if (errno === 1062) {
          console.log('[request]', request)
          if (request.url === '/wdm/v1/user/add') {
            response.status(200).json(errorTemplate('用户名已存在'))
          } else {
            response.status(200).json(errorTemplate('唯一键重复'))
          }
        } else {
          response.status(500).json(errorTemplate('Bad Request'))
        }
        return
      case 'EntityNotFound':
        response.status(404).json(errorTemplate('Not Found'))
        return
      default:
        response.status(200).json(errorTemplate(exception.message))
        break
    }
  }
}

```

