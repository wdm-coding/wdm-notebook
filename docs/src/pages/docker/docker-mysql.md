# Docker 创建 Mysql 数据库镜像

## 方式一、Docker Hub 创建 MySQL 镜像
  1. 官方镜像地址：https://hub.docker.com/_/mysql
  2. 启动 MySQL 实例
```bash
  $ docker run --name 分配给容器的名称 -e MYSQL_ROOT_PASSWORD=自己设置密码 -d mysql
```
## 方式二、Docker-Compose 创建 MySQL 镜像
  1. 项目根目录下创建 `docker-compose.yml` 文件
```yaml
version: '3.1' # 指定 docker-compose 版本号
services: # 定义服务列表
  db: # 数据库服务名称
    image: mysql # 指定镜像名称，这里使用的是官方 MySQL 镜像
    restart: always # 容器重启策略，这里设置为总是重启
    environment: # 设置环境变量，这里设置了 MySQL 根密码为 123456
      MYSQL_ROOT_PASSWORD: 123456 # 数据库根密码
    ports: # 端口映射，将容器的3306端口映射到宿主机的3306端口
      - "3306:3306"
  adminer: # 数据库管理工具服务
   image: adminer # 指定镜像名称，这里使用的是官方 Adminer 镜像
   restart: always # 容器重启策略，这里设置为总是重启
   ports: # 端口映射，将容器的8080端口映射到宿主机的8081端口
    - 8081:8080
```
  2. 启动 MySQL 服务
```bash
$ docker-compose up -d
``` 
  3. 访问 Adminer 管理界面
::: tip 访问地址
```bash
  http://localhost:8081
```
:::
<img src="/assets/docker/1.png" alt="MySQL Adminer 管理界面" style="margin-top:15px">

  4. Naivgator 输入数据库连接信息
