# nestjs 项目部署

### 1. 安装依赖

```bash
npm install pm2 -g
```

### 2. 配置文件

在项目根目录下创建 `ecosystem.config.js` 文件，内容如下：

```javascript
module.exports = {
  apps: [
    {
      name: 'nest-app', // 应用名称
      script: './dist/main.js', // 项目入口文件路径
      instances: 'max', // 根据CPU核心数启动多个实例
      exec_mode: 'cluster', // 使用集群模式运行应用
      watch: false, // 不监听文件变化自动重启
      env: {
        NODE_ENV: 'production', // 环境变量
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
```

### 3. 部署命令

使用 PM2 来管理你的 NestJS 应用。你可以通过以下命令来启动、停止或查看日志等操作。

#### 启动服务

```bash
pm2 start ecosystem.config.js --env production
```

#### 查看所有进程状态