export default {
	formColumns: {
		type: Array,
		default: () => []
	},
	tableColumns: {
		type: Array,
		default: () => []
	},
	tableData: {
		type: Array,
		default: () => []
	},
	tableAttrs: {
		type: Object,
		default: () => {}
	},
	pagination: {
		type: [Boolean, Object],
		default: true
	},
	page: {
		type: Number,
		default: 1
	},
	pageSize: {
		type: Number,
		default: 20
	},
	total: {
		type: Number,
		default: 0
	},
	showHeader: {
		type: Boolean,
		default: true
	},
	actionColumn: {
		type: Object,
		default: () => {}
	},
	isShowForm: {
		type: Boolean,
		default: false
	},
	isShowFullscreen: {
		type: Boolean,
		default: true
	}
}
