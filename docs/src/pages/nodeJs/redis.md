# 云Redis
1. 连接地址： vpc-bp16y4rnsmljh9lk1bu0w 密码：wdm-redis0620

## nodejs 使用 ioredis 连接云Redis

1. 安装依赖 npm install ioredis

2. 连接云Redis
```js
const Redis = require('ioredis')
const redisClient = new Redis({
    host: 'r-bp1gf0jpeextgbkojgpd.redis.rds.aliyuncs.com',// 阿里云 Redis 实例公网访问地址
    port: 6379,
    password: 'auth r-bp1gf0jpeextgbkojg:wdm-redis0620', // auth 账号:密码
    db: 0, // 使用哪个数据库，默认为0 Redis 默认有16个数据库，编号从0到15
    connectTimeout: 30000, // 连接超时时间 (毫秒)
    commandTimeout: 30000, // 命令执行超时时间 (毫秒)
    lazyConnect: true, // 延迟连接，即创建实例时不立刻连接
});
redisClient.on('connect', () => {
    console.log('Redis 连接成功！')
});
redisClient.on('error', (err) => {
    console.error('Redis 连接失败：', err);
});
redisClient.set('myKey', 'Hello myRedis!', (err, result) => {
    if (err) {
        console.error('设置失败：', err);
    } else {
        console.log('设置成功，结果为：', result);
    }
});
redisClient.get('test', (err, result) => {
    if (err) {
        console.error('获取失败：', err);
    } else {
        console.log('获取成功，结果为：', result);
    }
})
module.exports = redisClient
```