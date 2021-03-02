<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\User.vue
 * @LastEditTime: 2021-03-02 19:34:30
-->
<template>
  <div class="mine">
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
            <el-menu-item index="/personal">
              <i class="el-icon-menu"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="/dymine">
              <i class="el-icon-knife-fork"></i>
              <span slot="title">我发布的</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <div class="page">
          <router-view></router-view>
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
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
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
