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
    // 验证token是否有效，并返回用户信息
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

## AuthGuard 守卫

### 自定义守卫
1. 创建guard守卫文件
```bash
$ nest g guard guards/admin --no-spec
```
2. 在`guards/admin.guard.ts`中编写逻辑
```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { Users } from '../entities/users/users.entity'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const req = context.switchToHttp().getRequest()
    // 2. 获取请求头中的token, 解析token, 获取其中的用户信息, 判断用户是否为拥有角色权限
    const user = (await this.userService.findOneByName(req.headers['username'])) as Users
    if (user.roles.find(role => role.code === 'admin')) {
      // 如果用户是管理员，则返回true，否则返回false。
      return true
    } else {
      return false
    }
  }
}
```
3. 在`user.controller.ts`中导入守卫
```ts
// 查询所有用户
@Get('list')
// 1. 多个装饰器的执行顺序是从下到上
// @UseGuards(AdminGuard)
// @UseGuards(AuthGuard('jwt'))
// 2. 装饰器传递多个守卫，执行顺序是从前往后
@UseGuards(AdminGuard, AuthGuard('jwt'))
async getAllUsers(@Query() query: UserQuery): Promise<any> {
  const result = await this.userService.findAll(query)
  return {
    code: 0,
    msg: 'success',
    data: result
  }
}
```

::: warning 装饰器执行顺序
1. 多个装饰器的执行顺序是从下到上
+ `@UseGuards(AdminGuard)`
+ `@UseGuards(AuthGuard('jwt'))`
2. 装饰器传递多个守卫，执行顺序是从前往后
+ `@UseGuards(AdminGuard, AuthGuard('jwt'))`
:::

### 全局守卫（jwt守卫）
1. 创建`guards/jwt.guard.ts`文件
```ts
import { AuthGuard } from '@nestjs/passport'

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }
}
```
2. 在`controll`中使用全局守卫
```ts
@Controller('user')
@UseFilters(new TypeormFilter())
@UseGuards(JwtGuard)
```
3. 在`main.ts`中使用全局守卫
```ts
// 无法使用其他模块的服务
app.useGlobalGuards(new JwtGuard())
```

4. 在`auth.module.ts`中使用全局守卫
```ts
@Module({
  imports: [],
  controllers: []
  providers: [{
    provide: APP_GUARD,
    useClass: JwtGuard
  }], // 注入策略服务
  exports: []
})
export class AuthModule {}
```

::: tip nestjs中一些全局装饰器
1. 全局过滤器`useGlobalFilters()`
2. 全局守卫`useGlobalGuards()`
3. 全局拦截器`useGlobalInterceptors()`
4. 全局管道`useGlobalPipes()`
5. 全局Module`@Global()`
:::

## 敏感信息加密（argon2）
1. 安装argon2库
```bash
$ npm install argon2
```
2. 注册接口中使用argon2加密密码
```ts
import * as argon2 from 'argon2'
async signUp(username: string, password: string) {
  const user = await this.userService.findOneByName(username)
  if (user) throw new ForbiddenException('用户已存在,请直接登录')
  // 密码加密
  const hashPassword = await argon2.hash(password)
  const userTmp = await this.userService.registerUser({ username, password: hashPassword })
  return userTmp
}
```
3. 登录接口中使用argon2验证密码
```ts
async signIn(username: string, password: string) {
  const user = await this.userService.findOneByName(username)
  if (!user) throw new ForbiddenException('用户名不存在')
  // 用户密码校验
  const isPasswordValid = await argon2.verify(user.password, password)
  if (!isPasswordValid) throw new UnauthorizedException('用户名或密码错误')
  // 生成JWT
  const result = await this.jwtService.signAsync({
    username,
    sub: user.id
  })
  return result
}
```

## 拦截器
1. 创建拦截器
```bash
$ nest g interceptor interceptors/serialize --no-spec
```
2. 编写拦截器逻辑
```ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('拦截器执行之前')
    return next.handle().pipe(
      map(data => {
        console.log('拦截器执行之后')
        return data
      })
    )
  }
}
```
3. 局部使用拦截器
```ts
@UseInterceptors(SerializeInterceptor)
async getAllUsers(@Query() query: UserQuery): Promise<any> {
  const result = await this.userService.findAll(query)
  return {
    code: 0,
    msg: 'success',
    data: result
  }
}
```
4. 全局使用拦截器
```ts
app.useGlobalInterceptors(new SerializeInterceptor())
```

5. 拦截器序列化
```ts
// 1. 在entity中定义排除字段
@Exclude() // 排除属性装饰器，告诉 TypeORM 这个属性不应该被序列化。
password: string
// 2. 在拦截器中使用class-transformer库的plainToClass方法进行序列化
@UseInterceptors(ClassSerializerInterceptor)
```
6. 自定义拦截器序列化
+ 在拦截器中使用class-transformer库的plainToClass方法进行序列化
```ts
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    console.log('拦截器执行之前')
    return next.handle().pipe(
      map(data => {
        console.log('拦截器执行之后')
        const result = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true // 排除掉多余的值,必须设置Exporse或者Exclude
        })
        return result
      })
    )
  }
}
```
7. 创建decotator/serialize.decotator.ts装饰器
```ts
import { UseInterceptors } from '@nestjs/common'
import { SerializeInterceptor } from '../interceptors/serialize.interceptor'
interface ClassConstructor {
  new (...args: any[]): any
}
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
```
8. 使用装饰器
```ts
@Serialize(UserDto)
```