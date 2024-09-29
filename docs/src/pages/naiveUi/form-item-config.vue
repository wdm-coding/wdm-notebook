<template>
  <div class="form_item_wrap">
    <GridForm
      ref="formRef"
      :columns="[$attrs.config]"
      :showSuffix="false"
    />
  </div>
</template>
<script setup>
  import { ref,reactive,onMounted } from 'vue'
  const emit = defineEmits(['created'])
  const formRef = ref(null)
  onMounted(() => {
    emit('created',formRef.value)
  })
</script>

<style lang="scss">
  .form_item_wrap{
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