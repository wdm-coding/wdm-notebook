# AJAX

# 手写一个简易版的 AJAX 函数

```js
function simpleAJAX(url, method = 'GET', data = null, callback) {
    // 1.创建一个XMLHttpRequest对象
    var xhr = new XMLHttpRequest();
    // 2.初始化请求
    xhr.open(method, url, true);
    // 3.设置请求头（如果需要发送JSON数据，则设置Content-Type为application/json）
    if (method === 'POST' && data) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    }
    // 4.定义请求完成时的回调函数
    xhr.onreadystatechange = function () {
        // xhr.readyState 0 未初始化。还没有调用open()方法
        // xhr.readyState 1 已打开。已经调用open()方法，但还没有发送请求
        // xhr.readyState 2 正在发送数据。已经调用send()方法，但尚未接收到响应
        // xhr.readyState 3 数据接收中。已接收到部分数据，但没有完成数据的接收（例如，在HTTP状态码为100的情况下）
        // xhr.readyState 4 完成。已完成数据的接收，并且连接已经被关闭。
        // xhr.status 200 成功。请求已成功完成，并且响应已经就绪
        // xhr.status 404 未找到。请求的资源不存在
        // xhr.status 403 禁止。服务器理解请求客户端的请求，但是拒绝执行此请求
        // xhr.status 500 服务器内部错误。服务器遇到了一个意外的情况，阻止了它完成请求
        // xhr.status 301 永久移动。请求的资源已被永久地移到了由Location头指定的URI
        // xhr.status 302 临时移动。请求的资源已被暂时地移到了由Location头指定的URI
        // xhr.status 304 未修改。请求的资源未被修改，因此没有响应体
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 请求成功，解析并返回响应数据
            var response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                response = xhr.responseText; // 如果不是JSON格式，则直接返回文本
            }
            callback(null, response);
        } else {
            // 请求失败，返回错误信息
            callback(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
        }
    };
    // 5.定义请求出错时的回调函数
    xhr.onerror = function () {
        callback(new Error('Network Error'));
    };
    // 6.发送请求（如果是POST请求，则发送JSON字符串）
    var sendData = data ? JSON.stringify(data) : null;
    xhr.send(sendData);
}
// 使用示例
simpleAJAX('https://api.example.com/data', 'GET', null, function (error, data) {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
});
```

# 同源策略
    同源策略是一种浏览器安全措施，用于限制一个域下的文档或脚本如何与另一个来源的资源进行交互。它主要用来防止恶意网站读取敏感数据或者执行恶意操作。
    同源策略要求两个页面必须具有相同的协议（protocol）、域名（domain）和端口号（port），才能相互访问对方的资源。例如，http://www.example.com 和 https://www.example.com 是不同源的，因为它们的协议不同；而 http://www.example.com:8080 与 http://www.example.com 也是不同源的，因为它们的端口号不同。
1. **JSONP**：通过动态创建`<script>`标签来加载其他域上的JavaScript文件，从而实现跨域请求。这种方法只支持GET请求，并且有一定的安全隐患。服务器端返回一个函数调用的字符串，例如`callbackFunction({data: 'some data'})`。客户端需要预先定义这个回调函数，然后动态加载包含该函数的脚本文件。这种方式依赖于浏览器对`<script>`标签的加载不受同源策略限制的特性。

2. **CORS (Cross-Origin Resource Sharing)**：服务器端设置允许特定域名的前端应用发起跨域请求。这需要在服务器的响应头中添加特定的字段，如`Access-Control-Allow-Origin`。
3. **代理服务器**：在客户端和服务端之间搭建一个中间层，由这个中间层转发请求并返回结果。这种方式可以绕过浏览器的同源策略限制，但会增加网络延迟和服务器负载。
4. **加载图片，css,js等资源不受同源策略限制**。

    