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

## 地推app 新增页面
1. 监管端-系统管理-项目用户查询(搜索条件一个 + 虚拟滚动列表 + 分页 + 修改手机号)
2. 监管端-系统管理-监管用户管理(搜索条件四个 + 虚拟滚动列表 + 分页 + 修改手机号)
3. 地推端-修改银行卡状态(搜索条件一个 + 虚拟滚动列表 + 分页 + 修改银行卡状态一个字段)
5. 地推端-修改人员姓名(搜索条件两个 + 虚拟滚动列表 + 分页 + 修改字端15个 + 批量修改)
4. 地推端-工资单状态小助手(搜索条件两个 + 虚拟滚动列表 + 分页 + 完结/作废功能 + 详情页)
7. 地推端-修改工资所属年月(搜索条件两个 + 虚拟滚动列表 + 分页 + 详情页 + 修改工资所属年月)，操作记录不做
6. 监管端-实名制监控-人员实名信息查询(搜索条件四个 + 虚拟滚动列表 + 分页 + 履历信息详情)，其他详情tab不做
8. 地推端-修改银行卡信息(搜索条件一个 + 虚拟滚动列表 + 分页 + 修改银行卡信息三个字段 + 详情页)，修改记录不做