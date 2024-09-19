<script setup>
  function jumpHandle(link) {
    window.open(link, '_blank')

  }
</script>


<template>
  <div class='nav_logo_wrap' @click="jumpHandle($attrs.link)">
    <img :src="$attrs.logo" style="width: 30px;height: 30px;">
  </div>
</template>


<style lang='scss'>
  .nav_logo_wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 10px;
  }
</style>
