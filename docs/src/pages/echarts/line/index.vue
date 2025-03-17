<script setup>
import { ref,reactive, onMounted,shallowRef,onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { fontSizeComp, createColor } from '../index.js'
	const chartRef = ref(null)
	const colors = [
		'rgba(33, 179, 255, 1)',
		'rgba(255, 252, 0, 1)',
		'rgba(0, 252, 255, 1)',
		'rgba(24, 255, 160, 1)'
	]
	const option = reactive({
		// 圆环图配置
		color: colors,
		tooltip: {
			trigger: 'axis'
		},
		grid: {
			top: '25%',
			right: '5%',
			left: '5%',
			bottom: '5%',
			containLabel: true
		},
		legend: {
			top: fontSizeComp(8),
			orient: 'vertical',
			data: [
				'新注册项目数',
				'计划竣工项目数',
				'(在建)在建项目数',
				'保函到期项目数'
			],
			textStyle: {
				color: '#fff',
				fontSize: fontSizeComp(12)
			},
			icon: 'rect',
			itemHeight: fontSizeComp(2),
			itemWidth: fontSizeComp(22),
			height: fontSizeComp(60),
			itemGap: fontSizeComp(20)
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			nameLocation: 'middle',
			data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			axisLabel: {
				interval: 0,
				color: '#fff',
				fontSize: fontSizeComp(12),
				margin: fontSizeComp(20)
			},
			splitLine: { show: false },
			axisLine: {
				show: true,
				lineStyle: {
					color: 'rgba(17, 149, 187, 1)'
				}
			},
			axisTick: {
				show: true,
				lineStyle: {
					color: 'rgba(17, 149, 187, 1)',
					width: 2
				},
				alignWithLabel: true,
				length: fontSizeComp(10)
			}
		},
		yAxis: {
			name: '单位：人次',
			nameTextStyle: {
				color: 'rgba(66, 204, 255, 1)',
				fontSize: fontSizeComp(12),
				padding: [0, fontSizeComp(30), fontSizeComp(10), 0]
			},
			type: 'value',
			axisLabel: {
				color: '#fff',
				fontSize: fontSizeComp(12)
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(17, 149, 187, 1)',
					type: 'dashed'
				}
			},
			axisLine: { show: false },
			axisTick: {
				show: false
			}
		},
		series: [
			{
				name: '新注册项目数',
				type: 'line',
				stack: 'Total',
				data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
			},
			{
				name: '计划竣工项目数',
				type: 'line',
				data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210]
			},
			{
				name: '(在建)在建项目数',
				type: 'line',
				data: [150, 232, 201, 154, 190, 330, 410, 101, 134, 90, 230, 210]
			},
			{
				name: '保函到期项目数',
				type: 'line',
				data: [320, 332, 301, 334, 390, 330, 320, 101, 134, 90, 230, 210]
			}
		]
	})
	const myChart = shallowRef(null)
	const resizeHandler = () => {
		myChart.value?.resize()
		nextTick(() => {
			myChart.value?.setOption({}, true)
			myChart.value?.setOption(option)
		})
	}
	const initChart = async () => {
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
  <div class='echarts_line_wrap'>
    <div ref="chartRef" style="width:100%;height: 500px;" />
  </div>
</template>


<style lang='scss'>
.echarts_line_wrap{
  width: 100%;
}
</style>