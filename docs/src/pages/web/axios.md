# Axios 封装

## 创建axios实例
1. 创建axios实例，配置baseURL、超时等。
2. 定义pendingRequests作为Map，存储请求的key和对应的cancel函数。

## 请求拦截器
1. 开启全局loading。
2. 生成请求key。
3. 检查是否存在相同的key，存在则取消前一个请求，并删除旧条目。
4. 为当前请求创建新的cancelToken，并存入Map。
5. 添加认证头(Token)等信息。
6. 请求失败关闭全局loading。

## 响应拦截器：
1. 成功响应后，关闭全局loading,删除对应的key，并处理响应数据。
2. 错误处理中，关闭全局loading,删除对应的key，处理取消请求的情况，以及其他错误状态码。

```js
import axios from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
// 1.创建axios实例，配置baseURL、超时等。
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  headers: { // 设置默认请求头
		'Content-Type': 'application/json;charset=UTF-8'
	},
  timeout: 5000, // 请求超时时间
})
// 2.定义pendingRequests作为Map，存储请求的key和对应的cancel函数。
const pendingRequests = new Map()
// request拦截器
service.interceptors.request.use(config => {
  // 请求开始时开启全局loading
  if (!config.hideLoading) {
    showLoading()
  }
  // 3.生成请求key。
  const { method, url, params, data } = config;
  const key = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
  // 4.检查是否存在相同的key，存在则取消前一个请求，并删除旧条目。
  if (pendingRequests.has(key)) {
    const oldRequest = pendingRequests.get(key) // 获取旧请求的cancel函数
    oldRequest && oldRequest.cancel() // 取消旧请求
    pendingRequests.delete(key) // 删除旧请求的Map条目
  }
  // 5.为当前请求创建新的cancelToken，并存入Map。
  config.cancelToken = new axios.CancelToken(function (c) {
    pendingRequests.set(key, c); // 存储取消函数到Map中
  });
  // 6.添加认证头(Token)等信息。
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization '] = Bearer ${token}; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // 7.请求失败处理逻辑
  Message({ // 请求失败显示错误信息，可根据实际情况自行修改
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  hideLoading()// 请求失败时关闭全局loading
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  // 8.响应成功处理逻辑
  response => {
    hideLoading(); // 请求成功时关闭全局loading
    const { method, url, params, data,responseType } = response.config;
    const key = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
    // 9.删除对应的key。
    pendingRequests.delete(key);
    // 10.处理返回数据
    if(responseType === 'blob'){ // 如果是blob类型，直接返回response对象
      return response.data; // 返回数据
    }
    const res = response.data
    if (res.code !== 200) { // 根据实际情况自行修改，此处仅为示例
      Message.error(res.message || 'Error') // 请求失败显示错误信息，可根据实际情况自行修改
      return Promise.reject(new Error(res.message || 'Error')) // 返回接口返回的错误信息
    } else {
      return res.data; // 返回数据
    }
  },
  // 11.响应失败处理逻辑
  error => {
    hideLoading(); // 请求失败时关闭全局loading
    const { method, url, params, data,responseType } = error.config;
    const key = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
    // 12.删除对应的key。
    pendingRequests.delete(key);
    if (axios.isCancel(error)) { // 如果是取消请求，则不做任何处理
      return Promise.reject(new Error('Request canceled'))
    }else{
      // 13.处理其他错误状态码。
      const {status} = error.response;
      switch (status) {
        case 401: // 未授权，跳转到登录页面
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
          break;
        case 403: // 没有权限，提示错误信息
          Message.error('无权限') // 请求失败显示错误信息，可根据实际情况自行修改
          break;
        case 404: // 未找到资源，提示错误信息
          Message.error('未找到资源') // 请求失败显示错误信息，可根据实际情况自行修改
          break;
        case 500: // 服务端错误，提示错误信息
          Message.error('服务端错误') // 请求失败显示错误信息，可根据实际情况自行修改
          break;
        default:
          Message.error(error.message || 'Error') // 请求失败显示错误信息，可根据实际情况自行修改
      }
    }
    return Promise.reject(error)
  }
)

export default service

```