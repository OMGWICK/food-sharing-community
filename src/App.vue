<template>
  <div id="app">
    <transition leave-active-class="animated fadeOut" :duration="{ enter: 200, leave: 300 }">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>

</style>
