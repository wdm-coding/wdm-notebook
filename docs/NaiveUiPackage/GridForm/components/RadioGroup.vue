<script setup name='RadioGroup'>
	const attrs = useAttrs()
	const props = defineProps({
		value: {
			type: [String, Number, Boolean],
			default: null
		}
	})
	const emit = defineEmits(['update:value'])
	const modelValue = computed(() => props.value)
</script>

<template>
  <n-radio-group v-model:value="modelValue" :name="attrs.prop" :on-update:value="(e)=>{emit('update:value', e)}">
    <n-space>
      <n-radio
        v-for="item in attrs.options"
        v-bind="item"
        :key="item[attrs.valueKey || 'value']"
        :value="item[attrs.valueKey || 'value']"
      >
        {{ item[attrs.labelKey || 'label']  }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>
