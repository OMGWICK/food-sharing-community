<template>
  <div id="app">
    <vue-page-transition name="zoom">
      <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>

</style>
