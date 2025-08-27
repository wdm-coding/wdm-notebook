# 自定义UI组件的方案

## 1. Button 按钮组件

## 2. Collapse 折叠面板
###  父子组件实现(语义化更好)
1. 数据状态以及处理逻辑在父组件
2. 使用插槽实现item.通过provide和inject实现父子组件通信

### v-model 实现
1. defainModel

### 过度动画实现
1. Tansition 包裹组件
2. Tansition 钩子函数实现动画