# 二维地图

## [地图json数据下载](https://datav.aliyun.com/portal/school/atlas/area_selector?spm=a2crr.23498931.0.0.315315ddRqZtR3)

<script setup>
  import mapChart from './index.vue'
  import Map3d from './3d-map.vue'
</script>
<mapChart />

## 地图json数据注册
```js
  import gsJson from './json/gs.json'
  echarts.registerMap('gansu', gsJson)
```
## 地图各区域中心的经纬度
```js
  import { getCenterPoint } from '../index.js'
  const centerPoints = ref([])
  // 获取地图中心点坐标
  centerPoints.value = getCenterPoint(gsJson.features)
  // 将地图中心点坐标赋值给散点图数据
  option.series[0].data = centerPoints.value
```
## 地图geo配置
```js
  geo: [
    {
      map: 'gansu', // 地图名称
      aspectScale: 1, // 宽高比
      roam: false, // 是否允许缩放
      zoom: 1.3, // 默认显示级别
      layoutSize: '100%', // 布局大小
      layoutCenter: ['50%', '50%'], // 布局中心点
      itemStyle: { // 地图样式
        areaColor: '#fff000', // 区域颜色
        borderColor: '#fff', // 边界颜色
        borderWidth: 3 // 边界宽度
      },
      emphasis: { // 高亮样式
        itemStyle: {
          areaColor: '#59C3F9',
          borderColor: 'transparent',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(255, 255, 255, 0.8)'
        },
        label: {
          show: false
        }
      },
      z: 1
    }
  ]
```
## 地图标记-散点图配置
```js
  series: [
    {
      type: 'scatter', // 散点图类型
      coordinateSystem: 'geo', // 坐标系类型
      data: [], // 散点图数据，此处为地图中心点坐标数组
      symbolSize: fontSizeComp(20),  // 散点图大小
      symbol: `image://${new URL(`./point-bottom.png`, import.meta.url).href}`, // 散点图图标
      label: {
        position: 'top',
        show: true,
        formatter: params => params.name,
        color: 'red',
        fontWeight: 'bold',
        fontSize: fontSizeComp(10)
      }
    }
  ]
```
## 二维地图与3d设计图实现3d地图联动效果

<map-3d></map-3d>

### 实现思路：
  1. 在3d设计图上放置一个透明的二维地图
  2. 确定geo配置的zoom, layoutSize,调整layoutCenter使其3d设计图对齐。
  3. 调整3d设计图的background-size。
  4. 为保证自适应，通过监听窗口大小变化，动态调整最外层容器的大小。


```js
// 地图大小适配屏幕大小
const mapSize = () => {
	const mapDom = document.querySelector('.echarts_map_3d_wrap')
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
const option = reactive({
  backgroundColor: 'transparent',
  // 画布布局
  grid: {
    width: '100%',
    height: '100%'
  },
  geo: [
    {
      map: 'gansu',
      aspectScale: 1,
      roam: false, // 是否允许缩放
      zoom: 1.3, // 默认显示级别
      layoutSize: '100%',
      layoutCenter: ['50%', '47%'],
      itemStyle: {
        areaColor: '#fff000',
        borderColor: '#fff',
        borderWidth: 4
      },
      emphasis: {
        itemStyle: {
          areaColor: '#59C3F9',
          borderColor: 'transparent',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(255, 255, 255, 0.8)'
        },
        label: {
          show: false
        }
      },
      z: 1
    }
  ],
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize: fontSizeComp(20),
      symbol: `image://${new URL(`./point-bottom.png`, import.meta.url).href}`,
      label: {
        position: 'top',
        show: true,
        formatter: params => params.name,
        color: 'red',
        fontWeight: 'bold',
        fontSize: fontSizeComp(10)
      }
    }
  ]
})
// 组件模板
<template>
  <div class='echarts_map_3d_wrap'>
    <div class="map_3d_bg" />
    <div ref="chartRef" style="width: 673px;height: 446px;" />
  </div>
</template>
// 样式
<style lang='scss'>
  .echarts_map_3d_wrap{
    border: 1px solid #fff;
    position: relative;
    .map_3d_bg{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: url('./map3dBg.png') no-repeat center;
      background-size: 99% 89%;
    }
  }
</style>
```