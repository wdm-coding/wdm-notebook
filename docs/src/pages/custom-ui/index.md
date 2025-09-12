# 自定义UI组件的方案

## 组件开发的方法论
1. 更急需求初步确定组件的属性，事件，slots,expose等
2. 组件的静态结构实现(无交互，只有html,classes,slots等)
3. 根据需求枚举组件的交互功能，枚举组件的交互状态。
4. 完成组件的交互功能，交互状态的实现
5. 组件的样式，测试等


## 1. Button 按钮组件
1. 动态class 处理不同类型的按钮颜色、圆角、loading,plain等
2. 使用scss的动态处理循环的类名
3. 图标和loading的实现

## 2. Collapse 折叠面板
  ###  父子组件实现(语义化更好)
  1. 数据状态以及处理逻辑在父组件
  2. 使用插槽实现item.通过provide和inject实现父子组件通信

  ### v-model 实现
  1. defainModel

  ### 过度动画实现
  1. Tansition 包裹组件
  2. Tansition 钩子函数实现动画

## 3. Icon 图标组件
1. 封装第三方图标库
2. 根节点不继承第三方库(fontAwesome)属性（inheritAttrs:false） 
3. 扩展第三方图标库的types

## Tooltip 浮层组件
1. 触发区
  + dom元素
  + 自定义触发区
2. 展示区
  + 字符串
  + 复杂内容插槽
3. 触发方式
  + 鼠标hover
  + 鼠标点击
  + 自定义触发
4. 显示位置
  + 借助第三方库 popper.js [popper.js官网](https://popper.js.org/) [popper.js文档](https://popper.js.org/docs/v2/)
  + 安装 `npm i @popperjs/core`