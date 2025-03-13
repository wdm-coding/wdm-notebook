# 圆环图
<script setup>
  import ring from './index.vue'
</script>
<ring />

## series配置
```js
series: [
  {
    type: 'pie',// 环形图
    startAngle: 90, // 起始角度，默认为0度，顺时针方向。
    radius: ['25%', '35%'], // 环形图的内外半径，默认为['0%', '75%']。
    center: ['50%', '45%'], // 环形图的中心位置，默认为['50%', '50%']。
    labelLine: { // 标签的视觉引导线样式设置。
      show: true
    },
    label: { // 标签的文本样式设置。
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
```