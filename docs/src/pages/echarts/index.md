# Echarts 图表

## vue3中使用echarts

### 1. 安装echarts,echarts-gl 等

```bash
npm install echarts echarts-gl --save-dev
```
### 2. 初始化echarts实例
```js
const myChart = shallowRef(null)
```
::: warning 注意初始化echarts实例要用shallowRef而不是ref
  初始化echarts实例要用shallowRef而不是ref，因为echarts实例在初始化后就不会变了，没必要每次都重新初始化echarts实例
:::

### 3. 获取echarts容器,初始化echarts实例,并设置echarts配置

```js
  const chartRef = ref(null)
  onMounted(() => {
    myChart.value = echarts.init(chartRef.value)
    myChart.value.setOption(option)
  })
```
### 4. 监听屏幕尺寸变化，重新初始化echarts实例
```js
const resizeHandler = () => {
  myChart.value?.resize() // 重新初始化echarts实例
  nextTick(() => {
    myChart.value?.setOption({}, true)
    myChart.value?.setOption(option)
  })
}
onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})
```
### 5. 销毁echarts实例,移除监听事件
```js
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  myChart.value?.dispose() // 销毁echarts实例
})
```
## setOption 方法

### 1.notMerge 参数的作用

::: warning notMerge 参数的作用
  当 notMerge 为 true 时，setOption 方法会完全替换当前的配置项，而不是合并新旧配置项。这意味着所有之前的设置都会被新的配置项覆盖。
  当 notMerge 为 false（或省略此参数，因为 false 是默认值）时，setOption 方法会尝试将新的配置项与当前的配置项进行合并。这意味着只有在新配置项中明确指定的部分才会被更新，而其他未指定的部分则保持不变。
:::

## 高亮操作

### 1. series高亮
```js
// 高亮
myChart.value.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  dataIndex: index
})
// 取消高亮
myChart.value.dispatchAction({
  type: 'downplay',
  seriesIndex: 0,
  dataIndex: index
})
```
### 2. geo地图高亮
```js
myChart.value.dispatchAction({
  type: 'highlight',
  geoIndex: 0, // geo组件的索引
  name: areaName // 地图区域名称
})
myChart.value.dispatchAction({
  type: 'downplay',
  geoIndex: 0,
  name: areaName
})
```
## 自定义提示框组件tooltip

```js
tooltip: {
  className: 'echarts-tooltip-bg',
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  formatter: function (params) {
    const { name, value, percent } = params
    const tooltipContent = `
            <div class="echarts-tooltip-bg-content">
                <div>${name}</div>
                <div style="padding-left:0.5vw">
                  <div style="margin:0.5vh 0">
                    收支总数：
                    <span style="color:#FFF600">${value}</span>
                    /个
                  </div>
                  <div>
                    占比：
                    <span style="color:#00F6FF">${percent}%</span>
                  </div>
                </div>
            </div>
        `
    return tooltipContent
  }
}
// 自定义样式
<style lang='scss'>
  ::v-deep(.echarts-tooltip-bg){
    padding: 0 !important;
    .echarts-tooltip-bg-content{
      width: 6.56vw;
      background: linear-gradient(0deg, rgba(6,47,76,0.8) 0%, rgba(7,27,52,0.6) 100%);
      border: 1px solid rgba(1, 109, 153,0.2);
      color: #fff;
      font-size: 0.63vw;
      padding: 1vh 0.5vw;
    }
  }
</style>

```