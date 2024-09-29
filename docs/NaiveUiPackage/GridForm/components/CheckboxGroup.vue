<script setup name='CheckboxGroup'>
import { computed,useAttrs } from 'vue'
	const attrs = useAttrs()
  const valueKey = computed(() => attrs.valueKey || 'value')
  const labelKey = computed(() => attrs.labelKey || 'label')
	const props = defineProps({
		value: {
			type: Array,
			default: null
		}
	})
	const emit = defineEmits(['update:value'])
	const modelValue = computed(() => props.value)
</script>

<template>
  <n-checkbox-group v-model:value="modelValue" :name="attrs.prop" :on-update:value="(e)=>{emit('update:value', e)}">
    <n-space item-style="display: flex;">
      <n-checkbox
        v-for="item in attrs.options"
        v-bind="item"
        :key="item[valueKey]"
        :value="item[valueKey]"
        :label="item[labelKey]"
      />
    </n-space>
  </n-checkbox-group>
</template>
