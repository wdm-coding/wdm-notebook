# 虚拟组件 + 分页数据
1. 虚拟滚动，只渲染可视区域内的元素。
2. 可视区元素的高度固定，通过计算可视区元素个数来确定渲染的组件数量。
3. 可视区前面追加上方缓存区，可视区后面追加下方缓存区。
4. 动态计算总数据高度，模拟滚动条。
5. 滚动事件监听计算滚动位置。
6. 每次滚动到可视区底部时，进行分页加载数据。每次追加数据到totalData数组中，并重新计算可视区需要展示的startIndex和endIndex。

```javascript
<script setup>
  import { ref, computed,onMounted } from 'vue'
  const itemSize = 36
  const list = ref(Array.from({ length: 80 }, (_, i) => i))
  const listContainer = ref(null)
  const totalHeight = computed(() => list.value.length * itemSize)
  const offset = ref(0)
  const startIndex = ref(0)
  const endIndex = ref(0)
  const visibleCount = computed(() => Math.ceil(listContainer.value?.clientHeight / itemSize)) // 计算可视区域的项目数量
  // slice 用于提取数组的一部分，并返回一个新的数组对象，而不会修改原数组。两个参数分别是起始位置和结束位置（但不包括该位置的元素），如果省略第二个参数，则提取从第一个参数开始到数组末尾的所有元素。
  const visibleData = computed(() => list.value.slice(startIndex.value, endIndex.value)) // 计算可视区域的数据
  const scrollTop = ref(0)
  const handleScroll = () => {
    scrollTop.value = listContainer.value.scrollTop // 获取滚动条的垂直位置
    startIndex.value = Math.floor(scrollTop.value / itemSize) // 计算起始索引（计算有几个子项已经从上边界出去）
    endIndex.value = startIndex.value + visibleCount.value // 计算结束索引（起始索引 + 可视区可显示数量）
    offset.value = scrollTop.value - (scrollTop.value % itemSize) // 计算偏移量（确保滚动位置与列表中的项目对齐）
  }
  onMounted(() => {
    endIndex.value = startIndex.value + visibleCount.value
  })
  
</script>

<template>
  <div class="app_wrap">
    <div class="view_data">
      <p>listContainer-height:{{ listContainer?.clientHeight }}</p>
      <p>scrollTop:{{ scrollTop }}</p>
      <p>startIndex:{{ startIndex }}</p>
      <p>endIndex:{{ endIndex }}</p>
      <p>offset:{{ offset }}</p>
      <p>{{ scrollTop % itemSize }}</p>
    </div>
    <div class="virtual_list" ref="listContainer" @scroll="handleScroll">
      <div class="list_phantom" :style="{ height: totalHeight + 'px' }"></div>
      <div class="list_content" :style="{ transform: `translateY(${offset}px)` }">
        <div 
          v-for="(item,index) in visibleData" 
          :key="item"
          class="list_item"
          :style="{ height: itemSize + 'px' }"
        >
          {{index}}-{{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app_wrap{
  position: relative;
  .view_data{
    position: absolute;
    border: 8px solid #01f2da;
    left: -250px;
  }
  .virtual_list{
    width: 500px;
    height: 600px;
    overflow-y: auto;
    position: relative;
    // border: 9px solid #fff000;
    margin-top: 100px;
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
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
```