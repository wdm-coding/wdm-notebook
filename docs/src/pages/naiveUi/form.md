# GridForm 表单配置


## 1.单行文本框

<form-item-config :config="columns[0]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
      typeName: 'n-input',  // 控件类型
      label: '单行输入框：', // 表单项名称
      prop: 'lineInput',    // 表单项属性名称
      showRequireMark: true, // 是否显示必填 * 号
      attrs: {              // 控件属性
        placeholder: '单行输入框', // 表单项提示
        clearable: true,          // 表单项是否可清空
        maxlength: 10,          // 表单项最大输入长度
        ...其他属性参考 Input 文档
      }
    }]
```
[Input 文档](https://www.naiveui.com/zh-CN/os-theme/components/input)

## 2.密码输入框

<form-item-config :config="columns[1]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
      typeName: 'n-pwd-input',  // 控件类型 (密码输入框为n-input基础上二次封装)
      label: '密码输入框', // 表单项名称
      prop: 'lineInput',    // 表单项属性名称
      showRequireMark: true, // 是否显示必填 * 号
      attrs: {              // 控件属性
        placeholder: '密码输入框', // 表单项提示
        type: 'password' // 输入框输入类型
        ...其他属性参考 Input 文档
      }
    }]
```
[Input 文档](https://www.naiveui.com/zh-CN/os-theme/components/input)

## 3.多行文本框

<form-item-config :config="columns[2]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
      typeName: 'n-input',
      label: '多行输入框：',
      prop: 'linesInput',
      showRequireMark: true,
      attrs: {
        placeholder: '多行输入框',
        type: 'textarea',// 输入框类型
        autosize: { minRows: 5, maxRows: 10 }, // 表单项输入框行数设置
        maxlength: 100, // 表单项最大输入长度
        'show-count': true // 表单项是否显示字数统计
        ...其他属性参考 Input 文档
      }
    }]
```
[Input 文档](https://www.naiveui.com/zh-CN/os-theme/components/input)

## 4.数字输入框

<form-item-config :config="columns[3]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
      typeName: 'n-input-number',
      label: '数字输入框：',
      prop: 'numberInput',
      showRequireMark: true,
      attrs: {
        placeholder: '数字输入框',
        min: 0, // 最小值
        max: 20000, // 最大值 
        step: 1, // 步长
        parse:(input)=>{ // 解析输入的字符串，设定后会禁用 update-value-on-input
          const nums = input.replace(/(,|¥|\s)/g, "").trim();
          if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
          return nums === "" ? null : Number.NaN;
        },
        format: (value) => { // 格式化值的方法，设定后会禁用 update-value-on-input
          if (value === null) return "";
          console.log(`${value.toLocaleString("en-US")} ¥`)
          return `${value.toLocaleString("en-US")} ¥`;
        }
        ...其他属性参考 NInput Number 文档
      }
    }]
```
[ NInput Number 文档](https://www.naiveui.com/zh-CN/os-theme/components/input-number)

## 5.下拉选择器

<form-item-config :config="columns[4]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
      typeName: 'n-select',
      label: '下拉选择器:',
      prop: 'select-down',
      attrs: {
        placeholder: '下拉选择器',
        multiple: true,       // 是否多选
        'label-field': 'name', // 自定义选项的 label 默认label
        'value-field': 'value', // 自定义选项的 value 默认value
        options: [ // 选项数据
          {name: '选项1', value: 1},
          {name: '选项2', value: 2},
          {name: '选项3', value: 3},
          {name: '选项4', value: 4},
          {name: '选项5', value: 5}
        ],
        ...其他属性参考 NSelect 文档
      }
    }]
