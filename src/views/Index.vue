<template>
<div>
    <div class="carousel">
      <Carousel />
    </div>
    <div class="home-search">
      <HomeSearch />
    </div>
</div>
</template>

<script>
import Carousel from "@/components/Carousel";
import HomeSearch from "@/components/HomeSearch";

export default {
  name: "Index",
  data() {
    return {
      activeIndex: "/"
    };
  },
  components: {
    Carousel,
    HomeSearch,
  }
};
</script>

<style lang="less" scoped>

.carousel{
  padding-top: 60px;
}
</style>