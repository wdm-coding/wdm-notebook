# Blob：前端文件处理
简单来说，Blob就是浏览器里的二进制大对象。

## 
基于Blob的图片压缩

```js
// 压缩图片函数
async function compressImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // 计算等比例缩放
        let width = img.width
        let height = img.height
        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        // 绘制到canvas
        ctx.drawImage(img, 0, 0, width, height)
        
        // canvas转Blob
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/jpeg',
          quality
        )
      }
    }
  })
}
// 使用
const fileInput = document.getElementById('upload')
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0]
  const compressedBlob = await compressImage(file)
  
  // 现在可以上传这个压缩后的blob了
  const formData = new FormData()
  formData.append('image', compressedBlob, 'compressed.jpg')
  
  // 上传到服务器...
})
```

## 大文件分片上传
 Blob.slice() 是关键，它让我们能像切面包一样切割大文件，而且不占太多内存。
```js
class BigFileUploader {
  constructor(file, chunkSize = 1024 * 1024) { // 默认1MB一片
    this.file = file
    this.chunkSize = chunkSize
    this.totalChunks = Math.ceil(file.size / chunkSize)
    this.currentChunk = 0
  }
  
  async upload() {
    while (this.currentChunk < this.totalChunks) {
      const start = this.currentChunk * this.chunkSize
      const end = Math.min(start + this.chunkSize, this.file.size)
      
      // 关键在这里：用slice切割Blob
      const chunk = this.file.slice(start, end)
      
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('chunkIndex', this.currentChunk)
      formData.append('totalChunks', this.totalChunks)
      formData.append('fileName', this.file.name)
      
      try {
        await fetch('/api/upload-chunk', {
          method: 'POST',
          body: formData
        })
        
        this.currentChunk++
        
        // 更新进度条
        const progress = (this.currentChunk / this.totalChunks) * 100
        this.updateProgress(progress)
        
      } catch (error) {
        console.log('上传失败，但可以从当前分片续传')
        break
      }
    }
  }
}
```

## 前端生成文件并下载
  用户填了个表格，想导出Excel。
  URL.createObjectURL(blob) 是核心，它给Blob创建了一个临时地址，让浏览器可以像访问网络资源一样访问本地Blob。
```js
function downloadCSV(data, filename = 'data.csv') {
  // 准备CSV内容
  let csvContent = ''
  
  // 添加表头
  const headers = Object.keys(data[0])
  csvContent += headers.join(',') + '\n'
  
  // 添加数据行
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header]
      return `"${value}"`  // 用引号包裹，避免逗号问题
    })
    csvContent += values.join(',') + '\n'
  })
  
  // 创建Blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  
  // 创建下载链接
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.href = url
  link.download = filename
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  
  // 清理
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 100)
}
```

## Blob的高级用法

### 视频流式播放
```js
async function streamVideo(videoUrl, videoElement) {
  const response = await fetch(videoUrl)
  const reader = response.body.getReader()
  
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close()
            return
          }
          
          // 将数据块转为Blob
          const blob = new Blob([value])
          const blobUrl = URL.createObjectURL(blob)
          
          // 动态更新视频源
          videoElement.src = blobUrl
          
          controller.enqueue(value)
          push()
        })
      }
      push()
    }
  })
}
```
### 浏览器数据库存储
localStorage只能存字符串，但有了Blob，我们能存更多类型：

```js
// 在IndexedDB中存储文件
async function saveFileToDB(file) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('myFiles', 1)
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files')
      }
    }
    
    request.onsuccess = (e) => {
      const db = e.target.result
      const transaction = db.transaction(['files'], 'readwrite')
      const store = transaction.objectStore('files')
      
      store.put(file, file.name)
      resolve()
    }
    
    request.onerror = reject
  })
}
```
## 性能与安全
1. 内存管理
Blob占用内存，用完记得释放：

```js
// 创建Blob URL
const blob = new Blob(['一些大数据'])
const blobUrl = URL.createObjectURL(blob)
// 使用...
// 用完一定要释放！
URL.revokeObjectURL(blobUrl)
// 忘记revokeObjectURL是常见的内存泄漏原因。
```
::: warning 安全限制
  Blob不是“万能钥匙”，浏览器有安全策略：
  • 同源策略：Blob URL遵循同源策略
  • 大小限制：不同浏览器有不同限制
  • 类型验证：浏览器会检查MIME类型是否匹配内容
:::

## 完整示例：前端图片压缩工具

