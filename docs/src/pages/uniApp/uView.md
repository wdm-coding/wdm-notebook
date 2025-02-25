# uView框架

## 1.文件上传u-upload
```js
// template
<u-upload
  :fileList="fileList"
  :multiple="true"
  :maxCount="10"
  accept="media"
  width="180"
  height="180"
  @afterRead="afterRead"
  @delete="deletePic"
  >
  <view class="upload_style">
    <image
      src="/static/image/common/upload-icon.svg"
      style="width: 60rpx; height: 60rpx"
    />
    <view style="color: #333; font-size: 24rpx">上传照片/视频</view>
  </view>
</u-upload>

// script
// 1.新增图片
afterRead(event) {
  const { file } = event
  let lists = [].concat(file)
  let fileListLen = this.fileList.length
  lists.map(item => {
    this.fileList.push({
      ...item,
      status: 'uploading',
      message: '上传中',
    })
  })
  lists.forEach(async item => {
    // 上传图片到服务器
    const { code, data } = await uploadPromise(item.url)
    if (code === 0 && data) {
      const { filePath, fileName } = data
      let target = this.fileList[fileListLen]
      this.fileList.splice(fileListLen, 1, {
        ...target,
        status: 'success',
        data,
      })
      // 更新上传的图片列表
      this.updatePhoto(this.fileList)
      fileListLen++
    }
  })
},
// 2.删除上传
deletePic(event) {
  const { index } = event
  this.fileList.splice(index, 1)
  this.updatePhoto(this.fileList)
},
// 3.更新上传
updatePhoto(list) {
  // 获取上传的图片列表
  const files = files.map(item => item.data)
},

```