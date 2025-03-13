# 3D曲面
<script setup>
  import ring3d from './index.vue'
</script>
<ring3d />

##  扇形曲面参数方程
```js
  function getParametricEquation (
    startRatio, // 开始比例
    endRatio, // 结束比例
    isSelected, // 是否选中
    isHovered, // 是否高亮
    k, // 辅助参数，默认值为1/3
    height = 1 // 曲面高度，默认为 1
  ) {
      // 计算
      const midRatio = (startRatio + endRatio) / 2
      const startRadian = startRatio * Math.PI * 2
      const endRadian = endRatio * Math.PI * 2
      const midRadian = midRatio * Math.PI * 2
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== 'undefined' ? k : 1 / 3
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      const hoverRate = isHovered ? 1.05 : 1
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
        },
        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u)
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u)
          }
          return Math.sin(v) > 0 ? 1 * height : -1
        }
      }
    };
```

## 生成模拟 3D 饼图的series
```js
  // 参数 pieData 格式如下：
  [{
    name: '系列1', // 系列名称，可选参数。如果不设置，则默认为 series0、series1...
    value: 335, // 值大小，必填参数。
    itemStyle: { // 系列样式，可选参数。
      color: '#6BE7FC', // 系列颜色，可选参数。如果未设置，则使用默认颜色。
      opacity: 0.8 // 系列透明度，可选参数。如果未设置，则使用默认值（1）。
    }
  }]
  // 参数internalDiameterRatio 为内径比例，值越大，厚度越薄，反之则越厚。默认值为 1/3
  function getPie3D (pieData, internalDiameterRatio) {
		const series = []
		let sumValue = 0
		let startValue = 0
		let endValue = 0
		const legendData = []
		const k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3
		for (let i = 0; i < pieData.length; i++) {
			sumValue += pieData[i].value
			const seriesItem = {
				name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
				type: 'surface',
				parametric: true,
				wireframe: {
					show: false
				},
				pieData: pieData[i],
				pieStatus: {
					selected: false,
					hovered: false,
					k
				}
			}
			if (typeof pieData[i].itemStyle !== 'undefined') {
				const itemStyle = {}
				// eslint-disable-next-line no-unused-expressions
				typeof pieData[i].itemStyle.color !== 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null
				// eslint-disable-next-line no-unused-expressions
				typeof pieData[i].itemStyle.opacity !== 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null
				seriesItem.itemStyle = itemStyle
			}
			series.push(seriesItem)
		}
		for (let i = 0; i < series.length; i++) {
			endValue = startValue + series[i].pieData.value
			series[i].pieData.startRatio = startValue / sumValue
			series[i].pieData.endRatio = endValue / sumValue
			series[i].parametricEquation = getParametricEquation(
				series[i].pieData.startRatio,
				series[i].pieData.endRatio,
				false,
				false,
				k,
				series[i].pieData.value
			)
			startValue = endValue
			legendData.push(series[i].name)
		}
		series.push({
			type: 'pie',
			startAngle: 180,
			radius: ['35%', '45%'],
			center: ['50%', '52%'],
			labelLine: {
				show: true,
				length: 20,
				length2: 20,
				lineStyle: {
					color: '#6BE7FC'
				}
			},
			label: {
				formatter: '{d}%',
				color: '#fff',
				fontSize: fontSizeComp(10)
			},
			data: pieData.map(item => ({ ...item, itemStyle: { color: 'transparent' } }))
		})
		return series
	}
```

## options 配置
```js
const option = reactive({
  xAxis3D: {
    min: -1,
    max: 1
  },
  yAxis3D: {
    min: -1,
    max: 1
  },
  zAxis3D: {
    min: -1,
    max: 2 // 曲面墙高度范围，可根据实际需求调整，值越大，高度越小
  },
  grid3D: {
    show: false,// 隐藏网格线
    boxHeight: 1, // 网格高度
    bottom: '20%', // 底部留白
    viewControl: { // 视角控制
      alpha: 30, // 视角旋转角度
      beta: 180, // 视角俯仰角度
      autoRotate: false,// 是否自动旋转
      zoomSensitivity: 0 // 缩放灵敏度
    }
  },
  series: []
})
```
## 配置数据
```js
const list = [25, 52, 20]
const legendData = ['直接访问', '邮件营销', '联盟广告']
option.legend.data = legendData
const optionData = list.map((item, index) => ({
  name: legendData[index],
  value: item,
  itemStyle: {
    color: colors[index]
  }
}))
const series = getPie3D(optionData, 0.8)
option.series = series
```