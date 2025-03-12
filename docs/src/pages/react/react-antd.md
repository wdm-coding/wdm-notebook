# Ant Design UI 组件库

[官网文档](https://ant-design.antgroup.com/index-cn)

## react安装antd
  1. npm install antd --save

## 1.form表单

::: warning 取消浏览器默认填充账号密码
  1. autoComplete="off"
  2. autoComplete="new-password"
  ```js
  <Form autoComplete="off">
    <Form.Item label="手机号" name="phone">
      <Input autoComplete="off"/>
    </Form.Item>
    <Form.Item label="密码" name="password">
			<Input.Password autoComplete="new-password"/>
		</Form.Item>
    <Form.Item label=" " colon={false}>
      <Button type="primary" htmlType="submit">
          登录
      </Button>
    </Form.Item>
  </Form>
  ```
:::

## 2.message全局提示

  + 必须在useEffect()中调用
```js
  useEffect(()=>{
      if(loginSucesss) {
          message.success('登录成功');
          setLoginSucesss(false)
      }
  },[loginSucesss])
```