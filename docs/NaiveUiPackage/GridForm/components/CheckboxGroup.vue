<script setup name='CheckboxGroup'>
import { computed } from 'vue'
	const attrs = useAttrs()
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
        :key="item[attrs.valueKey]"
        :value="item[attrs.valueKey || 'value']"
        :label="item[attrs.labelKey || 'label']"
      />
    </n-space>
  </n-checkbox-group>
</template>
