# 样式

## 文字左右对齐 
`text-align: justify;`

## 页面渐变色分段
```css
.style{
  background-image: linear-gradient(180deg, #1B56E7 0%, #5093F1 42%, #C4D9FE 62%, #F8F8F8 100%), linear-gradient(#F8F8F8, #F8F8F8);
  background-size: 100% 602rpx, 100% auto;
  background-position: top bottom;
  background-repeat: no-repeat;
}
```
## 阴影效果
```css
filter: drop-shadow(0 0 2em rgba(66, 184, 131, 0.667));
```
## will-change 属性 
明确告诉浏览器一个元素即将发生某些特定变化（比如位置移动、内容变化、滚动等）时，浏览器可以​​提前分配资源​​
```css
will-change: transform; /*让浏览器知道一个元素即将发生位置变化*/ 
will-change: opacity; /*让浏览器知道一个元素即将发生透明度变化*/
will-change: scroll-position; /*让浏览器知道一个元素即将发生滚动变化*/
will-change: contents; /*让浏览器知道一个元素即将发生内容变化*/
will-change: auto; /*让浏览器知道一个元素即将发生未知变化,即自行判断*/
```