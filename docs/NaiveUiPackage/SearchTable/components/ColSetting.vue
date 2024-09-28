<script setup name='ColSetting'>
	import Draggable from 'vuedraggable'
	const emit = defineEmits(['changeColumns'])
	const props = defineProps({
		columns: {
			type: Array,
			default: () => []
		}
	})
	const indeterminate = ref(false)
	const checkAll = ref(true)
	const checkList = ref(props.columns.map(item => item.key))
	const columnsList = ref(props.columns)
	function onMove (e) {
		return !(e.draggedContext.element.draggable === false)
	}
	function draggableEnd () {
		const newColumns = toRaw(unref(columnsList))
		columnsList.value = newColumns
		setColumns(columnsList.value)
	}
	function onChange (list) {
		if (list.length === 0) {
			checkAll.value = false
			indeterminate.value = false
		} else if (list.length === props.columns.length) {
			checkAll.value = true
			indeterminate.value = false
		} else if (list.length !== 0 && list.length < props.columns.length) {
			indeterminate.value = true
		} else {
			indeterminate.value = false
		}
		setColumns(columnsList.value)
	}
	function onCheckAll (e) {
		if (e) {
			checkList.value = props.columns.map(item => item.key)
		} else {
			checkList.value = []
		}
		setColumns(columnsList.value)
	}
	function setColumns (columns) {
		const list = columns.filter(item => checkList.value.includes(item.key))
		emit('changeColumns', list)
	}
	function reset () {
		checkList.value = props.columns.map(item => item.key)
		checkAll.value = true
		indeterminate.value = false
		columnsList.value = props.columns
		setColumns(props.columns)
	}
</script>

<template>
  <div class="cursor-pointer toolbar_right_icon">
    <n-popover trigger="click" :width="230" placement="bottom-end">
      <template #trigger>
        <Icon name="SettingOutlined" size="20" style="cursor: pointer;" />
      </template>
      <template #header>
        <div class="table-toolbar-inner-popover-title">
          <n-space style="display: flex;align-items: center;justify-content: space-between;">
            <n-checkbox
              v-model:checked="checkAll"
              :indeterminate="indeterminate"
              @update:checked="onCheckAll"
            >
              列展示
            </n-checkbox>
            <n-button
              text
              type="info"
              size="small"
              @click="reset"
            >
              重置
            </n-button>
          </n-space>
        </div>
      </template>
      <div class="table-toolbar-inner">
        <n-checkbox-group v-model:value="checkList" @update:value="onChange">
          <Draggable
            v-model="columnsList"
            animation="300"
            item-key="key"
            filter=".no-draggable"
            handle=".draggable_dom"
            :move="onMove"
            @end="draggableEnd"
          >
            <template #item="{ element }">
              <n-space class="draggable_dom" style="display: flex;align-items: center;">
                <Icon name="DragOutlined" style="cursor: pointer;margin-right: 20px;" />
                <n-checkbox :value="element.key" :label="element.title" style="display: flex;" />
              </n-space>
            </template>
          </Draggable>
        </n-checkbox-group>
      </div>
    </n-popover>
  </div>
</template>

<style lang='scss' scoped>
.toolbar_right_icon{
  display: flex;
  align-items: center;
}
</style>