```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>程序员刘大华 | 前端图片压缩工具</title>
      <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, sans-serif; line-height: 1.6; background: #f5f7fa; padding: 20px; }
          .container { max-width: 800px; margin: 0 auto; }
          header { text-align: center; margin-bottom: 30px; }
          h1 { color: #2c3e50; margin-bottom: 10px; }
          .main-content { display: flex; flex-direction: column; gap: 20px; }
          
          .upload-area {
              border: 2px dashed #3498db; border-radius: 10px; padding: 30px;
              text-align: center; cursor: pointer; background: white;
          }
          .upload-area:hover { border-color: #2980b9; background: #f8fafc; }
          .upload-icon { font-size: 40px; color: #3498db; margin-bottom: 10px; }
          
          .controls { display: flex; flex-direction: column; gap: 15px; background: white; padding: 20px; border-radius: 10px; }
          .control-group { display: flex; flex-direction: column; gap: 5px; }
          .control-group label { font-weight: 600; color: #2c3e50; }
          input[type="range"] { width: 100%; height: 6px; }
          
          .preview-container { display: flex; flex-wrap: wrap; gap: 20px; }
          .preview-box { flex: 1; min-width: 300px; background: white; padding: 20px; border-radius: 10px; }
          .image-box { border: 1px solid #ddd; border-radius: 8px; min-height: 200px; display: flex; align-items: center; justify-content: center; }
          .image-box img { max-width: 100%; max-height: 200px; }
          .image-info { display: flex; justify-content: space-between; margin-top: 10px; }
          
          .btn-group { display: flex; gap: 10px; margin-top: 20px; }
          .btn { flex: 1; padding: 12px; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; }
          .btn-primary { background: #3498db; color: white; }
          .btn-success { background: #2ecc71; color: white; }
          .btn:disabled { background: #bdc3c7; cursor: not-allowed; }
          
          .status { padding: 10px; border-radius: 6px; text-align: center; margin-top: 10px; display: none; }
          .status.success { background: #d4edda; color: #155724; }
          .status.error { background: #f8d7da; color: #721c24; }
          
          footer { text-align: center; margin-top: 30px; color: #7f8c8d; }
      </style>
  </head>
  <body>
      <div class="container">
          <header>
              <h1>前端图片压缩工具</h1>
              <p>基于Blob的纯前端图片处理方案</p>
          </header>
          
          <div class="main-content">
              <div class="upload-area" id="dropArea">
                  <div class="upload-icon">📁</div>
                  <p>点击或拖拽上传图片</p>
                  <input type="file" id="fileInput" accept="image/*" hidden>
              </div>
              
              <div class="controls">
                  <div class="control-group">
                      <label>压缩质量: <span id="qualityValue">80%</span></label>
                      <input type="range" id="quality" min="10" max="100" value="80">
                  </div>
                  <div class="control-group">
                      <label>最大宽度: <span id="widthValue">800px</span></label>
                      <input type="range" id="maxWidth" min="200" max="2000" value="800" step="100">
                  </div>
              </div>
              
              <div class="preview-container">
                  <div class="preview-box">
                      <h3>原图</h3>
                      <div class="image-box">
                          <img id="originalPreview" style="display:none;">
                          <p id="originalPlaceholder">等待上传图片</p>
                      </div>
                      <div class="image-info">
                          <span>尺寸: <span id="originalDimensions">-</span></span>
                          <span>大小: <span id="originalSize">-</span></span>
                      </div>
                  </div>
                  <div class="preview-box">
                      <h3>压缩后</h3>
                      <div class="image-box">
                          <img id="compressedPreview" style="display:none;">
                          <p id="compressedPlaceholder">等待压缩</p>
                      </div>
                      <div class="image-info">
                          <span>尺寸: <span id="compressedDimensions">-</span></span>
                          <span>大小: <span id="compressedSize">-</span></span>
                          <span>压缩: <span id="compressionRatio">-</span></span>
                      </div>
                  </div>
              </div>
              
              <div class="btn-group">
                  <button id="compressBtn" class="btn btn-primary" disabled>开始压缩</button>
                  <button id="downloadBtn" class="btn btn-success" disabled>下载图片</button>
              </div>
              
              <div id="statusMessage" class="status"></div>
          </div>
          
          <footer>
              <p>© 2025 公众号：程序员刘大华 | 纯前端图片压缩方案</p>
          </footer>
      </div>
      
      <script>
          // DOM元素
          const fileInput = document.getElementById('fileInput');
          const dropArea = document.getElementById('dropArea');
          const compressBtn = document.getElementById('compressBtn');
          const downloadBtn = document.getElementById('downloadBtn');
          const qualitySlider = document.getElementById('quality');
          const maxWidthSlider = document.getElementById('maxWidth');
          const qualityValue = document.getElementById('qualityValue');
          const widthValue = document.getElementById('widthValue');
          const originalPreview = document.getElementById('originalPreview');
          const compressedPreview = document.getElementById('compressedPreview');
          const originalPlaceholder = document.getElementById('originalPlaceholder');
          const compressedPlaceholder = document.getElementById('compressedPlaceholder');
          const originalDimensions = document.getElementById('originalDimensions');
          const originalSize = document.getElementById('originalSize');
          const compressedDimensions = document.getElementById('compressedDimensions');
          const compressedSize = document.getElementById('compressedSize');
          const compressionRatio = document.getElementById('compressionRatio');
          const statusMessage = document.getElementById('statusMessage');
          
          // 状态变量
          let originalFile = null;
          let originalImageData = null;
          let compressedBlob = null;
          
          // 工具函数
          function formatFileSize(bytes) {
              if (!bytes) return '-';
              const units = ['B', 'KB', 'MB'];
              let size = bytes;
              let unitIndex = 0;
              while (size >= 1024 && unitIndex < units.length - 1) {
                  size /= 1024;
                  unitIndex++;
              }
              return `${size.toFixed(2)} ${units[unitIndex]}`;
          }
          
          function showStatus(message, isError = false) {
              statusMessage.textContent = message;
              statusMessage.className = `status ${isError ? 'error' : 'success'}`;
              statusMessage.style.display = 'block';
              setTimeout(() => { statusMessage.style.display = 'none'; }, 3000);
          }
          
          // 事件监听
          qualitySlider.addEventListener('input', () => qualityValue.textContent = `${qualitySlider.value}%`);
          maxWidthSlider.addEventListener('input', () => widthValue.textContent = `${maxWidthSlider.value}px`);
          
          dropArea.addEventListener('click', () => fileInput.click());
          dropArea.addEventListener('dragover', (e) => e.preventDefault());
          dropArea.addEventListener('drop', (e) => {
              e.preventDefault();
              if (e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files[0]);
          });
          fileInput.addEventListener('change', (e) => {
              if (e.target.files.length) handleFileSelect(e.target.files[0]);
          });
          
          // 处理文件选择
          function handleFileSelect(file) {
              if (!file.type.startsWith('image/')) {
                  showStatus('请选择图片文件！', true);
                  return;
              }
              
              originalFile = file;
              const reader = new FileReader();
              
              reader.onload = (e) => {
                  // 显示原图
                  originalPreview.src = e.target.result;
                  originalPreview.style.display = 'block';
                  originalPlaceholder.style.display = 'none';
                  originalSize.textContent = formatFileSize(file.size);
                  
                  // 获取图片尺寸
                  const img = new Image();
                  img.onload = () => {
                      originalDimensions.textContent = `${img.width} × ${img.height}`;
                      originalImageData = { width: img.width, height: img.height, size: file.size };
                  };
                  img.src = e.target.result;
              };
              reader.readAsDataURL(file);
              
              compressBtn.disabled = false;
              showStatus('图片已加载，可以开始压缩');
          }
          
          // 图片压缩函数
          function compressImage(file, quality, maxWidth) {
              return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  
                  reader.onload = (e) => {
                      const img = new Image();
                      img.src = e.target.result;
                      
                      img.onload = () => {
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          
                          // 计算缩放比例
                          let width = img.width;
                          let height = img.height;
                          if (width > maxWidth) {
                              height = (maxWidth / width) * height;
                              width = maxWidth;
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          ctx.drawImage(img, 0, 0, width, height);
                          
                          // Canvas转Blob
                          canvas.toBlob(
                              (blob) => resolve({ blob, width, height }),
                              'image/jpeg',
                              quality / 100
                          );
                      };
                  };
              });
          }
          
          // 压缩按钮事件
          compressBtn.addEventListener('click', async () => {
              if (!originalFile) return;
              
              compressBtn.disabled = true;
              compressBtn.textContent = '压缩中...';
              
              try {
                  const quality = parseInt(qualitySlider.value);
                  const maxWidth = parseInt(maxWidthSlider.value);
                  
                  const result = await compressImage(originalFile, quality, maxWidth);
                  compressedBlob = result.blob;
                  
                  // 显示压缩图片
                  compressedPreview.src = URL.createObjectURL(compressedBlob);
                  compressedPreview.style.display = 'block';
                  compressedPlaceholder.style.display = 'none';
                  compressedDimensions.textContent = `${result.width} × ${result.height}`;
                  compressedSize.textContent = formatFileSize(compressedBlob.size);
                  
                  const ratio = ((originalImageData.size - compressedBlob.size) / originalImageData.size * 100).toFixed(1);
                  compressionRatio.textContent = `${ratio}%`;
                  
                  downloadBtn.disabled = false;
                  showStatus(`压缩完成！节省了 ${ratio}% 空间`);
              } catch (error) {
                  showStatus('压缩失败，请重试', true);
              } finally {
                  compressBtn.disabled = false;
                  compressBtn.textContent = '开始压缩';
              }
          });
          
          // 下载按钮事件
          downloadBtn.addEventListener('click', () => {
              if (!compressedBlob) return;
              
              const url = URL.createObjectURL(compressedBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `compressed-${originalFile.name.replace(/\.[^/.]+$/, "")}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              setTimeout(() => URL.revokeObjectURL(url), 100);
              showStatus('开始下载压缩图片');
          });
          
          // 初始化
          document.addEventListener('DOMContentLoaded', () => {
              showStatus('上传图片开始压缩');
          });
      </script>
  </body>
  </html>
