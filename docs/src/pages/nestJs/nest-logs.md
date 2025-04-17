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
2. 在module文件中注册
```ts
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { LoggerModule } from 'nestjs-pino'
@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
```
3. 在控制器中使用日志模块
```ts
import { Logger } from 'nestjs-pino'
constructor(
  private userService: UserService,
  private logger: Logger // 引入pino日志
) {
  this.logger.log('UserController 初始化完成')
}
```
4. 格式化打印内容
```bash
$ npm install pino-pretty -S
```


























```typescript
import { NestFactory } from '@nestjs/core'
import { Controller, Get, Module } from '@nestjs/common'
import { LoggerModule, Logger } from 'nestjs-pino'

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {}

  @Get()
  getHello() {
    this.logger.log('something')
    return `Hello world`
  }
}

@Module({
  controllers: [AppController],
  imports: [LoggerModule.forRoot()]
})
class MyModule {}

async function bootstrap() {
  const app = await NestFactory.create(MyModule)
  await app.listen(3000)
}
bootstrap()
```

### 格式化打印内容 pino-pretty

```typescript
pnpm install pino-pretty -S
```

### 文件日志 pino-roll

```typescript
pnpm install pino-roll -S
```
### nestjs 集成 pino

```typescript
// app.module.ts
LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                level: 'info',
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS_STDTIME',
                  ignore: 'pid,hostname'
                }
              }
            : {
                level: 'info',
                target: 'pino-roll',
                options: {
                  file: join('log', 'log.txt'),
                  frequency: 'daily',
                  size: '10m',
                  mkdir: true
                }
              }
      }
    })
```


## 第三方日志模块 winston

```typescript
npm install --save nest-winston winston
```

### nestjs 集成 winston

```typescript
  // main.ts
  const instanceWinston = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('MyApp', {
            colors: true,
            prettyPrint: true,
            processId: true,
            appName: true
          })
        ),
        level: 'debug',
        handleExceptions: true
      })
    ]
  })
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: instanceWinston })
  })
  // add.module.ts
  @Global() // 全局注册app.module
  providers: [Logger], //这个服务可以在模块内部被注入到其他类（如控制器或其他服务）中
  exports: [Logger] //包含要从当前模块导出以供其他模块使用的提供者或值的数组
  // controller.ts
  Logger as loggerWinston,
  private readonly loggerWinston: loggerWinston
  this.loggerWinston.log('Hello world')
```

### winston滚动日志 winston-daily-rotate-file

```typescript
pnpm install --save winston-daily-rotate-file
```

## 全局的异常过滤器

```typescript
// filter文件夹 http-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    // 响应对象
    const response = ctx.getResponse()
    // 请求对象
    const request = ctx.getRequest()
    // http 状态码
    const status = exception.getStatus()
    this.logger.error(exception.message, exception.stack)
    // 响应体
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || exception.name
    })
    // throw new Error('Custom error')
  }
}
```

```typescript
// main.ts
const loggerInt = WinstonModule.createLogger({ instance: instanceWinston })
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'debug'] // 日志 'log'、'fatal'、'error'、'warn'、'debug' 和 'verbose'
    logger: loggerInt
  })
app.useGlobalFilters(new HttpExceptionFilter(loggerInt))
```

## 全局所有异常捕获过滤器

```typescript
// filter文件夹 all-exception.filter.ts
import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { ArgumentsHost, Catch } from '@nestjs/common'

import * as requestIp from 'request-ip'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      // 还可以加入一些用户信息
      // IP信息
      ip: requestIp.getClientIp(request),
      exceptioin: exception['name'],
      error: exception['response'] || 'Internal Server Error'
    }

    this.logger.error('[toimc]', responseBody)
    httpAdapter.reply(response, responseBody, httpStatus)
  }
}

```

## 重构日志系统（logs模块）

### 1.logs.module.ts

```typescript
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as winston from 'winston'
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston'
import { Console } from 'winston/lib/winston/transports'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import { LoggerEnum } from 'src/enum/config.enum'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransPorts = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike()
          )
        })
        const dailyTransPorts = new DailyRotateFile({
          level: configService.get(LoggerEnum.LOG_LEVEL),
          dirname: 'logs',
          filename: 'app-%DATE%.log', // 文件名
          datePattern: 'YYYY-MM-DD-HH', // 文件名格式
          zippedArchive: true, // 压缩文件
          maxSize: '20m', // 文件大小
          maxFiles: '14d', // 保存文件天数 14 天
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
        const dailyInfoTransPorts = new DailyRotateFile({
          level: configService.get(LoggerEnum.LOG_LEVEL),
          dirname: 'logs',
          filename: 'info-%DATE%.log', // 文件名
          datePattern: 'YYYY-MM-DD', // 文件名格式
          zippedArchive: true, // 压缩文件
          maxSize: '20m', // 文件大小
          maxFiles: '14d', // 保存文件天数 14 天
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
        return {
          transports: [
            consoleTransPorts,
            ...(configService.get(LoggerEnum.LOG_ON)
              ? [dailyInfoTransPorts, dailyTransPorts]
              : [])
          ]
        } as WinstonModuleOptions
      }
    })
  ]
})
export class LogsModule {}

```
### 2.main.ts

```typescript
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
```

### 3.controller使用

```typescript
constructor(
  @Inject(WINSTON_MODULE_NEST_PROVIDER)
  private readonly logger: LoggerService
) {
  this.logger.log('用户模块初始化')
}
```

## 模块私有异常捕获

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

