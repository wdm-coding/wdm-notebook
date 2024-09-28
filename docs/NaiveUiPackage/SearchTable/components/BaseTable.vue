<script setup name='BaseTable'>
	import { computed } from 'vue'
	import { baseTableConfig } from '../index'
	const attrs = useAttrs()
	const tableAttrs = computed(() => ({ ...baseTableConfig, ...attrs.tableAttrs, ...attrs.updatePage }))
</script>

<template>
  <n-data-table
    v-bind="tableAttrs"
    :columns="attrs.tableColumns || []"
    :data="attrs.tableData || []"
    style="height: 100%;"
    :pagination="attrs.pagination"
  />
</template>

<style lang='scss' scoped>
::v-deep(.n-data-table-base-table){
	height: 100%;
}
::v-deep(.n-data-table-th__title){
	text-align: center !important;
}
::v-deep(.table_row_style){
  .n-data-table-td{
    text-align: center !important;
    vertical-align: middle !important;
    border-bottom: 1px solid var(--n-merged-border-color) !important;
  }
}
::v-deep(.table_row_style){
  .td_left{
    text-align: left !important;
  }
}
::v-deep(.td_center){
  .n-space{
    justify-content: center !important;
  }
}
</style>
