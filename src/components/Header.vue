<template>
  <header class="header">
    <router-link tag="span" class="iconfont icon-sanheng" to="/"></router-link>
    <router-link tag="span" to="/find">发现</router-link>
    <router-link tag="span" to="/mine">我的</router-link>
    <router-link tag="span" to="/search" class="iconfont icon-sousuo"></router-link>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
span.active{
    color: #fff;
    font-size: 0.3rem;
}
</style>