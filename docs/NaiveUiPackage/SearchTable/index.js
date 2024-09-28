import ActionButton from './components/ActionButton.vue'
export const baseTableConfig = {
	'scroll-x': '100%',
	'flex-height': true,
	'max-height': '100%',
	bordered: true,
	'single-line': false,
	striped: true,
	'row-class-name': 'table_row_style',
	'single-column': true,
	remote: true
}
export const pageBaseConfig = {
	'show-size-picker': true,
	'show-quick-jumper': true,
	'page-sizes': [10, 20, 50, 100]
}
export const useComputedAttrs = props => {
	const formColumns = computed(() => props.formColumns)
	const tableColumns = computed(() => props.tableColumns)
	const actionColumn = computed(() => {
		if (props.actionColumn) {
			return [{
				...props.actionColumn,
				render (row, rowIndex) {
					return h(
						ActionButton,
						{
							row,
							rowIndex,
							actions: props.actionColumn?.actions || []
						}
					)
				}
			}]
		} else {
			return []
		}
	})
	const tableData = computed(() => props.tableData)
	const pagination = computed(() => {
		if (typeof props.pagination === 'boolean' && !props.pagination) {
			return false
		} else {
			return {
				page: props.page,
				pageSize: props.pageSize,
				itemCount: props.total,
				prefix: () => (`共 ${props.total} 条`),
				...pageBaseConfig
			}
		}
	})
	return [formColumns, tableColumns, actionColumn, tableData, pagination]
}
