# GridForm 表单配置

<div class="form_md_wrap">
  <GridForm
    :columns="columns"
    :rules="rules"
    :showSuffix="false"
  />
</div>

<script setup>
  import { ref,reactive } from 'vue'
  const options = [
    {name: '选项1', value: 1},
    {name: '选项2', value: 2},
    {name: '选项3', value: 3},
    {name: '选项4', value: 4},
    {name: '选项5', value: 5}
  ]
  const columns = reactive([
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
      typeName: 'n-select',
			label: '下拉选择器:',
			prop: 'select-down',
			showRequireMark: true,
			attrs: {
				placeholder: '下拉选择器',
				'label-field': 'name',
				'value-field': 'value',
				options: options
			}
    }
  ])
  const rules = ref({})
</script>

<style lang="scss">
  .form_md_wrap{
    width: 100%;
    margin: 20px auto;
    .n-form-item-label__text{
      color: #fff;
    }
    .n-button--default-type{
      background-color: #fff;
      border-color: #009688;
    }
  }
</style>