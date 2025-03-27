# Docker 基础

## 介绍
  Docker让开发中将应用程序与基础架构，可以像管理应用程序一样管理基础架构。

## 架构
  1. Client:客户端打包、拉取镜像、运行容器等操作
  2. HOST:守护进程，负责管理镜像、容器等对象
  ::: tip Docker 架构
  + daemon:守护进程
  + containerd:容器,共享daemon的资源
  + images:镜像仓库
  :::
  3. Registery:镜像仓库,下载镜像

  [Docker 官方镜像源](https://hub.docker.com/)

## 安装
  1. 安装Docker

  [官方下载地址](https://docs.docker.com/engine/install/)

  2. Docker汉化

  [Docker汉化包下载](https://github.com/asxez/DockerDesktop-CN)

  3. 查看版本
```bash
  docker --version
  docker-compose --version
```
::: tip docker-compose介绍
docker-compose 是一个用于定义和运行多容器 Docker 应用程序的工具。它允许用户通过 YAML 文件来配置应用程序的服务，然后一键启动所有服务。这种方法简化了容器的管理，使得开发、测试和部署多容器应用程序变得更加容易。
:::

## 配置镜像加速
  1. 阿里云镜像加速
::: tip 阿里云镜像加速
在系统右下角托盘图标内右键菜单选择 Settings，打开配置窗口后左侧导航菜单选择 Docker Daemon。编辑窗口内的JSON串，填写下方加速器地址：
```json
{
  "registry-mirrors": ["https://e2n0d5sj.mirror.aliyuncs.com"]
}
```
编辑完成后点击 Apply 保存按钮，等待Docker重启并应用配置的镜像加速器。
:::

## 查看镜像列表
```bash
  docker images
```

## 创建镜像
docker run
```bash
  docker run -it ubuntu /bin/bash
```

## 查看镜像
```bash
  docker ps -a
```

## 停止镜像
```bash
  docker stop 镜像id
```

## 删除镜像
```bash
  docker rm 镜像id
```

## docker-compose启动命令
```bash
  docker-compose up -d
```