# 二维地图
<script setup>
  import mapChart from './index.vue'
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