<script setup>
	import { ref,reactive, onMounted,shallowRef,onUnmounted } from 'vue'
	import * as echarts from 'echarts'
	import { fontSizeComp, createColor,getCenterPoint } from '../index.js'
	import gsJson from './json/gs.json'
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
				layoutCenter: ['50%', '50%'],
				itemStyle: {
					areaColor: '#fff000',
					borderColor: '#fff',
					borderWidth: 3
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
				symbolSize: fontSizeComp(10),
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
		myChart.value?.resize()
		nextTick(() => {
			myChart.value?.setOption({}, true)
			myChart.value?.setOption(option)
		})
	}
	const initChart = async () => {
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
  <div class='echarts_map_wrap'>
    <div ref="chartRef" style="width:100%;height: 500px;" />
  </div>
</template>


<style lang='scss'>
.echarts_map_wrap{
  width: 100%;
}
</style>