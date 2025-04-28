# 陇易诊

## 后台管理系统
1. 测试 admin Abc123#$

```js
{
			typeName: 'n-input',
			label: '弹窗图片文字：',
			prop: 'pictureText',
			showRequireMark: true,
			attrs: {
				placeholder: '请输入',
				type: 'textarea'
			}
		},
		{
			typeName: 'n-input',
			label: '弹窗描述文字：',
			prop: 'descText',
			showRequireMark: true,
			attrs: {
				placeholder: '请输入',
				type: 'textarea'
			}
		},
		{
			typeName: 'n-input',
			label: '‘为您解决’文字：',
			prop: 'solveText',
			showRequireMark: true,
			attrs: {
				placeholder: '请输入',
				type: 'textarea'
			}
		},
pictureText: [
			{
				type: 'string',
				required: true,
				message: '请输入',
				trigger: ['input', 'blur']
			}
		],
		descText: [
			{
				type: 'string',
				required: true,
				message: '请输入',
				trigger: ['input', 'blur']
			}
		],
		solveText: [
			{
				type: 'string',
				required: true,
				message: '请输入',
				trigger: ['input', 'blur']
			}
		],
const serveIntroduction = JSON.stringify({
  pictureText: params.pictureText, // 图片文字描述
  descText: params.descText, // 弹窗描述文字
  solveText: params.solveText // 为您解决文字
})
params.serveDetails = serveIntroduction // 服务描述
delete params.pictureText
delete params.descText
delete params.solveText
```