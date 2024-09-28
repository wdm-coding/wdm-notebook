export default {
	// form 属性配置
	formConfig: {
		type: Object,
		default: () => {}
	},
	// 初始化值
	initValue: {
		type: Object,
		default: () => {}
	},
	// 表单项
	columns: {
		type: Array,
		required: true
	},
	// 表单校验
	rules: {
		type: Object,
		default: () => {}
	},
	// 搜索表单收起、展开状态
	collapsed: {
		type: Boolean,
		default: false
	},
	// grid配置
	gridConfig: {
		type: Object,
		default: () => {}
	},
	// 是否搜索表单
	isSearch: {
		type: Boolean,
		default: false
	},
	// 是否分组表单
	isGroup: {
		type: Boolean,
		default: false
	},
	// 是否显示按钮
	showSuffix: {
		type: Boolean,
		default: true
	}
}
