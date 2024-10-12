# 日志

## 日志等级
<img src="/assets/nest/6.png">

## nestjs 内置日志模块

```typescript
  const logger = new Logger()
  logger.warn('Hello warn!')
  logger.error('Hello error!')
```

## 第三方日志模块 Pino

```typescript
pnpm install nestjs-pino
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

### 全局的异常过滤器

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

### 全局所有异常捕获过滤器

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