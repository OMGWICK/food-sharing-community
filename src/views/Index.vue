<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\Index.vue
 * @LastEditTime: 2021-03-02 19:30:58
-->
<template>
  <div>
    <div class="carousel">
      <Carousel />
    </div>
    <div class="home-search">
      <HomeSearch />
    </div>
    <div class=""></div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel';
import HomeSearch from '@/components/HomeSearch';

export default {
  name: 'Index',
  data() {
    return {};
  },
  components: {
    Carousel,
    HomeSearch,
  },
};
</script>

<style lang="less" scoped>
.carousel {
  padding-top: 60px;
}
</style>
