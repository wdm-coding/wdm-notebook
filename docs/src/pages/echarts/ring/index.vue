<script setup>
import { ref,reactive, onMounted,shallowRef,onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { fontSizeComp, createColor } from '../index.js'
	const chartRef = ref(null)
	const colors = [
		createColor(['#EE8354', '#EC602A']),
		createColor(['#742EF5', '#965DF6']),
		createColor(['#265BF5', '#53B6F9']),
		createColor(['#F9D448', '#F29A38']),
		createColor(['#96F592', '#96F592'])
	]
	const option = reactive({
		// 圆环图配置
		color: colors,
		// 标题配置
		title: {
			text: '不同收支方式的保函数据',
			left: 'center',
			top: 10,
			textStyle: {
				color: '#fff',
				fontSize: fontSizeComp(14)
			}
		},
		tooltip: {
			trigger: 'item'
			// formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		legend: {
			top: 'bottom',
			data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
			textStyle: {
				color: '#fff',
				fontSize: fontSizeComp(9)
			},
			itemWidth: fontSizeComp(18),
			itemHeight: fontSizeComp(8)
		},
		series: [
			{
				type: 'pie',
				startAngle: 90,
				radius: ['25%', '35%'],
				center: ['50%', '45%'],
				labelLine: {
					show: true
				},
				label: {
					formatter: '{d}%',
					color: '#fff',
					fontSize: fontSizeComp(10)
				},
				data: [
					{ value: 335, name: '直接访问' },
					{ value: 310, name: '邮件营销' },
					{ value: 274, name: '联盟广告' },
					{ value: 235, name: '视频广告' },
					{ value: 400, name: '搜索引擎' }
				]
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
  <div class='echarts_ring_wrap'>
    <div ref="chartRef" style="width:100%;height: 500px;" />
  </div>
</template>


<style lang='scss'>
.echarts_ring_wrap{
  width: 100%;
}
</style>