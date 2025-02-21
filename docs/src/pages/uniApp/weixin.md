---
outline: deep
---
# uni-app 开发微信小程序

## 微信手机号一键登录

### 1.获取手机号
  ```js
  <u-button
    text="手机号一键登录"
    open-type="getPhoneNumber"
    @getphonenumber="getPhoneNumber"
  />
  getPhoneNumber(e){
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      // 用户同意授权，获取手机号
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      // 将加密数据和 IV 发送到后端服务器进行解密
    } else {
      uni.showToast({
        title: '拒绝授权',
        icon: 'none'
      });
    }
  }
  ```
  ::: warning
    e.detail.errMsg === getPhoneNumber:fail no permission
    这是因为只有企业认证的小程序才可以使用这个接口
  :::
### 2.uni.login()

  uni.login() 是一个在 UniApp 或类似的前端框架中用于处理用户登录的函数。它通常用于：
  触发登录流程：当用户点击登录按钮时，调用此函数以启动登录流程。
  获取登录凭证：成功登录后，该函数可能返回用户的登录凭证（如 token、session ID 等），这些凭证通常用于后续的 API 请求以验证用户身份。
  
  ```js
  // 假设用户点击了登录按钮
  uni.login({
      provider: 'weixin', // 指定登录方式，如微信小程序
      success: function (res) {
          // 获取登录凭证
          const loginCode = res.code;
          // 将登录凭证发送到后端服务器进行验证
          uni.request({
              url: 'https://your-backend-server.com/login',
              data: {
                  code: loginCode
              },
              success: function (response) {
                  // 处理后端返回的登录结果
                  const token = response.data.token;
                  // 存储 token 或执行其他操作
              },
              fail: function (error) {
                  // 处理请求失败的情况
                  console.error('Login failed:', error);
              }
          });
      },
      fail: function (error) {
          // 处理登录失败的情况
          console.error('Login function failed:', error);
      }
  });
  ```