```
[NSelect 文档](https://www.naiveui.com/zh-CN/os-theme/components/select)

## 6.级联选择器

<form-item-config :config="columns[5]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
      typeName: 'n-cascader',
      label: '级联选择器:',
      prop: 'select-cascader',
      attrs: {
        placeholder: '级联选择器',
        'label-field': 'name',// 自定义选项的 label 默认label
        'value-field': 'value', // 自定义选项的 value 默认value
        multiple: false, // 是否多选
        'check-strategy': 'all', // 多选时是否允许部分选中
        'show-path': true, // 是否显示路径
        cascade:true, // 是否级联
        options: [ // 选项数据
          {
            name: '选项1',
            value: 1,
            children:[
              {name: '子选项1', value: 5},
              {name: '子选项2', value: 6}
            ]
          },
          {name: '选项2', value: 2},
          {name: '选项3', value: 3},
        ]
      }
      ...其他属性参考 NCascader 文档
    }]
```
[NCascader 文档](https://www.naiveui.com/zh-CN/os-theme/components/cascader)


## 7.日期选择器

<form-item-config 
  :config="columns[6]"
  @created="createdDatePicker"
/>

<form-item-config 
  :config="columns[7]"
  @created="createdDateRangePicker"
/>


<div>
  <n-button type="info" @click="getDate">获取日期数据</n-button>
  <p style="padding-left:10px">date:{{datePicker}}</p>
  <p style="padding-left:10px">dateRange:{{datePickerRange}}</p>
</div>

```js
  <GridForm
    :config="columns"
  />
  const columns = [
    {
      typeName: 'n-date-picker',
      label: '日期选择器:',
      prop: 'date-picker',
      attrs: {
        placeholder: '日期选择器',
        type: 'date', // 日期选择器类型 
        format: 'yyyy年MM月dd日', // 输入框显示格式
        'value-format': 'yyyy-MM-dd' // 返回值格式
      }
    },
    {
      typeName: 'n-date-picker',
      label: '日期范围选择器:',
      prop: 'date-pickerRange',
      attrs: {
        'start-placeholder': '开始',// 开始输入框提示
        'end-placeholder': '结束',// 结束输入框提示
        type: 'daterange',// 日期范围选择器
        format: 'yyyy年MM月dd日',
        'value-format': 'yyyy-MM-dd'
      }
    }
    
    ...其他属性参考 NDate Picker 文档
  ]
```
[NDate Picker 文档](https://www.naiveui.com/zh-CN/os-theme/components/date-picker)

## 8.时间选择器

<form-item-config :config="columns[8]"/>

```js
<GridForm
    :columns="columns"
  />
  const columns = [{
    typeName: 'n-time-picker',
    label: '时间选择器:',
    prop: 'time-picker',
    attrs: {
      placeholder: '时间选择器'
      ...其他属性参考 NTime Picker 文档
    }
  }]
```
[NTime Picker 文档](https://www.naiveui.com/zh-CN/os-theme/components/time-picker)

## 9.单选框组

<form-item-config :config="columns[9]"/>

```js
<GridForm
    :columns="columns"
  />
  const columns = [{
    typeName: 'n-radio-group',// 二次封装n-radio-group
    label: '单选框组:',
    prop: 'radio-group',
    attrs: {
      labelKey:'name', // 自定义选项的 label 默认label
      valueKey:'value', // 自定义选项的 value 默认value
      options: [ // 选项数据
        {name: '选项1', value: 1},
        {name: '选项2', value: 2},
        {name: '选项3', value: 3},
      ]
      ...其他属性参考 NRadio Group 文档
    }
  }]
```
[NRadio Group 文档](https://www.naiveui.com/zh-CN/os-theme/components/radio)

## 10.复选框组

<form-item-config :config="columns[10]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
    typeName: 'n-checkbox-group',// 二次封装n-checkbox-group
    label: '多选框组:',
    prop: 'checkbox-group',
    attrs: {
      labelKey:'name',// 自定义选项的 label 默认label
      valueKey:'value',// 自定义选项的 value 默认value
      options: [ // 选项数据
        {name: '选项1', value: 1},
        {name: '选项2', value: 2},
        {name: '选项3', value: 3},
      ]
      ...其他属性参考 NCheckbox Group 文档
    }
  }]
```
[NCheckbox Group 文档](https://www.naiveui.com/zh-CN/os-theme/components/checkbox)

## 11.Switch 开关

<form-item-config :config="columns[11]"/>

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
    typeName: 'n-switch',
    label: '开关：',
    prop: 'switch',
    attrs: {
      'checked-value': 1, // 选中时的值
      'unchecked-value': 0 // 未选中时的值
      ...其他属性参考 NSwitch 文档
    }
  }]
```
[NSwitch 文档](https://www.naiveui.com/zh-CN/os-theme/components/switch)

## 12.上传

```js
  <GridForm
    :columns="columns"
  />
  const columns = [{
    typeName: 'upload', // 二次封装n-upload
    label: '上传评估报告',
    prop: 'diagnoseReportFile',
    attrs: {
      'directory-dnd': false, // 是否支持文件拖拽上传
      showAlert: true, // 是否显示上传提示
      showAlertType: 'custom', // 提示类型
      'list-type': 'text', // 列表类型
      submitType: 'add', // 上传文件或者回显文件
      max: 1, // 最大上传文件数
      accept: '.pdf,.jpg,.png,.jpeg', //  允许上传文件类型
      alert: '支持扩展名 .pdf .jpg .png .jpeg,大小不超过50Mb' // 提示信息
      ...其他属性参考 NUpload 文档
    }
  }]
```
[NUpload 文档](https://www.naiveui.com/zh-CN/os-theme/components/upload)




<script setup>
  import formItemConfig from './form-item-config.vue'
  import list from './columns.js'
  import { ref } from 'vue'
  const columns = list
  const instance1 = ref(null)
  const instance2 = ref(null)
  const datePicker = ref('')
  const datePickerRange = ref('')
  const createdDatePicker = async (_instance) => {
    instance1.value = _instance
  }
  const createdDateRangePicker = async (_instance) => {
    instance2.value = _instance
  }
  async function getDate() {
    const data1 = await instance1.value.getHandle()
    datePicker.value = data1['date-picker']
    const data2 = await instance2.value.getHandle()
    datePickerRange.value = data2['date-pickerRange']
  }
</script>

<style lang="scss">

</style>