# Echarts 图表

## 二维地图绘制
  1. 下载地图json数据 
    [点击下载](https://datav.aliyun.com/portal/school/atlas/area_selector?spm=a2crr.23498931.0.0.315315ddRqZtR3) 
  2. 注册地图数据

		echarts.registerMap('gansu', gsJson)

  3. 配置option的geo属性
```js
import * as echarts from 'echarts'
import gsJson from '@/assets/json/gs.json'
const option = {
  geo: [
        {
          map: 'gansu', // 地图名称，要和注册的地图名称一致
          aspectScale: 1,// 宽高比，默认为1（正方形）
          roam: false, // 是否允许缩放
          zoom: 1.3, // 显示级别
          layoutSize: '100%', // 布局大小，默认为100%
          layoutCenter: ['50.1%', '47%'], // 布局中心
          itemStyle: { // 普通状态样式配置
            areaColor: 'transparent', // 地图区域颜色
            borderColor: '#000',
            borderWidth: 1
          },
          emphasis: { // 高亮状态样式配置
            itemStyle: {
              areaColor: 'transparent',
              borderColor: '#fff000',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(255, 255, 255, 0.8)'
            },
            label: { // 文字标签样式配置
              show: false
            }
          },
          z: 1
        }
		]
}

const initChart = () => {
  // 注册地图数据
		echarts.registerMap('gansu', gsJson)
  // 初始化地图实例
    myChart.value = echarts.init(gsMapDom)
  // 初始化地图配置，生成地图
		myChart.value.setOption(option, { notMerge: false })
  // 高亮区域
  myChart.value.dispatchAction({
    type: 'highlight',
    geoIndex: 0,
    name: '需要高亮的区域名称'
  })
  // 取消高亮区域
  myChart.value.dispatchAction({
    type: 'downplay',
    geoIndex: 0,
    name: '需要取消高亮的区域名称'
  })
}

// 监听屏幕尺寸变化，重新初始化地图
const resizeHandler = () => {
  myChart.value?.resize()
  nextTick(() => {
    myChart.value?.setOption({}, true)
    myChart.value?.setOption(option)
  })
}
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeHandler)
})
// 销毁图表实例
onUnmounted(() => {
  myChart.value?.dispose()
  window.removeEventListener('resize', resizeHandler)
})
```
::: warning 注意
  + notMerge 参数的作用
  
  当 notMerge 为 true 时，setOption 方法会完全替换当前的配置项，而不是合并新旧配置项。这意味着所有之前的设置都会被新的配置项覆盖。

  当 notMerge 为 false（或省略此参数，因为 false 是默认值）时，setOption 方法会尝试将新的配置项与当前的配置项进行合并。这意味着只有在新配置项中明确指定的部分才会被更新，而其他未指定的部分则保持不变。
:::

### 通过二维地图实现3D效果

  1. 具有3D效果的设计图。
  2. 绘制exharts二维地图, 并设置地图为透明。
  3. 覆盖在3D效果图上。
  4. 根据屏幕分辨率动态调整容器大小，实现自适应。
  5. 调整设计图background-size属性与echarts的layoutCenter属性，对齐边缘。

```js
// 1.template
  // 最外层容器：map_container
  <div class="map_container"> 
  {/* 3D效果的设计图: 3d_map_bg */}
    <div class="3d_map_bg" />
  {/* echarts地图容器： map*/}
    <div ref="mapRef" class="map" />
  </div>
// 2.样式
.map_container{
  width: 624px;
	height: 470px;
	position: absolute;
  .map{
    width: 100%;
    height: 100%;
    background: url('@/assets/images/dataBoard/cockpit/map.gif') no-repeat center;
    background-size: 97% 88%;
  }
	.3d_map_bg{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
}
// 3.同比例缩放echarts地图容器
const mapSize = () => {
	const mapDom = document.querySelector('.map_container')
	if (!mapDom) return
	const viewportWidth = window.innerWidth
	const viewportHeight = window.innerHeight
	const baseWidth = 1920
	const baseHeight = 1080
	// 计算缩放比例
	const scaleWidth = viewportWidth / baseWidth
	const scaleHeight = viewportHeight / baseHeight
	const scale = Math.min(scaleWidth, scaleHeight) // 取较小的缩放比例
	// 调整容器大小以适应缩放后的内容
	mapDom.style.width = `${624 * scale}px`
	mapDom.style.height = `${470 * scale}px`
}
```

### 地图配置标记图片
  option > series > scatter > symbol: `image://${图片路径}`

```js
series: [
  {
    type: 'scatter',
    coordinateSystem: 'geo',
    data: [],
    symbol: `image://${new URL(`@/assets/images/dataBoard/cockpit/pointIcon.gif`, import.meta.url).href}`,
    symbolSize: fontSizeComp(30),
    symbolOffset: [0, -30],
    label: {
      show: false
    }
  },
  {
    type: 'scatter',
    coordinateSystem: 'geo',
    data: [],
    symbol: `image://${new URL(`@/assets/images/avator.jpeg`, import.meta.url).href}`,
    symbolSize: fontSizeComp(15),
    label: {
      position: 'top',
      show: true,
      formatter: params => params.name,
      color: '#fff',
      fontWeight: 'bold',
      fontSize: fontSizeComp(12)
    }
  }
]
```