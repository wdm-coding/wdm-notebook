# 自定义UI组件的方案

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
2. 根节点不继承第三方库属性（inheritAttrs:false）
3. 扩展第三方图标库的types