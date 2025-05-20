# 虚拟组件 + 分页数据

## 1. 固定单项高度的虚拟滚动列表实现思路：
1. 固定可视区高度：viewportHeight。
2. 计算滚动总高度：`totalHeight = itemCount * itemHeight`。
3. 监听滚动事件，获取scrollTop的值。
4. 计算可视区项数：`visibleCount = Math.ceil(viewportHeight  / itemHeight)`。
5. 计算可视区起始索引：`startIndex = Math.floor(scrollTop / itemHeight)`。
6. 计算可视区结束索引：`endIndex = startIndex + visibleCount`。
7. 计算可视区域偏移量：`offset = startIndex * itemHeight`。

## 2. 滚动列表触底加载的实现思路：
1. 触底条件：`scrollTop + clientHeight ≥ scrollHeight - threshold`
2. scrollTop 是滚动条在Y轴上的滚动距离。
3. clientHeight 是可视区的高度。
4. scrollHeight 容器总高度（由虚拟列表占位元素模拟）。
5. threshold 触发加载的阈值（如 50px，提前加载）。

<VirtualList/>

<script setup>
  import VirtualList from './virtual-list.vue'
</script>

## 3. 动态单项高度的虚拟滚动列表实现思路：