```
### 源码主要功能讲解
1. 用户上传图片 → 立即预览
```js
// 关键代码：File转Blob进行预览
reader.onload = (e) => {
  // 这里实际上创建了一个Data URL，也可以直接用Blob URL
  originalPreview.src = e.target.result;
  // 或者用Blob的方式：
  // const blob = new Blob([e.target.result], {type: file.type});
  // originalPreview.src = URL.createObjectURL(blob);
};
// 实现原理：

// • 用户选择文件 → FileReader 读取 → 转成 Data URL → 直接显示
// • 整个过程不需要后端服务器，完全在浏览器中完成
```
2. Canvas压缩图片 → 生成压缩后的Blob
```js
function compressImage(file, quality, maxWidth) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // 1. 读取原图
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 2. 计算缩放后的尺寸
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // 3. 关键：Canvas转Blob
        canvas.toBlob(
          (blob) => resolve({ blob, width, height }), // 返回压缩后的Blob
          'image/jpeg', // 指定输出格式
          quality / 100  // 压缩质量
        );
      };
    };
  });
}
// 为什么用Canvas + toBlob？

// • canvas.toBlob() 是性能最好的压缩方式
// • 可以控制输出格式和质量
// • 生成的是标准的 Blob 对象，可以直接使用
```

3. 压缩后的Blob → 下载到本地
```js
downloadBtn.addEventListener('click', () => {
  if (!compressedBlob) return;
  
  // 1. 创建Blob URL
  const url = URL.createObjectURL(compressedBlob);
  
  // 2. 创建下载链接
  const link = document.createElement('a');
  link.href = url;
  link.download = `compressed-${originalFile.name.replace(/\.[^/.]+$/, "")}.jpg`;
  
  // 3. 触发下载
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 4. 重要：释放内存
  setTimeout(() => URL.revokeObjectURL(url), 100);
});
```
4. 内存管理
```js
// 每次生成 URL.createObjectURL() 后，记得要 URL.revokeObjectURL()，否则会内存泄漏。

