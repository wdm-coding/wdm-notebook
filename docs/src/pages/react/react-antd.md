# Ant Design UI 组件库

[官网文档](https://ant-design.antgroup.com/index-cn)

## react安装antd
  npm install antd --save
## react项目初始化样式
  第三方库样式重置Normalize.css
  npm install normalize.css
  import 'normalize.css'
  
  + 在scss文件中全局引入normalize
  @import '~normalize.css';

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

## loading组件封装

### 方案一、`spin`组件
1. 在`utils`目录下创建`loading/index.js`
2. 封装loading组件的展示和隐藏
```tsx
import ReactDOM from 'react-dom/client'
import Loading from './loading'
let count = 0
export const showLoading = () => {
	if (count === 0) {
		const spinWrapDiv = document.createElement('div')
		spinWrapDiv.setAttribute('id', 'root-loading')
		document.body.appendChild(spinWrapDiv)
		ReactDOM.createRoot(spinWrapDiv).render(<Loading />)
	}
	count++
}

export const hideLoading = () => {
	if (count < 0) return
	count--
	if (count === 0) {
		const spinWrapDiv = document.getElementById('root-loading') as HTMLDivElement
		document.body.removeChild(spinWrapDiv)
	}
}
```
3. 在`loading/loading.tsx`中创建组件
```tsx
import { Spin } from 'antd'
import './loading.scss'
function Loading({ tip = 'loading' }: { tip?: string }) {
	return <Spin size="large" tip={tip} wrapperClassName="requiest-loading" fullscreen={true} />
}

export default Loading
```
4. 在`loading/loading.scss`中创建样式
```scss
#root-loading{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 方案二、自定义全局loading
1. 在index.html中添加loading的div
```html
<div id="root-loading" style="display: none;">
  <div class="loading-container">
    <div class="loading-icon"></div>
  </div>
</div>
```
2. 增加动画样式
```css
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```
3. 封装loading组件的展示和隐藏
```ts
let count = 0
export const showLoading = () => {
  if (count === 0) {
    const loadingDiv = document.getElementById('root-loading') as HTMLDivElement
    loadingDiv.style.setProperty('display', 'flex')
  }
  count++
}
export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) {
    const loadingDiv = document.getElementById('root-loading') as HTMLDivElement
    loadingDiv.style.setProperty('display', 'none')
  }
}
```