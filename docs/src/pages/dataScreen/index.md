# 数据大屏可视化开发

## 全局自适应方案

### 方案一

::: tip
页面单位使用px，通过 css3：scale 缩放方案，屏幕改变时缩放内容。项目的基准尺寸是 1920px*1080px，所以支持同比例屏幕 100% 填充，如果非同比例则会自动计算比例居中填充，不足的部分则留白。
:::

```js
// script.js
window.addEventListener('resize', function() {
    const container = document.querySelector('.container');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const baseWidth = 1920;
    const baseHeight = 1080;

    // 计算缩放比例
    let scaleWidth = viewportWidth / baseWidth;
    let scaleHeight = viewportHeight / baseHeight;
    let scale = Math.min(scaleWidth, scaleHeight); // 取较小的缩放比例

    // 应用缩放比例
    container.style.transform = `scale(${scale})`;

    // 调整容器大小以适应缩放后的内容
    container.style.width = `${baseWidth * scale}px`;
    container.style.height = `${baseHeight * scale}px`;
});

// 初始化时也调用一次以处理首次加载
window.dispatchEvent(new Event('resize'));

/* styles.css */
body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    overflow: hidden; /* 防止滚动条出现 */
}

.container {
    width: 1920px;
    height: 1080px;
    position: relative; /* 改为相对定位，因为父容器已经负责居中 */
    transform-origin: center center; /* 缩放中心改为容器中心 */
    transform: scale(1); /* 初始缩放比例为1 */
}
```
### 方案二

::: tip
页面宽度单位使用vw，高度使用vh。可适应任何屏幕尺寸。但屏幕比例与设计图差别较大时会过度拉伸变形。
:::

## chart 图表文字大小自适应

```js
const fontSizeComp = (val, initWidth = 1920) => {
	const nowClientWidth = document.documentElement.clientWidth
	return val * (nowClientWidth / initWidth)
}
```