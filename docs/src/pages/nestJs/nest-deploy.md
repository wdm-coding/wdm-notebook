# nestjs 项目部署

## 安全配置

1. 启用cors跨域
  + app.enableCors();
2. 下载 `exress-rate-limit` 限制请求频率
```bash
$ npm i express-rate-limit
```
3. 下载helmt 防止http请求头注入
```bash
$ npm i helmet
```
4. main.ts 中配置

```ts
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 限制每IP地址15分钟内最多只能访问100次
  })
)
```

## 服务器环境配置

### 服务器安装Node.js环境
1. 安装nvm
```bash
# nvm 的 git 仓库地址
$ git clone https://github.com/nvm-sh/nvm.git ~/.nvm

# 安装nvm脚本
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

2. 安装node
```bash
$ nvm install 20.1.0
```

3. 切换node版本
```bash
$ nvm use 20.1.0
```

4. 设置默认node版本
```bash
$ nvm alias default 20.1.0
```

5. 安装nrm 管理npm源
```bash
$ npm install -g nrm
```
6. 切换npm源
```bash
$ nrm use taobao
```

### 服务器安装pm2
1. 安装pm2
```bash
$ npm install pm2 -g
```

### 服务器安装docker

1. linux安装docker
```bash
$ curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
2. 安装docker-compose
```bash
$ curl -L https://get.daocloud.io/docker/compose/releases/download/v2.17.3/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```

3. 配置docker-compose.yml安装mysql

```yaml
  version: '3.1'
  services:
    mysql:
      image: mysql
      command: --default-authentication-plugin=mysql_native_password
      restart: always
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: nest
        MYSQL_USER: nest
        MYSQL_PASSWORD: nest
      ports:
        - "3306:3306"
      volumes: # 持久化数据卷，将容器内的数据库文件映射到宿主机上，以便数据持久化。
        - /home/mysql/db:/var/lib/mysql

    adminer:
      image: adminer
      restart: always
      ports:
        - 8080:8080
```

4. 配置docker加速
```bash
 curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io
```

## 服务器部署项目

1. 打包项目

```bash
npm run build:prod
```
2. 上传dist目录到服务器

3. node 启动项目
```bash
# 切换到node版本
$ nvm use default
# 下载依赖
$ npm install
# 启动项目
$ node dist/main.js
```
4. pm2 管理node进程
```bash
# 安装pm2
$ npm install -g pm2

# 初始化项目配置文件
$ pm2 init

# 启动项目
$ node src/main.js
```

## docker 部署项目





