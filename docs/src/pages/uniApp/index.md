# uni-app

## 监听滚动控制导航栏变色
1. 自定义导航栏
2. 页面背景设置渐变色，渐变色起始颜色要和导航栏背景色一致
```css
/* 通过多图层实现背景部分渐变 */
.page-bg {
  width: 750rpx;
  height: auto;
  background-image: 
  /* 前一段渐变色 */
  linear-gradient(180deg, #1B56E7 0%, #5093F1 32%, #C4D9FE 62%, #F8F8F8 100%),
  /* 后一段纯色 */
  linear-gradient(#F8F8F8, #F8F8F8);
  /* 渐变色位置为0rpx 到 602rpx，剩余高度为纯色 */
  background-size: 100% 602rpx, 100% auto;
  /* 第一个背景图像位于顶部，第二个背景图像位于底部。 */
  background-position: top bottom;
  background-repeat: no-repeat;
}
```
3. 监听滚动事件，动态修改导航栏背景色的透明度
```html
<template>
	<view class="home_wrap">
    <!-- 导航栏吸顶 -->
		<u-sticky :bgColor="`rgba(27, 86, 231, ${alpha})`">
			<view class="top">
        自定义导航栏内容...
			</view>
		</u-sticky>
	</view>
</template>
```

```js
export default {
  data() {
    return {
      alpha: 0
    }
  },
  onPageScroll(e) {
    let alpha = e.scrollTop / 160 // 滚动160px时显示纯色
    alpha = Math.min(alpha, 1) // 防止alpha值超过1
    alpha = Math.max(alpha, 0) // 防止alpha值小于0
    this.alpha = alpha
  }
}
```