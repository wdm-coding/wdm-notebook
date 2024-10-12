# Docker

## Docker Hub

[Docker Hub](https://hub.docker.com/)

## 创建mysql镜像

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag

## 查看镜像
docker qs

## 停止镜像
docker stop 镜像id

## 删除镜像
docker rm 镜像id

## docker-compose

 启动命令
```yaml
  docker-compose up -d
```

```yaml
services:
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    ports:
      - 3306:3306

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```



