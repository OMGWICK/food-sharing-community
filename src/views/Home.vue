<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\Home.vue
 * @LastEditTime: 2021-03-05 16:22:42
-->
<template>
  <div class="home">
    <div class="nav">
      <div class="nav-logo">
        <div class="gs-gs">Gourmet Share</div>
      </div>
      <div class="navbar">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/share">分享圈</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <el-menu-item index="/center">创作中心</el-menu-item>
        </el-menu>
      </div>
      <div class="nav-user">
        <a href="javascript:void(0)" @click="$router.push('/chat')"
          ><i class="el-icon-chat-line-round"></i
        ></a>
        <a href="#search"><i class="el-icon-search"></i></a>
        <div class="user" @click="toMine">
          <el-avatar :size="20" :src="circleUrl" @error="errorHandler">
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </el-avatar>
        </div>
        <span class="name" @click="toMine">{{ name }}</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-setting" title="设置"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <vue-page-transition name="fade-in-down">
      <router-view></router-view>
    </vue-page-transition>
    <footer>
      <PageFooter />
    </footer>
  </div>
</template>

<script>
import PageFooter from '@/components/PageFooter';
import { userInfo } from '@/api/user';

export default {
  name: 'Home',
  data() {
    return {
      activeIndex: this.$route.path,
      circleUrl: '',
      name: '',
    };
  },
  mounted() {
    userInfo().then((res) => {
      this.name = res.name;
      this.circleUrl = res.userUrl || '';
    });
  },
  methods: {
    errorHandler() {
      return true;
    },
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.go(0);
    },
    toMine() {
      this.$router.push('/mine');
    },
  },
  components: {
    PageFooter,
  },
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
      cursor: pointer;
      padding: 2px 10px;
      border-left: 1px solid #8e8e8e;
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}

.carousel {
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
    flex: 0 0 400px;
  }
  .nav-logo {
    flex: 0 0 217px !important;
  }
  .nav-user {
    flex: 0 0 200px !important;
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

.name {
  padding: 4px 0;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  color: #8e8e8e;
  cursor: pointer;
}
</style>