// 正确做法
const url = URL.createObjectURL(blob);
// 使用url...
URL.revokeObjectURL(url);

// 或者在使用完成后清理
img.onload = function() {
  URL.revokeObjectURL(this.src);
};
```
5. 大图片处理
对于超大图片（比如超过10MB），可以考虑
```js
// 分块处理大图片
function processLargeImage(file) {
  const chunkSize = 1024 * 1024; // 每次处理1MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  
  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
    // 处理每个分块...
  }
}
```
6. 压缩参数建议
• 质量：80% 是最佳平衡点，文件小且质量损失不明显
• 最大宽度：800px 适合网页展示，1920px 适合高清需求

### 可扩展的功能
1. 支持更多图片格式
```js
// 根据原图格式选择输出格式
function getOutputFormat(originalType) {
  if (originalType === 'image/png') return 'image/png';
  if (originalType === 'image/webp') return 'image/webp';
  return 'image/jpeg'; // 默认
}
```
2. 批量压缩
```js
// 处理多个文件
async function batchCompress(files) {
  const compressedBlobs = [];
  
  for (const file of files) {
    const compressed = await compressImage(file, 80, 800);
    compressedBlobs.push(compressed.blob);
  }
  
  return compressedBlobs;
}
```
3. 添加到云存储
```js
// 压缩后直接上传到云存储
async function compressAndUpload(file) {
  const compressed = await compressImage(file, 80, 800);
  
  const formData = new FormData();
  formData.append('file', compressed.blob, `compressed_${file.name}`);
  
  await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}
```

## 总结

### 应用场景
1. 用户头像上传：先压缩再上传，节省服务器带宽
2. 内容管理系统：编辑文章时压缩配图
3. 移动端拍照上传：手机拍的照片通常很大，前端压缩后再传
4. 图床工具：压缩后上传到图床，提高加载速度

### 注意事项
1. 兼容性：canvas.toBlob() 在 IE 中需要 polyfill
2. EXIF信息：压缩后会丢失图片的 EXIF 信息（拍摄信息）
3. 透明背景：转成 JPEG 会丢失透明信息，PNG 则保留
4. 性能监控：大图片压缩时添加 loading 状态