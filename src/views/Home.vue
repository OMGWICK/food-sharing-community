<template>
  <div class="home">
    <div class="nav">
      <div class="nav-logo">
        <div class="gs-gs">Gourmet Share</div>
      </div>
      <div class="navbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="2">分享圈</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <el-menu-item index="/center">创作中心</el-menu-item>
        </el-menu>
      </div>
      <div class="nav-user">
        <i class="el-icon-search"></i>
        <div class="user">用户信息</div>
      </div>
    </div>
    <router-view></router-view>
    <!-- <div class="carousel">
      <Carousel />
    </div>
    <div class="home-search">
      <HomeSearch />
    </div> -->
    <footer>
      <PageFooter />
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Carousel from "@/components/Carousel";
// import HomeSearch from "@/components/HomeSearch";
import PageFooter from "@/components/PageFooter";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: "/"
    };
  },
  components: {
    // Carousel,
    // HomeSearch,
    PageFooter
  }
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  z-index: 9999;
  position: fixed;
  .nav-logo {
    flex: 1;
    .gs-gs {
      padding: 15px 0 0 35px;
      font: italic 50px Georgia, serif;
      font-size: 25px;
    }
  }

  .nav-user {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 18px 0;
    i {
      font-size: 20px;
      padding: 2px 10px;
    }
    .user {
      padding: 2px 10px;
      border-left: 1px solid #8e8e8e;
    }
  }
}

.carousel{
  padding-top: 60px;
}
.el-menu-item {
  font-size: 18px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 1px solid #212121;
  color: #303133;
}

@media screen and (min-width: 1672px) {
  .navbar {
    flex: 6;
  }
}

@media screen and (max-width: 1672px) {
  .navbar {
    flex: 4;
  }
}
@media screen and (max-width: 1259px) {
  .navbar {
    flex: 2;
  }
}
@media screen and (max-width: 860px) {
  .home {
    width: 860px;
  }
  .navbar {
    flex: 0 0 480px;
  }
  .nav-logo{
    flex: 0 0 217px !important;
  }
  .nav-user{
    flex: 0 0 130px !important;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
