# 表单相关操作

<div class="form_action_wrap">
  <GridForm
    ref="gridFormRef"
    :columns="columns"
    :rules="rules"
    :showSuffix="true"
    @getValue="getValue"
    @resetValue="resetValue"
  />
</div>

## 1.内置按钮（查询，重置）

getValue事件，获取表单数据
resetValue 事件，重置表单数据
<div>
  <p v-for="(item,index) in Object.keys(model)" :key="index">{{item}}:{{model[item]}}</p>
</div>

```js
  <GridForm
    :columns="columns"
    @getValue="getValue"
    @resetValue="resetValue"
  />
  const model = reactive({})
  const getValue = (data) => {
    for (const key in data) {
      model[key] = data[key]
    }
  }
  const resetValue = () => {
    for (const key in model) {
      model[key] = null
    }
  }
```

## 2.自定义获取数据按钮

GridForm组件设置属性 showSuffix 为 false，隐藏内置按钮

通过组件ref 调用 getData 方法获取表单数据，resetHandle 方法重置表单

<n-flex>
  <n-button attr-type="button" type="primary" @click="getHandle">
    提交
  </n-button>
  <n-button attr-type="button" type="info" @click="resetHandle">
    重置
  </n-button>
</n-flex>

<div>
  <p v-for="(item,index) in Object.keys(customModel)" :key="index">{{item}}:{{customModel[item]}}</p>
</div>

```js
  <GridForm
    ref="gridFormRef"
    :columns="columns"
    :showSuffix="false"
  />
  // 自定义按钮
  <n-flex>
    <n-button attr-type="button" type="primary" @click="getHandle">
      提交
    </n-button>
    <n-button attr-type="button" type="info" @click="resetHandle">
      重置
    </n-button>
  </n-flex>
  const gridFormRef = ref(null)
  const customModel = reactive({})
  // 获取数据
  const getHandle = async () => {
    const data = await gridFormRef.value?.getHandle()
    if(data){
      for (const key in data) {
        customModel[key] = data[key]
      }
    }
  }
  // 重置
  const resetHandle = () => {
    gridFormRef.value?.resetHandle()
    for (const key in customModel) {
      customModel[key] = null
    }
  }
```
## 3.各组件值变化后触发的回调事件

<n-alert title="注解" type="info">
  官方文档存在的回调事件，在配置项中 attrs 中绑定回调事件，methods 中绑定回调事件均可以
</n-alert>

### 1..配置项中 attrs 中绑定回调事件

```js
  以下拉选择器为例
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
    }
  }
```

### 2.配置项中 methods 中绑定回调事件

```js
  以下拉选择器为例
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
      ]
    },
    methods:{
      updateValue:(val)=>{
        console.log('下拉选择器methods值变化回调',val)
      }
    }
  }
```


<script setup>
  import { reactive,ref } from 'vue'
  import list from './columns.js'
  const gridFormRef = ref(null)
  const columns = reactive(list)
  const rules = reactive({})
  const model = reactive({})
  const getValue = (data) => {
    for (const key in data) {
      model[key] = data[key]
    }
  }
  const resetValue = () => {
    for (const key in model) {
      model[key] = null
    }
  }
  const customModel = reactive({})
  const getHandle = async () => {
    const data = await gridFormRef.value?.getHandle()
    if(data){
      for (const key in data) {
        customModel[key] = data[key]
      }
    }
  }
  const resetHandle = () => {
    gridFormRef.value?.resetHandle()
    for (const key in customModel) {
      customModel[key] = null
    }
  }
</script>

<style lang="scss">
  .form_action_wrap{
    width: 100%;
    margin: 20px auto;
    .n-form-item-label__text{
      color: #fff;
    }
    .n-button--default-type{
      background-color: #fff;
      border-color: #009688;
    }
    .n-radio__label,.n-checkbox__label{
      color: #fff;
    }
    .n-switch{
      justify-content: flex-start !important;
    }
  }
</style>