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
