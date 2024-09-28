<script setup name='FormItem'>
	import getDyname from './index.js'
	import { baseConfig } from '../index'
  import { ref,watch,computed,useAttrs } from 'vue'
	const props = defineProps({
		modelValue: {
			default: null
		}
	})
	const emit = defineEmits(['update:modelValue'])
	const itemValue = computed({
		get: () => props.modelValue,
		set: val => {
			emit('update:modelValue', val)
		}
	})
	const attrs = useAttrs()
	const item = computed(() => attrs.item)

	// 组件项属性处理
	function getItemAttrs (item) {
		let itemAttrs = {}
		switch (item.typeName) {
			case 'n-switch':
				itemAttrs = { 'default-value': false, ...item.attrs, prop: item.prop }
				break
			default:
				itemAttrs = { ...item.attrs, prop: item.prop }
				break
		}
		return Object.assign({ ...baseConfig.itemConfig }, { ...itemAttrs })
	}
	// 组件项-双向绑定属性处理
	function getModelValue (typeName) {
		switch (typeName) {
			case 'n-date-picker':
				return 'formatted-value'
			case 'n-time-picker':
				return 'formatted-value'
			default:
				return 'value'
		}
	}
	const formItemRef = ref([])
	// 设置富文本校验函数
	function setValidate (params = null) {
		formItemRef.value?.validate(params)
	}
	// 取消富文本校验函数
	function clearValidate (params = null) {
		formItemRef.value?.restoreValidation()
	}
	defineExpose({ clearValidate, setValidate })
</script>

<template>
  <n-form-item
    ref="formItemRef"
    :label="item.label"
    :path="item.prop"
    :label-align="item.align || 'left'"
    v-bind="{'show-require-mark':item.showRequireMark || false,...item.formItem} || {}"
  >
    <template v-if="item?.slot?.label" #label>
      <slot v-if="item.slot.label.name" :name="item.slot.label.name" />
    </template>
    <component
      :is="getDyname(item.typeName)"
      v-model:[getModelValue(item.typeName)]="itemValue"
      v-bind="getItemAttrs(item)"
      style="width:100%"
      v-on="item.methods || {}"
      @setValidate="setValidate"
    >
      <!-- 表单项 slot -->
      <!-- input前缀 -->
      <template v-if="item?.slot?.prefix" #prefix>
        <slot v-if="item.slot.prefix.name" :name="item.slot.prefix.name" />
        <Icon v-else :name="item.slot.prefix" />
      </template>
      <!-- input后缀 -->
      <template v-if="item?.slot?.suffix" #suffix>
        <slot v-if="item.slot.suffix.name" :name="item.slot.suffix.name" />
        <Icon v-else :name="item.slot.suffix" />
      </template>
      <!-- input清除图标 -->
      <template v-if="item?.slot?.clearIcon" #clear-icon>
        <slot v-if="item.slot.clearIcon.name" :name="item.slot.clearIcon.name" />
        <Icon v-else :name="item.slot.clearIcon" />
      </template>
      <!-- input 密码关闭时的图标 -->
      <template v-if="item?.slot?.passwordInvisibleIcon" #password-invisible-icon>
        <slot v-if="item.slot.passwordInvisibleIcon.name" :name="item.slot.passwordInvisibleIcon.name" />
        <Icon v-else :name="item.slot.passwordInvisibleIcon" />
      </template>
      <!-- input 密码显示时的图标 -->
      <template v-if="item?.slot?.passwordVisibleIcon" #password-visible-icon>
        <slot v-if="item.slot.passwordVisibleIcon.name" :name="item.slot.passwordVisibleIcon.name" />
        <Icon v-else :name="item.slot.passwordVisibleIcon" />
      </template>
      <!-- input 字数统计 -->
      <template v-if="item?.slot?.count" #count>
        <slot :name="item.slot.count.name" />
      </template>
      <!-- 成对输入框之间分隔符，仅 pair = true 生效且优先级高于 separator 属性 -->
      <template v-if="item?.slot?.separator" #separator>
        <slot v-if="item.slot.separator.name" :name="item.slot.separator.name" />
        <Icon v-else :name="item.slot.separator" />
      </template>
      <!-- 下拉选择框的箭头 -->
      <template v-if="item?.slot?.arrow" #arrow>
        <slot v-if="item.slot.arrow.name" :name="item.slot.arrow.name" />
        <Icon v-else :name="item.slot.arrow" />
      </template>
      <!-- 自定义图标 -->
      <template v-if="item?.slot?.icon" #icon>
        <slot v-if="item.slot.icon.name" :name="item.slot.icon.name" />
        <Icon v-else :name="item.slot.icon" />
      </template>
      <!-- Switch slot -->
      <!-- 开关激活时的内容 -->
      <template v-if="item?.slot?.checked && item.typeName === 'n-switch'" #checked>
        <slot v-if="item.slot.checked.name" :name="item.slot.checked.name" />
        <Icon v-else :name="item.slot.checked" />
      </template>
      <!-- 开关按钮选中时的图标 -->
      <template v-if="item?.slot?.checkedIcon && item.typeName === 'n-switch'" #checked-icon>
        <slot v-if="item.slot.checkedIcon.name" :name="item.slot.checkedIcon.name" />
        <Icon v-else :name="item.slot.checkedIcon" />
      </template>
      <!-- 开关关闭时的内容 -->
      <template v-if="item?.slot?.unchecked && item.typeName === 'n-switch'" #unchecked>
        <slot v-if="item.slot.unchecked.name" :name="item.slot.unchecked.name" />
        <Icon v-else :name="item.slot.unchecked" />
      </template>
      <!-- 开关按钮未选中时的图标 -->
      <template v-if="item?.slot?.uncheckedIcon && item.typeName === 'n-switch'" #unchecked-icon>
        <slot v-if="item.slot.uncheckedIcon.name" :name="item.slot.uncheckedIcon.name" />
        <Icon v-else :name="item.slot.uncheckedIcon" />
      </template>
      <!-- 上传组件 - 上传按钮 -->
      <template v-if="item.typeName === 'upload' && item?.slot?.default" #default>
        <slot v-if="item.slot.default.name" :name="item.slot.default.name" />
      </template>
    </component>
  </n-form-item>
</template>

<style lang='scss' scoped>

</style>
