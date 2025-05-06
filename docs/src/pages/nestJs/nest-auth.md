# nest 鉴权模块

## 管道介绍
1. 安装依赖
```bash
$ npm install class-validator --save
$ npm install class-transformer --save
```

2. `main.ts`设置全局管道
```ts
// 设置全局管道
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true // 移除多余属性
  })
)
```

3. 创建`auth.dto.ts`管道校验类
```ts
// auth.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator'
export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // $value: 'admin', // 当前传入的值
    // $property: 'username', // 属性名
    // $target: SigninUserDto, // 类本身
    // $constraint1: 6, // 最小的长度
    // $constraint2: 20, // 最大的长度
    message: '用户名长度必须在6到20之间'
  })
  username: string
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: '密码长度必须在6到20之间'
  })
  password: string
}
```

4. 在`auth.controller.ts`中使用管道校验
```ts
@Post('signin') // 登录
signIn(@Body() dto: SigninUserDto) {
  const { username, password } = dto
  return this.authService.signIn(username, password)
}
```

5. 变量管道校验结果
```ts
  // 根据id查询用户
  @Get('getUserById/:id')
  getUserById(@Query('id', ParseIntPipe) id: any): Promise<any> {
    return this.userService.findOne(id)
  }
```

6. user 模块中创建管道文件
```bash
nest g pi user/pipes/creat-user --no-spec
```

7. 在`creat-user.pipe.ts`中使用管道校验
```ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class CreatUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value
  }
}
```

8. 在`user.controller.ts`中使用管道
```ts
// 添加用户
@Post('add')
async addUser(@Body(CreatUserPipe) dto: any): Promise<any> {
  const result = await this.userService.create(dto)
  return {
    code: 0,
    msg: 'success',
    data: result
  }
}
```

9. 创建`create-user.dto`管道校验类
```ts
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from 'class-validator'
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  username: string
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  password: string
  @IsNumber()
  gender: number
  @IsPhoneNumber()
  phone: string
  @IsString()
  address: string
  @IsString()
  roleIds: string
}
```

10. 使用管道校验
```ts
// 添加用户
@Post('add')
async addUser(@Body(CreatUserPipe) dto: CreateUserDto): Promise<any> {
  console.log('dto', dto)
  const result = await this.userService.create(dto)
  return {
    code: 0,
    msg: 'success',
    data: result
  }
}
```

## JWT 鉴权
1. 安装依赖
```bash
$ npm install @nestjs/jwt passport-jwt --save
$ npm install @nestjs/passport passport --save
```
2. 创建Auth模块
```bash
$ nest g module auth
$ nest g service auth
$ nest g controller auth
```
3. 在`auth.module.ts`中导入JwtModule与PassportModule
```ts
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // 密钥
        signOptions: { expiresIn: '60s' } // 过期时间
      }),
      inject: [ConfigService] // 注入配置服务
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
```
4. 创建`auth.strategy.ts`策略文件
```ts
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvConfig } from '../enum/env.enum'
@Injectable()
// 扩展passport-jwt的策略类，用于验证token是否有效
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取token
      ignoreExpiration: false, // 忽略过期时间
      secretOrKey: configService.get(EnvConfig.JWT_SECRET) // 密钥
    })
  }
  validate(payload: any) {
    // 验证token是否有效，并返回用户信息，此处仅为演示，实际项目中应该从数据库中查询用户信息并返回
    return payload
  }
}
```
5. 在`auth.module.ts`中导入策略
```ts
import { JwtStrategy } from './auth.strategy'
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get(EnvConfig.JWT_SECRET), // 密钥
          signOptions: {
            expiresIn: '60s' // 过期时间
          }
        }
      },
      inject: [ConfigService] // 注入配置服务
    })
  ],
  providers: [AuthService, JwtStrategy], // 注入策略服务
  controllers: [AuthController]
})
```

<img src="/assets/nest/11.png" style="margin-top:15px">

6. 在`auth.service.ts`中使用策略
```ts
constructor(
  private readonly userService: UserService,
  private readonly jwtService: JwtService
) {}
async signIn(username: string, password: string) {
  const user = await this.userService.findOneByName(username)
  if (user && user.password === password) {
    // 将用户名作为JWT的有效载荷的一部分，并将其命名为"username"。同时，"sub"字段被设置为用户的ID。这两个字段在验证和访问用户信息时非常有用。
    const result = await this.jwtService.signAsync({
      username,
      sub: user.id
    })
    return result
  } else {
    throw new UnauthorizedException('用户名或密码错误')
  }
}
```

7. 在`auth.controller.ts`中使用策略
```ts
@Post('signin') // 登录
async signIn(@Body() dto: SigninUserDto) {
  const { username, password } = dto
  const token = await this.authService.signIn(username, password)
  return {
    code: 0,
    message: '登录成功',
    data: token
  }
}
```
8. 在其他需要鉴权的接口中使用策略`@UseGuards(AuthGuard('jwt'))`
```ts
// 查询所有用户
@Get('list')
@UseGuards(AuthGuard('jwt'))
async getAllUsers(@Query() query: UserQuery): Promise<any> {
  const result = await this.userService.findAll(query)
  return {
    code: 0,
    msg: 'success',
    data: result
  }
}
```

9. 11.13 鉴权守卫










