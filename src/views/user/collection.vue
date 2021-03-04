<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-04 19:57:44
 * @FilePath: \food-sharing-community\src\views\user\collection.vue
 * @LastEditTime: 2021-03-04 22:58:23
-->
<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-02 15:40:52
 * @FilePath: \food-sharing-community\src\views\user\Dymine.vue
 * @LastEditTime: 2021-03-03 21:55:38
-->
<template>
  <div class="personal">
    <el-card
      v-for="(item, index) in lists"
      :body-style="{ padding: '0px' }"
      :key="index + 1"
      @click.native="toDetail(item._id)"
    >
      <div class="headImg">
        <img :src="item.coverImgUrl" class="image" />
      </div>
      <div class="foot">
        <span>{{ item.title }}</span>
        <div class="bottom clearfix">
          <div class="user">
            <el-avatar :size="20" :src="item.writer.userUrl">
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </el-avatar>
          </div>
          <span class="name">{{ item.writer.name }}</span>
        </div>
      </div>
    </el-card>
    <div class="pagination-block" v-if="realTotal > 9">
      <div class="block">
        <el-pagination
          background
          prev-text="上一页"
          next-text="下一页"
          @current-change="handleCurrentChange"
          :current-page="parseInt($route.query.page || 1)"
          :page-size="9"
          layout="total, prev, pager, next, jumper"
          :total="realTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollection } from '@/api/article';
export default {
  name: 'Collection',
  data() {
    return {
      lists: '',
      realTotal: 0,
    };
  },
  created() {
    this.getCollection({
      pageNumber: parseInt(this.$route.query.page || 1),
      userId: this.$route.query.id,
    });
  },
  // mounted() {
  // },
  methods: {
    getCollection(query) {
      getCollection(query)
        .then((res) => {
          this.lists = res.data;
          this.realTotal = parseInt(res.total);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //分页
    handleCurrentChange(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          userId: this.$route.query.id,
          page: val,
        },
      });
    },
    toDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id,
        },
      });
    },
  },
  watch: {
    '$route.query'(query) {
      // console.log(query);
      this.getCollection({
        pageNumber: parseInt(query.page || 1),
        userId: this.$route.query.id,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.personal {
  background-color: #f5f7fa;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 20px;
  min-height: 700px;
  .el-card {
    padding: 0px;
    // position: relative;
    width: 216px;
    cursor: pointer;
    margin-left: 42px;
    margin-top: 20px;
  }
  .headImg {
    width: 100%;
    height: 239px;
    overflow: hidden;
  }
  .image:hover {
    transform: scale(1.1, 1.1);
    transition: 1s;
  }
  .user {
    display: inline-block;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    margin-left: 6px;
    font-size: 14px;
    color: #7977c0;
  }
  .name:hover {
    text-decoration: #7977c0 underline;
  }
  .bottom {
    margin-top: 6px;
    position: static;
    display: block;
  }
  .foot {
    padding: 14px;
  }

  .pagination-block {
    margin-top: 20px;
    text-align: center;
    width: 100%;
  }
}
</style>
