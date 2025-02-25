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

## 微信预览媒体文件
wx.previewMedia 用于预览图片、视频等媒体文件。
参数 sources 是一个对象数组，每个对象包含 url 和 type。type 可以是 image、video
```js
wx.previewMedia({
  sources:[{
    url:'',//图片或视频的地址
    type:'',//['image', 'video']
    poster:'',//视频封面图，仅type为video时有效
  }],
  current:0,//默认展示的索引
  showmenu:true,//是否显示右上角菜单
  success:function(res){ //预览成功回调函数
    console.log('预览成功')
  },
  fail:function(err){ //预览失败回调函数
    console.error('预览失败', err)
  },
  complete:function(res){ //预览完成回调函数
    console.log('预览完成')
  }
})
```
