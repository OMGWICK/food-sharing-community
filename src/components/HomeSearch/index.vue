<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\components\HomeSearch\index.vue
 * @LastEditTime: 2021-03-03 13:43:13
-->
<template>
  <div class="share-search">
    <div class="search-title">搜索美食</div>
    <div class="search-input">
      <el-input
        placeholder="搜索其他用户分享的美食标题"
        prefix-icon="el-icon-search"
        v-model="inputValue"
        @keyup.enter.native="search"
      ></el-input>
      <div class="search-all"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: '/share',
        query: {
          searchWord: this.inputValue,
        },
      });
    },
  },
};
</script>

<style lang="less" socped>
.share-search {
  height: 280px;
  background-color: #faf5f0;
  .search-title {
    font-size: 38px;
    line-height: 150px;
    text-align: center;
    font-weight: 500;
  }
  .search-input {
    text-align: center;
    .el-input {
      height: 50px;
      width: 780px;
    }
    .el-input__icon {
      height: 0px;
    }
    .search-all {
      font-size: 14px;
      padding-top: 10px;
      width: 780px;
      margin: auto;
      text-align: end;
      font-weight: 700;
    }
  }
}
</style>
