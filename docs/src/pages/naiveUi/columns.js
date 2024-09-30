export default [
  {
    typeName: 'n-input',
    label: '单行输入框：',
    prop: 'lineInput',
    showRequireMark: true,
    attrs: {
      placeholder: '单行输入框'
    }
  },
  {
    typeName: 'n-pwd-input',
    label: '密码输入框：',
    prop: 'pwdInput',
    showRequireMark: true,
    attrs: {
      placeholder: '密码输入框',
      type: 'password'
    }
  },
  {
    typeName: 'n-input',
    label: '多行输入框：',
    prop: 'linesInput',
    showRequireMark: true,
    attrs: {
      placeholder: '多行输入框',
      type: 'textarea',
      autosize: { minRows: 5, maxRows: 10 },
      maxlength: 100,
      'show-count': true
    }
  },
  {
    typeName: 'n-input-number',
    label: '数字输入框：',
    prop: 'numberInput',
    showRequireMark: true,
    attrs: {
      placeholder: '数字输入框',
      min: 0,
      max: 20000,
      step: 1,
      parse:(input)=>{
        const nums = input.replace(/(,|¥|\s)/g, "").trim();
        if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
        return nums === "" ? null : Number.NaN;
      },
      format: (value) => {
        if (value === null) return "";
        console.log(`${value.toLocaleString("en-US")} ¥`)
        return `${value.toLocaleString("en-US")} ¥`;
      }
    }
  },
  {
    typeName: 'n-select',
    label: '下拉选择器:',
    prop: 'select-down',
    showRequireMark: true,
    attrs: {
      placeholder: '下拉选择器',
      multiple: true,
      'label-field': 'name',
      'value-field': 'value',
      options: [
        {name: '选项1', value: 1},
        {name: '选项2', value: 2},
        {name: '选项3', value: 3},
        {name: '选项4', value: 4},
        {name: '选项5', value: 5}
      ],
      onUpdateValue:(val)=>{
        console.log('下拉选择器attrs值变化回调',val)
      }
    },
    methods:{
      updateValue:(val)=>{
        console.log('下拉选择器methods值变化回调',val)
      }
    }
  },
  {
    typeName: 'n-cascader',
    label: '级联选择器:',
    prop: 'select-cascader',
    showRequireMark: true,
    attrs: {
      placeholder: '级联选择器',
      'label-field': 'name',
      'value-field': 'value',
      multiple: false,
      'check-strategy': 'all',
      'show-path': true,
      cascade:true,
      options: [
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
  },
  {
    typeName: 'n-date-picker',
    label: '日期选择器:',
    prop: 'date-picker',
    showRequireMark: true,
    attrs: {
      placeholder: '日期选择器',
      type: 'date',
      format: 'yyyy年MM月dd日',
      'value-format': 'yyyy-MM-dd'
    }
  },
  {
    typeName: 'n-date-picker',
    label: '日期范围选择器:',
    prop: 'date-pickerRange',
    showRequireMark: true,
    attrs: {
      'start-placeholder': '开始',
      'end-placeholder': '结束',
      type: 'daterange',
      format: 'yyyy年MM月dd日',
      'value-format': 'yyyy-MM-dd'
    }
  },
  {
    typeName: 'n-time-picker',
    label: '时间选择器:',
    prop: 'time-picker',
    showRequireMark: true,
    attrs: {
      placeholder: '时间选择器'
    }
  },
  {
    typeName: 'n-radio-group',
    label: '单选框组:',
    prop: 'radio-group',
    showRequireMark: true,
    attrs: {
      labelKey:'name',
      valueKey:'value',
      options: [
        {name: '选项1', value: 1},
        {name: '选项2', value: 2},
        {name: '选项3', value: 3},
      ]
    }
  },
  {
    typeName: 'n-checkbox-group',
    label: '多选框组:',
    prop: 'checkbox-group',
    showRequireMark: true,
    attrs: {
      labelKey:'name',
      valueKey:'value',
      options: [
        {name: '选项1', value: 1},
        {name: '选项2', value: 2},
        {name: '选项3', value: 3},
      ]
    }
  },
  {
    typeName: 'n-switch',
    label: '开关：',
    prop: 'switch',
    attrs: {
      'checked-value': 1,
      'unchecked-value': 0
    }
  }
]