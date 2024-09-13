---
layout: false
---


<div class="login_wrap">
  <div class="login_box">
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
      <n-button type="primary" @click="jump">跳转</n-button> 
    </n-form>
  </div>
</div>

<script setup>
  import { useRouter  } from 'vitepress'
  import { ref } from 'vue'
  const router = useRouter()
  console.log(router)
  const formRef = ref(null)
  const model = {
    username: null,
    password: ''
  }
  const jump = () => {
    router.go('/home')
  }
</script>
<style lang="scss">
  .login_wrap{
    width: 100vw;
    height: 100vh;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .login_box{
      width: 300px;
    }
  }
</style>