# Joi 验证

1. 安装 
   - `npm install joi`
2. 中间件使用
```js
const { User } = require("../models/index")
const Joi = require("joi")

module.exports = {
	registerValidate: async (ctx, next) => {
		const schema = Joi.object({
      name: Joi.string().required(),
			email: Joi.string().email().required(),
			username: Joi.string().required(),
			password: Joi.string().min(6).required(),
			phone: Joi.string().pattern(/^1[3-9]\d{9}$/).required(),
      age: Joi.number().integer().min(0).max(120)
		})
    .validate(ctx.request.body) // 验证请求体是否符合规则
    // 如果验证不通过，抛出错误
		if (schema.error) {
			ctx.throw(400, schema.error)
		}
    // 验证邮箱,手机号，用户名是否已经被注册
    const { email, username, phone } = ctx.request.body
    if (await User.findOne({ where: { email } })) {
      ctx.throw(400, "邮箱已被注册")
    }
    if (await User.findOne({ where: { username } })) {
      ctx.throw(400, "用户名已被注册")
    }
    if (await User.findOne({ where: { phone } })) {
      ctx.throw(400, "手机号已被注册")
    }
		await next()
	},
}
```
  