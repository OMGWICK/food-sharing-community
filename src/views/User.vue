<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\User.vue
 * @LastEditTime: 2021-03-04 22:58:07
-->
<template>
  <div class="mine">
    <vue-particles
      id="particles-js"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="star"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="mine-center">
      <el-row class="tac">
        <el-col :span="12">
          <!-- <h5>默认颜色</h5> -->
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-menu-item
              index="/personal"
              :route="{ path: '/personal', query: { id: $route.query.id } }"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item
              index="/dymine"
              :route="{
                path: '/dymine',
                query: { id: $route.query.id },
              }"
            >
              <i class="el-icon-knife-fork"></i>
              <span slot="title">我发布的</span>
            </el-menu-item>
            <el-menu-item
              index="/treasure"
              :route="{
                path: '/treasure',
                query: { id: $route.query.id },
              }"
            >
              <i class="el-icon-document"></i>
              <span slot="title">我收藏的</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <div class="page">
          <vue-page-transition name="fade-in-right">
            <router-view></router-view>
          </vue-page-transition>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  mounted() {
    // console.log(this.$route.query.id);
  },
  components: {},
};
</script>

<style lang="less" scoped>
#particles-js {
  width: 100%;
  height: 100vh;
  position: absolute;
}
.mine {
  padding-top: 100px;
  width: 100%;
  .mine-center {
    width: 970px;
    margin: auto;
    min-height: 700px;
  }
  .el-col-12 {
    width: 15%;
  }
  .page {
    display: inline-block;
    width: 85%;
  }
}
</style>
