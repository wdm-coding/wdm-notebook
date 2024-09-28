<script setup name='NaiveIcon'>
	import * as vicons from '@vicons/ionicons5'
	import * as antdICon from '@vicons/antd'
	const allIcons = Object.assign({}, vicons, antdICon)
	const getIcon = name => allIcons[name]
	const props = defineProps({
		name: {
			type: String,
			required: true
		}
	})
</script>

<template>
  <n-icon v-bind="$attrs" :component="getIcon(props.name)" />
</template>

<style lang='scss' scoped>

</style>
