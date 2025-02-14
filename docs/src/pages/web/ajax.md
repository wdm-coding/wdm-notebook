# AJAX

1. 手写一个简易版的 AJAX 函数

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