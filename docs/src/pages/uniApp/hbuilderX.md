## js-beautify
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
		'indent_size': 4, // 缩进空格数
		'indent_char': '\t',
		'indent_with_tabs': false, //使用tab缩进
		'eol': '\r\n', //行结束符
		'end_with_newline': false, //使用换行结束输出
		'indent_level': 0, //起始代码缩进数
		'editorconfig': false,
		'preserve_newlines': true, //保留空行
		'max_preserve_newlines': null, //最大连续保留换行符个数。比如设为2，则会将2行以上的空行删除为只保留1行
		'space_in_paren': false, //括弧添加空格 示例 f( a, b )
		'space_in_empty_paren': false, //函数的括弧内没有参数时插入空格 示例 f( )
		'jslint_happy': false, //启用jslint-strict模式
		'space_after_anon_function': false, //匿名函数的括号前加空格
		'space_after_named_function': false,
		'brace_style': 'collapse', //代码样式，可选值 [collapse|expand|end-expand|none][,preserve-inline] [collapse,preserve-inline
		'unindent_chained_methods': false, //不缩进链式方法调用
		'break_chained_methods': false, //在随后的行中断开链式方法调用
		'keep_array_indentation': false, //保持数组缩进
		'unescape_strings': false, //使用xNN符号编码解码可显示的字符
		'wrap_line_length': 120, // 每行最大字符数
		'e4x': false, //支持jsx
		'comma_first': false, //把逗号放在新行开头，而不是结尾
		'operator_position': 'before-newline',
		'unformatted': ['wbr'],
		'html': {
			'wrap_attributes': 'force-expand-multiline', //强制换行并多行显示
			'wrap-attributes-indent-size': 2, // 当属性换行显示时，指定第二行及后续属性的缩进空格数
			'inline': ["span", "strong", "em", "a"], // 内联格式
			"unformatted": ["style"],
			'content_unformatted': undefined,
			'indent_handlebars': true,
			'indent_inner_html': true, //内部的嵌套内容进行缩进
			'indent-scripts': 'normal', //[keep|separate|normal]
			'extra_liners': [] //配置标签列表，需要在这些标签前面额外加一空白行
		},
		'css': {
			'selector-separator-newline': true,
			'newline-between-rules': false
		},
		'typescript': {
			// "convert_tabs_to_spaces":true,
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
			'semicolons': 'ignore', // values include "ignore" | "insert" | "remove"
			'trim_trailing_whitespace': true
		}
	}
}
```