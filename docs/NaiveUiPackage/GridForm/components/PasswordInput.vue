<script setup name='PasswordInput'>
	import { ref, computed } from 'vue'
	const props = defineProps({
		value: {
			type: [String, Number],
			default: ''
		}
	})
	const readonly = ref(true)
	const emit = defineEmits(['update:value'])
	const modelValue = computed(() => props.value)
	function updateValue (e) {
		emit('update:value', e)
	}
</script>

<template>
  <n-input
    v-model:value="modelValue"
    type="password"
    v-bind="$attrs"
    :readonly="readonly"
    :on-update:value="updateValue"
    :on-focus="()=>{readonly = false}"
    :on-blur="()=>{readonly = true}"
    show-password-on="click"
  />
</template>

<style lang='scss' scoped>

</style>
