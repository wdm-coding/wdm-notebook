<script setup name='GridForm'>
	import { ref,watch,computed,nextTick } from 'vue'
	import FormItem from './components/FormItem.vue'
	import { baseConfig } from './index'
	import _props from './props'
	const formRef = ref(null)
	const props = defineProps(_props)
	const emit = defineEmits(['modelValue', 'getValue', 'errorValid', 'resetValue'])
	const formValue = ref({})
	watch(
		() => formValue.value,
		val => {
			emit('modelValue', val)
		},
		{
			deep: true,
			immediate: true
		}
	)
	watch(
		() => props.initValue,
		val => {
			initFormValue(val)
		},
		{
			deep: true
		}
	)
	// 搜索表单收起、展开
	const collapsed = ref(props.collapsed)
	// 获取表单值
	function getHandle () {
		return new Promise((resolve, reject) => {
			formRef.value?.validate(error => {
				if (!error) {
					Object.keys(formValue.value).forEach(key => {
						if (typeof formValue.value[key] !== 'number' &&
							typeof formValue.value[key] !== 'boolean' &&
							!formValue.value[key]) {
							delete formValue.value[key]
						}
						if (formValue.value[key] && typeof formValue.value[key] === 'string') {
							formValue.value[key].trim()
						}
					})
					emit('getValue', formValue.value)
					resolve(formValue.value)
				} else {
					emit('errorValid', error)
					reject(error)
				}
			})
		})
	}
	const formItemRef = ref([])
	// 重置
	function resetHandle () {
		Object.keys(formValue.value).forEach(key => {
			formValue.value[key] = null
		})
		formRef.value?.restoreValidation()
		nextTick(() => {
			// 设置富文本校验函数
			columns.value.forEach((item, index) => {
				if (item.typeName === 'rich-editor') {
					formItemRef.value[index]?.clearValidate()
				}
			})
			emit('resetValue')
		})
	}
	// 初始化表单值
	function initFormValue (object) {
		Object.keys(object).forEach(key => {
			if (typeof object[key] !== 'number' &&
				typeof object[key] !== 'boolean' &&
				!object[key]) {
				delete formValue.value[key]
			} else {
				const columnsKeys = columns.value.map(item => item.prop)
				if (columnsKeys.includes(key)) {
					formValue.value[key] = object[key]
				}
			}
		})
	}
	// 表单配置json数组
	const columns = computed(() => props.columns)
	// 表单校验规则
	const rules = computed(() => props.rules)
	// 表单form配置
	const formConfig = computed(() => Object.assign({ ...baseConfig.formConfig }, { ...props.formConfig }))
	// grid配置
	const gridConfig = computed(() => {
		if (props.isSearch) {
			return Object.assign({ ...baseConfig.searchGridConfig }, { ...props.gridConfig })
		} else {
			return Object.assign({ ...baseConfig.gridConfig }, { ...props.gridConfig })
		}
	})
	// 获取表单数据
	function getFromData () {
		return formValue.value
	}

	function setItemValidate (prop, params = null) {
		nextTick(() => {
			columns.value.forEach((item, index) => {
				if (item.prop === prop) {
					formItemRef.value[index]?.setValidate(params)
				}
			})
		})
	}
	function clearValidate (prop, params = null) {
		nextTick(() => {
			columns.value.forEach((item, index) => {
				if (item.prop === prop) {
					formItemRef.value[index]?.clearValidate(params)
				}
			})
		})
	}

	defineExpose({ initFormValue, resetHandle, getHandle, getFromData, setItemValidate, clearValidate })
</script>

<template>
  <div class="gridForm_wrap">
    <n-form
      v-bind="formConfig"
      ref="formRef"
      :model="formValue"
      :rules="rules"
    >
      <template v-if="isGroup">
        <n-card
          v-for="item in columns"
          :key="item.groupKey"
          :title="item.groupName"
          header-style="padding:10px 0;font-size:16px;"
          header-class="group_card_header"
          content-style="padding:20px 10px 10px 10px"
          style="margin-bottom: 20px;"
        >
          <n-grid v-bind="gridConfig">
            <template v-for="child in item.children" :key="child.prop">
              <n-grid-item v-if="!child.isHide" v-bind="child.gridItemAttrs || {}">
                <FormItem ref="formItemRef" v-model:model-value="formValue[item.prop]" :item="child">
                  <template v-for="item in Object.keys($slots)" #[item] :key="item">
                    <slot :name="item" v-bind="child" />
                  </template>
                </FormItem>
              </n-grid-item>
            </template>
          </n-grid>
        </n-card>
        <n-card v-if="props.showSuffix">
          <n-space style="display: flex;justify-content: flex-end;height: 100%;">
            <n-button attr-type="button" type="primary" @click="getHandle">
              <template #icon>
                <Icon name="Search" />
              </template>
              查询
            </n-button>
            <n-button attr-type="button" secondary @click="resetHandle">重置</n-button>
            <n-button v-if="props.isSearch" text type="primary" @click="collapsed = !collapsed">
              <template #icon>
                <Icon :name="collapsed ? 'ChevronDown' : 'ChevronUpOutline'" />
              </template>
              {{ collapsed ? '展开' : '收起' }}
            </n-button>
          </n-space>
        </n-card>
      </template>
      <n-grid v-else  v-bind="gridConfig" :collapsed="collapsed">
        <template v-for="item in columns" :key="item.prop">
          <n-grid-item v-if="!item.isHide" v-bind="item.gridItemAttrs || {}">
            <FormItem ref="formItemRef" v-model:model-value="formValue[item.prop]" :item="item">
              <template v-for="slot in Object.keys($slots)" #[slot] :key="slot">
                <slot :name="slot" v-bind="item" />
              </template>
            </FormItem>
          </n-grid-item>
        </template>
        <n-grid-item v-if="props.showSuffix" suffix>
          <n-space style="display: flex;justify-content: flex-end;height: 100%;">
            <n-button attr-type="button" type="primary" @click="getHandle">
              <template #icon>
                <Icon name="Search" />
              </template>
              查询
            </n-button>
            <n-button attr-type="button" secondary @click="resetHandle">重置</n-button>
            <n-button v-if="props.isSearch" text type="primary" @click="collapsed = !collapsed">
              <template #icon>
                <Icon :name="collapsed ? 'ChevronDown' : 'ChevronUpOutline'" />
              </template>
              {{ collapsed ? '展开' : '收起' }}
            </n-button>
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-form>
  </div>
</template>

<style lang='scss' scoped>
.gridForm_wrap{
  ::v-deep(.group_card_header){
    border: 1px solid var(--n-border-color);
    .n-card-header__main{
      padding-left: 10px;
    }
  }
}
</style>
