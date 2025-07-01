# 第一步：Beautify Formator 内置插件
1. HbuilderX -> 工具 -> 编辑器配置 -> 取消勾选`自动换行`-> 勾选`保存时自动格式化`
2. HbuilderX -> 工具 -> 插件配置 -> Beautify Formator -> 自定义jsbeautify格式化规则 -> 粘贴以下配置文件
```js
//配置文档参考：https://www.npmjs.com/package/js-beautify#options
module.exports = {
	parsers: {
		'.js': 'js',
		'.json': 'js',
		'.njs': 'js',
		'.sjs': 'js',
		'.wxs': 'js',
		'.css': 'css',
		'.nss': 'css',
		'.wxss': 'css',
		'.acss': 'css',
		'.ttss': 'css',
		'.qss': 'css',
		'.html': 'html',
		'.ux': 'html',
		'.wxml': 'html',
		'.nml': 'html',
		'.vue': 'html',
		'.nvue': 'html',
		'.axml': 'html',
		'.swan': 'html',
		'.ttml': 'html',
		'.qml': 'html'
	},
	options: {
		'wrap_line_length': 120, // 每行最大字符数
		'indent_size': 2, // 缩进空格数
		'preserve_newlines': false, //保留空行
		'indent_char': '\t', //缩进字符，可以是空格或tab
		'indent_with_tabs': false, //使用tab缩进
		'eol': '\r\n', //行结束符
		'end_with_newline': false, //使用换行结束输出
		'indent_level': 0, //起始代码缩进数
		'editorconfig': false, // 是否使用.editorconfig文件中的配置
		'max_preserve_newlines': null, //最大连续保留换行符个数。比如设为2，则会将2行以上的空行删除为只保留1行
		'space_in_paren': false, //括弧添加空格 示例 f( a, b )
		'space_in_empty_paren': false, //函数的括弧内没有参数时插入空格 示例 f( )
		'jslint_happy': false, //启用jslint-strict模式
		'space_after_anon_function': false, //匿名函数的括号前加空格
		'space_after_named_function': false, // 命名函数的括号前加空格
		'brace_style': 'collapse,preserve-inline', //代码样式，可选值 [collapse|expand|end-expand|none][,preserve-inline] [collapse,preserve-inline
		'unindent_chained_methods': false, //不缩进链式方法调用
		'break_chained_methods': false, //在随后的行中断开链式方法调用
		'keep_array_indentation': true, //保持数组缩进
		'unescape_strings': false, //使用xNN符号编码解码可显示的字符
		'e4x': false, //支持jsx
		'comma_first': false, //把逗号放在新行开头，而不是结尾
		'operator_position': 'before-newline', // 操作符位置，可选值 [before-newline|after-newline|preserve-newline]
		'unformatted': ['wbr'], // 不格式化指定标签
		'html': {
			'wrap_attributes': 'force-expand-multiline', //强制换行并多行显示
			'wrap-attributes-indent-size': 2, // 当属性换行显示时，指定第二行及后续属性的缩进空格数
			'inline': ['span', 'strong', 'em', 'a'], // 内联格式
			'unformatted': ['style', 'script'], // 不格式化指定标签内的内容
			'content_unformatted': undefined, //配置不被格式化的标签列表，比如['script', 'style']
			'indent_handlebars': true, //是否缩进handlebars模板表达式
			'indent_inner_html': true, //内部的嵌套内容进行缩进
			'indent-scripts': 'normal', //[keep|separate|normal]
			'extra_liners': [] //配置标签列表，需要在这些标签前面额外加一空白行
		},
		'css': {
			'selector-separator-newline': false, // 选择器分隔符换行
			'newline-between-rules': false // 规则之间换行
		},
		'typescript': {
			"convert_tabs_to_spaces": true,
			'indent_multi_line_object_literal_beginning_on_blank_line': true,
			'insert_space_after_comma_delimiter': true,
			'insert_space_after_constructor': false,
			'insert_space_after_function_keyword_for_anonymous_functions': true,
			'insert_space_after_keywords_in_control_flow_statements': true,
			'insert_space_after_opening_and_before_closing_empty_braces': true,
			'insert_space_after_opening_and_before_closing_jsx_expression_braces': false,
			'insert_space_after_opening_and_before_closing_nonempty_braces': true,
			'insert_space_after_opening_and_before_closing_nonempty_brackets': false,
			'insert_space_after_opening_and_before_closing_nonempty_parenthesis': false,
			'insert_space_after_opening_and_before_closing_template_string_braces': false,
			'insert_space_after_semicolon_in_for_statements': true,
			'insert_space_after_type_assertion': false,
			'insert_space_before_and_after_binary_operators': true,
			'insert_space_before_function_parenthesis': false,
			'insert_space_before_type_annotation': true,
			'place_open_brace_on_new_line_for_control_blocks': false,
			'place_open_brace_on_new_line_for_functions': false,
			'semicolons': 'ignore',
			'trim_trailing_whitespace': true
		}
	}
}
```

