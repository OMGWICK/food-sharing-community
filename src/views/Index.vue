<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\Index.vue
 * @LastEditTime: 2021-03-03 09:26:48
-->
<template>
  <div>
    <div class="carousel">
      <Carousel />
    </div>
    <div class="home-search">
      <HomeSearch />
    </div>
    <div class="content">
      <IndexArticle />
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel';
import HomeSearch from '@/components/HomeSearch';
import IndexArticle from '@/components/IndexArticle';

export default {
  name: 'Index',
  data() {
    return {};
  },
  components: {
    Carousel,
    HomeSearch,
    IndexArticle,
  },
};
</script>

<style lang="less" scoped>
.carousel {
  padding-top: 60px;
}
</style>
