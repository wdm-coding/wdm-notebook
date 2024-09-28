<script setup name="SearchTable">
	import BaseTable from './components/BaseTable.vue'
	import ColSetting from './components/ColSetting.vue'
	import useFullScreen from '@/hooks/useFullScreen'
	import { useComputedAttrs } from './index'
	import _props from './props'
	const props = defineProps(_props)
	const [formColumns, tableColumns, actionColumn, tableData, pagination] = useComputedAttrs(props)
	const _tableColumns = ref(tableColumns.value.concat([...actionColumn.value]))
	const emit = defineEmits([
		'update:page', 'update:pageSize', 'reGetList', 'search', 'reset'
	])
	function getSearch (searchParams) {
		emit('search', searchParams)
	}
	function resetSearch () {
		emit('reset')
	}
	// 全屏切换
	const isFull = ref(false)
	function toggleFullScreen () {
		isFull.value = useFullScreen('tableCard')
	}
	function pageSizeChange (pageSize) {
		emit('update:page', 1)
		emit('update:pageSize', pageSize)
		emit('reGetList')
	}
	function pageChange (page) {
		emit('update:page', page)
		emit('reGetList')
	}
	function changeColumns (list) {
		_tableColumns.value = [...list].concat([...actionColumn.value])
	}

</script>
<template>
  <div class="searchTable_wrap">
    <n-card
      v-if="props.isShowForm"
      style="margin-bottom: 10px;border-radius: 8px;"
      contentStyle="padding:20px 20px 0 20px"
    >
      <GridForm
        :columns="formColumns"
        :isSearch="true"
        :collapsed="true"
        @getValue="getSearch"
        @resetValue="resetSearch"
      />
    </n-card>
    <n-card
      id="tableCard"
      style="width:100%;min-height: 0;flex: 1;border-radius: 8px;display: flex;flex-direction: column;"
      content-style="min-height: 0;flex: 1;padding:20px 20px 10px 20px"
      headerStyle="padding:10px 20px;"
      headerClass="table_card_header"
    >
      <template v-if="showHeader" #header>
        <n-space style="display: flex;align-items: center;justify-content: space-between;">
          <n-space inline align="center" item-style="display: flex;align-items: center;">
            <slot v-if="$slots.headerLeftSlot" name="headerLeftSlot" />
          </n-space>
          <n-space justify="end" item-style="display: flex;align-items: center;">
            <slot v-if="$slots.headerRightSlot" name="headerRightSlot" />
            <n-tooltip trigger="hover">
              <template #trigger>
                <Icon name="Reload" style="cursor: pointer;" size="20" @click="emit('reGetList')" />
              </template>
              刷新
            </n-tooltip>
            <n-tooltip v-if="props.isShowFullscreen" trigger="hover">
              <template #trigger>
                <Icon
                  :name="!isFull ? 'FullscreenOutlined' : 'FullscreenExitOutlined'"
                  style="cursor: pointer;"
                  size="20"
                  @click="toggleFullScreen"
                />
              </template>
              全屏切换
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <ColSetting
                  :columns="tableColumns"
                  @changeColumns="changeColumns"
                />
              </template>
              列设置
            </n-tooltip>
          </n-space>
        </n-space>
      </template>
      <BaseTable
        ref="baseTableRef"
        v-bind="props.tableAttrs"
        :columns="_tableColumns"
        :data="tableData"
        :pagination="pagination"
        :updatePage="{
          'on-update:page-size':(size)=>{pageSizeChange(size)},
          'on-update:page':(page)=>{pageChange(page)}
        }"
      />
    </n-card>
  </div>
</template>

<style lang="scss" scoped>
.searchTable_wrap{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
  ::v-deep(.table_card_header){
    border-bottom: 1px solid var(--n-border-color);
  }
}
</style>
