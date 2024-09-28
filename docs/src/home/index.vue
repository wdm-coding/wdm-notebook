<script setup>
import { useRouter,withBase,useData   } from 'vitepress'
const router = useRouter()
const data = useData()
console.log(data);

function  jumpHandle(path) {
  router.go(withBase(path)) 
}
</script>


<template>
  <div class='home_wrap'>
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" x-gap="40" responsive="screen">
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/vue/api')">
          <n-button type="primary">Vue</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/note/')">
          <n-button type="info">React</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/note/git')">
          <n-button type="error">git</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/ts/')">
          <n-button type="success">TS</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/note/jumpServer')">
          <n-button type="info">JumpServer部署</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/project')">
          <n-button type="error">项目</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/nestJs/')">
          <n-button type="primary">NestJs</n-button>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="grid_item" @click="jumpHandle('/pages/naiveUi/form')">
          <n-button type="primary">NaiveUi</n-button>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>


<style lang='scss'>
.home_wrap{
  width: 100%;
  .grid_item{
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
