<script setup>
  import DefaultTheme from 'vitepress/theme'
  const { Layout } = DefaultTheme
  import { removeItem } from '../utils/storage.js'
  function logout() {
    removeItem('token')
    window.location.reload()
  }
</script>


<template>
  <Layout class='custom_layout_wrap'>
    <template #nav-bar-content-after>
      <div class="logout_btn">
        <n-button type="primary" @click="logout">退出</n-button>
      </div>
    </template>
  </Layout>
</template>


<style lang='scss' scoped>
.custom_layout_wrap{
  .logout_btn{
    position: fixed;
    right: 20px;
  }
}
</style>
