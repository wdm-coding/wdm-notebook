
<script setup>
import { ref, computed, onMounted, watchEffect,nextTick } from 'vue'
const estimateHeight = 50 // 预估高度，用于初次渲染时计算总高度
const bufferSize = 5 // 缓冲区域大小，用于提前加载数据
const list = ref([]) // 原始数据
const containerRef = ref(null) // 容器引用
const positions = ref([]) // 位置数组，用于快速查找元素的位置信息
const visibleRange = ref([0, 10]) // 可视区域范围，表示默认渲染第0到第10项（含首不含尾），后边根据滚动动态更新
const measuredHeights = ref(new Map()) // 测量高度缓存
// 初始化位置数组
const initPositions = () => {
  let top = 0
  positions.value = list.value.map(item => {
    const height = measuredHeights.value.get(item.id) || estimateHeight
    const pos = {
      id: item.id,
      top,
      bottom: top + height,
      height
    }
    top = pos.bottom // 更新顶部位置，为下一个元素做准备
    return pos
  })
}
// 总高度计算 = 最后一个元素底部位置
const totalHeight = computed(() => positions.value[positions.value.length - 1]?.bottom || 0)

// 可视项数据
const visibleItems = computed(() => 
  list.value.slice(
    Math.max(0, visibleRange.value[0] - bufferSize), // 开始索引的缓冲区确保不越界
    Math.min(list.value.length, visibleRange.value[1] + bufferSize) // 结束索引的缓冲区确保不越界
  )
)
// 二分查找起始索引，找到第一个出现在可视区域内的元素索引
/// 根据scrollTop，找到第一个满足 pos.bottom >= scrollTop 的索引，即第一个出现在可视区域内的元素索引
const findStartIndex = (scrollTop) => {
  let start = 0
  let end = positions.value.length - 1
  while (start <= end) {
    const mid = Math.floor((start + end) / 2) // 取中间索引
    // 如果中间元素的底部位置小于scrollTop，则说明该元素在可视区域外上方，需要向右查找
    if (positions.value[mid].bottom < scrollTop) {
      start = mid + 1 // 向右查找
    } else {
      end = mid - 1 // 向左查找，但不排除mid本身（因为mid位置的元素可能在可视区域内）
    }
  }
  return start
}
// 计算结束索引（找到第一个‌完全超出可视区域底部‌的元素索引）
const findEndIndex = (start,visibleBottom) => {
  let end = start // 从起始索引开始，向右查找第一个完全超出可视区域底部的元素索引
  while (
    end < positions.value.length && // 确保结束索引永远不会超出数组长度
    positions.value[end].top < visibleBottom // 确保元素顶部位置在可视区域底部之上，即完全未超出可视区域底部
  ) {
    end++ // 索引+1，直到找到第一个完全超出可视区域底部的元素索引
  }
  return end
}


// 高度测量与更新
const updateHeights = () => {
  if (!containerRef.value) return
  const nodes = containerRef.value.querySelectorAll('[data-id]')
  let dirty = false
  const newPositions = [...positions.value]
  nodes.forEach(node => {
    const id = node.dataset.id
    const rect = node.getBoundingClientRect()
    if (measuredHeights.value.get(id) !== rect.height) {
      measuredHeights.value.set(id, rect.height)
      dirty = true
    }
  })
  if (dirty) {
    // 重新计算位置
    let top = 0
    newPositions.forEach(pos => {
      pos.height = measuredHeights.value.get(pos.id) || estimateHeight
      pos.top = top
      pos.bottom = top + pos.height
      top = pos.bottom
    })
    positions.value = newPositions
  }
}
// 滚动处理
const handleScroll = () => {
  if (!containerRef.value) return
  updateHeights()
  const scrollTop = containerRef.value.scrollTop // 滚动距离
  const clientHeight = containerRef.value.clientHeight // 容器高度(600px)
  // 查找起始索引
  const rangeStart = findStartIndex(scrollTop)
  // 计算结束索引（找到第一个‌完全超出可视区域底部‌的元素索引）
  let visibleBottom = scrollTop + clientHeight // 可视区域底部位置
  const rangeEnd = findEndIndex(rangeStart,visibleBottom)
  // 更新可视范围
  visibleRange.value = [rangeStart, rangeEnd]
}

onMounted(() => {
  list.value = Array.from({ length: 60 }, (_, i) => ({
    id: `item-${i}`,
    content: `Item ${i}`,
    height: Math.floor(Math.random() * 100) + 20
  }))
  initPositions()
  nextTick(() => {
    updateHeights()
    handleScroll()
  })
})

watchEffect(() => {
  initPositions()
  handleScroll()
})
watchEffect(()=>{
  console.log('visibleRange.value',visibleRange.value)
})
</script>

<template>
  <div class="app_wrap">
    <div 
      ref="containerRef"
      class="virtual_scroll_container"
      @scroll="handleScroll"
    >
      <div class="scroll_content" :style="{ height: `${totalHeight}px` }">
        <div
          v-for="item in visibleItems"
          :key="item.id"
          :data-id="item.id"
          class="list_item"
          :style="{
            position: 'absolute',
            top: `${positions.find(p => p.id === item.id)?.top || 0}px`,
            width: '100%',
            height: `${item.height}px`
          }"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app_wrap{
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .virtual_scroll_container {
    width: 500px;
    height: 600px;
    overflow-y: auto;
    position: relative;
    background-color: #fff000;
    top: 100px;
    .scroll_content {
      position: relative;
      background-color: #08f05d;
    }
    .list_item {
      border-bottom: 1px solid #fff000;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
