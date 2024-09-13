<template>
  <div class="login_wrap">
    <n-form ref="formRef" :model="model" label-placement="left">
      <n-form-item path="username" label="账号">
        <n-input v-model:value="model.username" @keydown.enter.prevent placeholder="请输入"/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="model.password"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入"
        />
      </n-form-item>
      <n-form-item path="password">
        <n-button type="primary" @click="jump" style="width: 100%;">跳转</n-button> 
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup>
  import { useRouter,withBase  } from 'vitepress'
  import { ref } from 'vue'
  const router = useRouter()
  const emit = defineEmits(['loginCallback'])
  const formRef = ref(null)
  const model = {
    username: '',
    password: ''
  }
  const jump = () => {emit('loginCallback')}
</script>
<style lang="scss">
  .login_wrap{
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .n-form-item-label__text{
      color: #fff;
    }
  }
</style>
