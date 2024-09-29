<script setup name='RadioGroup'>
  import { useAttrs, computed } from 'vue'
	const attrs = useAttrs()
  const valueKey = computed(() => attrs.valueKey || 'value')
  const labelKey = computed(() => attrs.labelKey || 'label')
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
        :key="item[valueKey]"
        :value="item[valueKey]"
      >
        {{ item[labelKey]  }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>
