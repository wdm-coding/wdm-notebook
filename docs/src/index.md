---
layout: false
---
<Login @loginCallback="loginCallback"/>
<script setup>
  import { useRouter,withBase  } from 'vitepress'
  const router = useRouter()
  function loginCallback(user) {
    router.go(withBase('/pages/Vue3/api'))
  }
</script>
