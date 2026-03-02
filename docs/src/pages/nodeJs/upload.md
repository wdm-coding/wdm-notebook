# 文件上传 Multer

1. 安装 npm install multer --save

2. 引入 multer 作为中间件

```js
const multer = require('multer'); // 引入 multer
const uploadMidd = multer({
  dest: 'uploads/' // 设置上传文件的存储目录
})
```

3. 使用 multer 的 `single` 方法创建一个中间件，用于处理单个文件上传
```js
router.post('/upload', uploadMidd.single('file'), uploadFile);
```

4. 定义上传文件的处理函数
```js
const fs = require('fs');
const {promisify} = require('util');
const rename = promisify(fs.rename);
const failBack = require('../utils/failBack');
async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        code: 1, 
        message: '请上传文件' 
      });
    }
    console.log('Received file:', req.file);
    const { originalname, filename, path,mimetype,size } = req.file;
    const typeArr = originalname.split('.')
    const name = filename + '.' + typeArr[typeArr.length - 1]
    await rename(path, `./uploads/${name}`)
    // 文件上传成功，返回响应
    res.status(200).json({ 
      code: 0, 
      message: '文件上传成功', 
      data: { filename:name,type:mimetype,size,originalname}
    })
  }catch (error) {
      failBack(res,error,500);
  }   
}

module.exports = {uploadFile};
```