<template>
  <div class="share-search">
    <div class="search-title">搜索美食</div>
    <div class="search-input">
      <el-input placeholder="搜索其他用户分享的美食" prefix-icon="el-icon-search" v-model="inputValue"></el-input>
        <div class="search-all">
          <span>高级搜索 ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            inputValue:'',
        }
    }
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
    .el-input__icon{
        height: 0px;
    }
    .search-all{
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