<script setup>
  import { ref, computed,onMounted } from 'vue'
  const itemSize = 46 // 单项高度
  const list = ref(Array.from({ length: 80 }, (_, i) => i)) // 模拟数据池
  const totalHeight = computed(() => list.value.length * itemSize) // 计算列表总高度
  const listContainer = ref(null) // 可视区容器引用
  const visibleCount = computed(() => Math.ceil(listContainer.value?.clientHeight / itemSize)) // 计算可视区域的项目数量（向上取整）
  const startIndex = ref(0)
  const endIndex = ref(0)
  // slice 用于提取数组的一部分，并返回一个新的数组对象，而不会修改原数组。
  const visibleData = computed(() => list.value.slice(startIndex.value, endIndex.value)) // 计算可视区域的数据
  const offset = ref(0)
  const scrollTop = ref(0)
  const buffer = 5 // 设置缓冲区域，防止滚动过快导致数据不足
  const handleScroll = () => {
    scrollTop.value = listContainer.value.scrollTop // 获取滚动条的垂直位置
    checkIfReachBottom()
    const start = Math.floor(scrollTop.value / itemSize) // 计算起始索引（滚动条位置除以单项高度向下取整）
    startIndex.value =  Math.max(0, start - buffer); // 计算起始索引（计算有几个子项已经从上边界出去）
    endIndex.value = Math.min(list.value.length,start + visibleCount.value + buffer) // 计算结束索引（起始索引 + 可视区可显示数量 + 缓冲区域）
    offset.value = startIndex.value * itemSize; // 计算偏移量（起始索引乘以单项高度）
  }
  const ticking = ref(false)
  const throttledScroll = ()=>{
    if (!ticking.value) {
      // requestAnimationFrame 会在浏览器重绘之前调用指定的函数，用于优化动画性能。
      requestAnimationFrame(() => {
        handleScroll();
        ticking.value = false;
      });
    }
    ticking.value = true;
  }
  const threshold = 1; // 触发加载的阈值（如提前1px触发加载）
  const checkIfReachBottom = () => {
    if (scrollTop.value + listContainer.value.clientHeight >= totalHeight.value - threshold) {
      console.log('已到达底部');
      list.value = list.value.concat(Array.from({ length: 20 }, (_, i) => list.value.length + i)); // 追加数据
    }
  }
  onMounted(() => {
    endIndex.value =  startIndex.value + visibleCount.value + buffer // 初始化结束索引（起始索引 + 可视区可显示数量 + 缓冲区域）
  })
</script>

<template>
  <div class="app_wrap">
    <!-- 可视区 溢出滚动-->
    <div class="virtual_list" ref="listContainer" @scroll="throttledScroll">
      <!-- 虚拟容器 list 数据的高度 模拟滚动条-->
      <div class="list_phantom" :style="{ height: totalHeight + 'px' }" />
      <!-- 可视区 + 前后缓冲区域 -->
      <div class="list_content" :style="{ transform: `translateY(${offset}px)` }">
        <div 
          v-for="(item,index) in visibleData" 
          :key="item"
          class="list_item"
          :style="{ height: itemSize + 'px' }"
        >
          {{`index-${index}`}}--------------{{ `item-${item}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app_wrap{
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .virtual_list{
    width: 500px;
    height: 600px;
    overflow-y: auto;
    position: relative;
    top: 20px;
    .list_phantom{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
      background-color: #5b03d7;
    }
    .list_content{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      background-color: #25f804;
      .list_item{
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>