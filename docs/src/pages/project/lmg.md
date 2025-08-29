# 陇明公

## 陇明公PC端：
1. 生产：jscadmin   Find.888
2. 测试：adminm707efsfLmg   azxc@s145$
3. 测试省人社 admingsm707efsfLmg iO7zO6jE6yR
4. 测试兰州市人社 admin999999m707efsfLmg azxc@s145$
5. 测试城关区人社 admin888888m707efsfLmg azxc@s145$

## 陇明公欠薪小程序微信公众平台
1.  lmg_complaint@163.com    lmg_compt_silkdo

### 陇明公欠薪小程序登录流程
1. 进入index页面 - 根据userLogin接口 - 获取是否已经注册过 存储isLogin
2. 点击添加投诉线索 - 获取微信头像 - 查看isLogin是否注册
3. 未注册 - wxLogin - getCode -uni.login(获取code) - getOpenId - 判断cookies和userInfoArr是否存在 - 存在 - 注册登录成功 - 进入home页面(我要反映) / 已注册 - getCode -uni.login(获取code) - getOpenId - 判断cookies和userInfoArr是否存在
4. getOpenId - 判断cookies和userInfoArr是否存在 - 不存在 - userLogin接口 - 1001(未注册) - login页面 - userLoginH5接口 - 1001(未注册) - 去注册页面 / 已注册 - 进入home页面(我要反映)
5. getOpenId - 判断cookies和userInfoArr是否存在 - 不存在 - userLogin接口 - 已注册 - 进入home页面(我要反映)
6. 注册页面 - 输入姓名,身份证号 - 根据code 和 open-type 以及 接口 getPhoneNumber 获取手机号 - 注册接口 - 注册成功

### 小程序收集用户手机号违规
1. 未进入小程序浏览页面 - 用户手机号收集违规
2. 登录手机号收集违规
3. 解决方案：
 + 输入手机号是h5登录页面，小程序已注册可通过获取微信code登录
 + 小程序未注册仍然通过注册页面
 + 未登录用户任然可以访问首页无权限信息