# 第二步：eslint-vue (插件市场下载)
1. HbuilderX -> 工具 -> 插件配置 -> eslint-vue -> 勾选`保存时自动修复`->勾选`启用实时校验`->自定义eslint-vue校验规则 -> 粘贴以下配置文件
2. 卸载其他格式化插件，只保留eslint-vue与内置插件Beautify Formator
```js
//更详细的配置文档请参考：https://github.com/vuejs/eslint-plugin-vue#gear-configs
module.exports = {
	'extends': 'plugin:vue/base',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'settings': {
		'html/html-extensions': ['.html']
	},
	'rules': {
		// 关闭默认缩进规则
		'indent': 'off',
		// 未使用的参数不提示
		'no-unused-vars': 'off',
		// 用强等于做判断
		'eqeqeq': ['error', 'always'],
		// 结尾不分号 
		'semi': ['error', 'never'],
		// 禁止多个空格
		'no-multi-spaces': 'error',
		// 强制使用单引号
		'quotes': ['error', 'single', {
			'avoidEscape': true, // 允许在字符串中使用单引号时使用双引号避免转义
			'allowTemplateLiterals': true // 允许使用模板字符串
		}],
		// 简略箭头函数
		'arrow-parens': ['error', 'as-needed'],
		// 关键字前后空格处理
		'keyword-spacing': ['error', {
			'before': true, // 关键字前加空格
			'after': true // 关键字后加空格
		}],
		// 关键字前后冒号处理
		'key-spacing': ['error', {
			'beforeColon': false, // 冒号前不加空格
			'afterColon': true // 冒号后加空格（默认）
		}],
		// 强制括号内有一个空格
		'space-in-parens': ["error", "never"],
		// 强制在花括号前添加空格
		'space-before-blocks': ['error', {
			'functions': 'always', // 函数关键字后面必须有空格
			'keywords': 'always', // 其他关键字（if, for等）后必须有空格
			'classes': 'always' // 类定义后必须有空格
		}],
		// 箭头函数前后必须空格
		'arrow-spacing': ['error', {
			'before': true, // => 前必须有空格
			'after': true // => 后必须有空格
		}],
		// 强制在花括号内部添加空格
		'object-curly-spacing': ['error', 'always', {
			'arraysInObjects': true, // 数组在对象中时花括号内有空格
			'objectsInObjects': true // 对象在对象中时花括号内有空格
		}],
		// 删除多余空行的核心规则
		'no-multiple-empty-lines': ['error', {
			'max': 0, // 最多允许连续1个空行
			'maxEOF': 0, // 文件末尾不允许空行
			'maxBOF': 0 // 文件开头不允许空行
		}],
		// 操作符周围有空格
		'space-infix-ops': 'error',
		// 逗号前后空格
		'comma-spacing': ['error', {
			'before': false,
			'after': true
		}],
		// vue逗号前后空格
		'vue/comma-spacing': ['error', {
			'before': false,
			'after': true
		}],
		// 对象字面量中禁止尾随逗号
		"comma-dangle": ["error", "never"],
		// 对象字面量花括号换行规则
		'object-curly-newline': ['error', {
			'ObjectExpression': {
				'minProperties': 2, // 超过两个属性换行
				'multiline': true, // 多行模式
				'consistent': true // 保持一致性
			},
			'ObjectPattern': { // 对象模式（解构赋值）的规则
				'multiline': true,
			}
		}],
		// 对象字面量属性换行规则
		'object-property-newline': ['error', {
			'allowAllPropertiesOnSameLine': false // 禁止所有属性在同一行
		}],
		// 数组括号内强制换行
		'array-bracket-newline': ['error', 'consistent'],
		// 单标签闭合规则
		'vue/html-self-closing': ['error', {
			'html': {
				'void': 'always', // 对于空元素（如img, br等），始终自闭合
				'normal': 'always', // 对于其他没有内容的普通元素，要求自闭合
				'component': 'always' // 对于组件，也要求自闭合
			},
			'svg': 'always', // SVG命名空间中的元素
			'math': 'always' // MathML命名空间中的元素
		}],
		// 强制在模板属性值中使用单引号
		'vue/html-quotes': ['error', 'single', {
			'avoidEscape': true
		}],
		// 多行元素的内容前后换行
		'vue/multiline-html-element-content-newline': ['error', {
			'ignoreWhenEmpty': false,
			'allowEmptyLines': false,
		}],
		// 多行元素的闭合标签换行
		'vue/html-closing-bracket-newline': ['error', {
			'singleline': 'never', // 单行元素不需要换行
			'multiline': 'always' // 多行元素（属性换行）的闭合标签换行
		}],
		// 内容缩进（这里缩进为2个空格）
		'vue/html-indent': ['error', 2, {
			'attribute': 1, // 属性缩进1级（即2个空格）
			'baseIndent': 1, // 基础缩进1级（2个空格）根据baseIndent调整
			'closeBracket': 0, // 闭合括号不额外缩进
			'alignAttributesVertically': true,
		}],
		// vue中script标签的缩进级别
		'vue/script-indent': ['error', 2, {
			'baseIndent': 1, // 相对于 <script> 标签的缩进级别
			'switchCase': 1, // switch语句Case的缩进
			'ignores': ['CallExpression'] // 忽略函数参数缩进
		}],
		// 强制在插值表达式内部添加空格
		'vue/mustache-interpolation-spacing': ['error', 'always'],
		//在computed properties中禁用异步actions
		'vue/no-async-in-computed-properties': 'error',
		//不允许重复的keys
		'vue/no-dupe-keys': 'error',
		//不允许重复的attributes
		'vue/no-duplicate-attributes': 'warn',
		//在 <template> 标签下不允许解析错误
		'vue/no-parsing-error': ['error', { 'x-invalid-end-tag': false }],
		//不允许覆盖保留关键字
		'vue/no-reserved-keys': 'off',
		//强制data必须是一个带返回值的函数
		'vue/no-shared-component-data': 'error',
		//不允许在computed properties中出现副作用。
		'vue/no-side-effects-in-computed-properties': 'error',
		//<template>不允许key属性
		'vue/no-template-key': 'warn',
		//在 <textarea> 中不允许mustaches
		'vue/no-textarea-mustache': 'error',
		//不允许在v-for或者范围内的属性出现未使用的变量定义
		'vue/no-unused-vars': 'off',
		//<component>标签需要v-bind:is属性
		'vue/require-component-is': 'error',
		// render 函数必须有一个返回值
		'vue/require-render-return': 'error',
		//保证 v-bind:key 和 v-for 指令成对出现
		'vue/require-v-for-key': 'error',
		// 检查默认的prop值是否有效
		'vue/require-valid-default-prop': 'error',
		// 保证computed属性中有return语句 
		'vue/return-in-computed-property': 'error',
		// 强制校验 template 根节点
		'vue/valid-template-root': 'error',
		// 强制校验 v-bind 指令
		'vue/valid-v-bind': 'error',
		// 强制校验 v-cloak 指令
		'vue/valid-v-cloak': 'error',
		// 强制校验 v-else-if 指令
		'vue/valid-v-else-if': 'error',
		// 强制校验 v-else 指令 
		'vue/valid-v-else': 'error',
		// 强制校验 v-for 指令
		'vue/valid-v-for': 'error',
		// 强制校验 v-html 指令
		'vue/valid-v-html': 'error',
		// 强制校验 v-if 指令
		'vue/valid-v-if': 'error',
		// 强制校验 v-model 指令
		'vue/valid-v-model': 'error',
		// 强制校验 v-on 指令
		'vue/valid-v-on': 'error',
		// 强制校验 v-once 指令
		'vue/valid-v-once': 'error',
		// 强制校验 v-pre 指令
		'vue/valid-v-pre': 'error',
		// 强制校验 v-show 指令
		'vue/valid-v-show': 'error',
		// 强制校验 v-text 指令
		'vue/valid-v-text': 'error',
		// 禁止在注释中使用指令
		'vue/comment-directive': 0
	}
}
```