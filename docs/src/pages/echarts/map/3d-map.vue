<script setup>
	import { ref,reactive, onMounted,shallowRef,onUnmounted } from 'vue'
	import * as echarts from 'echarts'
	import { fontSizeComp, createColor,getCenterPoint } from '../index.js'
	import gsJson from './json/gs.json'
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
	const chartRef = ref(null)
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
	// 获取地图中心点坐标数据
	const centerPoints = ref([])
	centerPoints.value = getCenterPoint(gsJson.features)
	option.series[0].data = centerPoints.value
	const myChart = shallowRef(null)
	const resizeHandler = () => {
		mapSize()
		myChart.value?.resize()
		nextTick(() => {
			myChart.value?.setOption({}, true)
			myChart.value?.setOption(option)
		})
	}
	const initChart = async () => {
		// 初始化地图大小
		mapSize()
		// 注册地图数据
		echarts.registerMap('gansu', gsJson)
		// 初始化地图实例
		myChart.value = echarts.init(chartRef.value)
		// 初始化地图配置，生成地图
		myChart.value.setOption(option, { notMerge: false })
    window.addEventListener('resize', resizeHandler)
	}
	onMounted(() => {
		initChart()
	})
	onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
		if (myChart.value != null && myChart.value.dispose) {
			myChart.value.dispose() // 销毁实例，释放资源
		}
	})
</script>
<template>
  <div class='echarts_map_3d_wrap'>
    <div class="map_3d_bg" />
    <div ref="chartRef" style="width: 100%;height: 100%;" />
  </div>
</template>


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