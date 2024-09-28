<script setup name='TextGroupInput'>
	const props = defineProps({
		type: {
			type: String,
			default: 'input'
		},
		inputSize: {
			type: String,
			default: 'medium'
		},
		inputWidth: {
			type: String,
			default: '100%'
		},
		value: {
			type: [String, Number],
			default: ''
		},
		prefixVal: {
			type: [String, Number],
			default: ''
		},
		prefixWidth: {
			type: String,
			default: ''
		},
		suffixVal: {
			type: [String, Number],
			default: ''
		},
		suffixWidth: {
			type: String,
			default: ''
		}
	})
	const emit = defineEmits(['update:value'])
	const modelValue = computed(() => props.value)
	function updateValue (e) {
		emit('update:value', e)
	}
</script>

<template>
  <n-input-group>
    <n-input-group-label v-if="prefixVal" :style="{ width: props.prefixWidth }">
      {{ props.prefixVal }}
    </n-input-group-label>
    <n-input
      v-if="props.type === 'input'"
      v-model:value="modelValue"
      :style="{ width: props.inputWidth }"
      v-bind="$attrs"
      :on-update:value="updateValue"
      :size="props.inputSize"
    />
    <n-input-number
      v-if="props.type === 'inputNumber'"
      v-model:value="modelValue"
      :style="{ width: props.inputWidth }"
      v-bind="$attrs"
      :on-update:value="updateValue"
      :size="props.inputSize"
    />
    <n-input-group-label v-if="suffixVal" :style="{ width: props.suffixWidth }">
      {{ props.suffixVal }}
    </n-input-group-label>
  </n-input-group>
</template>

<style lang='scss' scoped>
// ::v-deep(.n-input .n-input__input-el){
// 	height: 100%;
// }
// ::v-deep(.n-input){
// 	height: 100%;
// }
</style>
