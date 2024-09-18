<template>
  <div class="login_wrap">
    <n-form v-if="!isLogin" ref="formRef" :model="model" label-placement="top" :rules="rules">
      <n-form-item path="username" label="账号">
        <n-input v-model:value="model.username" @keydown.enter.prevent placeholder="请输入"/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="model.password"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入"
          show-password-on="click"
        />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="jump" style="width: 100%;" :loading="loading">登录</n-button> 
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup>
  import { useRouter,withBase  } from 'vitepress'
  import { ref,reactive,onBeforeMount } from 'vue'
  import { createDiscreteApi } from "naive-ui";
  import { setItem,getItem } from '../../utils/storage.js'
  console.log('useLogin');
  const router = useRouter()
  const isLogin = ref(!!getItem('token'))
  if(isLogin.value){
    router.go(withBase('/home/'))
  }
  const { message } = createDiscreteApi(
    ["message"],
  );
  const loading = ref(false)
  const emit = defineEmits(['loginCallback'])
  const formRef = ref(null)
  const model = reactive({
    username: 'wdmcoding',
    password: '17693198620@0620'
  })
  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
    ],
    password: [
      { required: true, message: '请输入密码' },
    ]
  }
  const jump = () => {
    formRef.value.validate().then(() => {
      loading.value = true
      setTimeout(() => {
        if(model.username === 'wdmcoding' && model.password === '17693198620@0620'){
          setItem('token', 'admin')
          message.success('登录成功')
          loading.value = false
          router.go(withBase('/home/'))
        }else{
          message.error('账号密码错误')
          loading.value = false
        }
      }, 1000);
    })
  }
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
