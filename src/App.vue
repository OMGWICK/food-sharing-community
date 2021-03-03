<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\App.vue
 * @LastEditTime: 2021-03-03 22:05:18
-->
<template>
  <div id="app">
    <vue-page-transition name="zoom">
      <router-view />
    </vue-page-transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
::-webkit-scrollbar {
  width: 8px;
  height: 12px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  display: block;
  min-height: 12px;
  min-width: 8px;
  border-radius: 6px;
  background-color: rgb(217, 217, 217);
}

::-webkit-scrollbar-thumb:hover {
  display: block;
  min-height: 12px;
  min-width: 8px;
  border-radius: 6px;
  background-color: rgb(159, 159, 159);
}
</style>
