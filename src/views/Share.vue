<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-03 12:08:59
 * @FilePath: \food-sharing-community\src\views\Share.vue
 * @LastEditTime: 2021-03-04 22:52:08
-->
<template>
  <div class="share-article">
    <vue-particles
      id="particles-js"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="90"
      shapeType="circle"
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
    <div class="share-center">
      <h1>全部</h1>
      <div class="personal">
        <div class="nothing" v-if="lists.length === 0">
          <p>我们感到很抱歉！</p>
          <p>抱歉，我们无法找到相应搜索结果。</p>
          <p>
            <el-button type="primary" round @click="$router.push('/index')"
              >返回首页</el-button
            >
          </p>
        </div>
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
              <span class="name" @click.stop="toUser(item.writer._id)">{{
                item.writer.name
              }}</span>
            </div>
          </div>
        </el-card>
        <div class="pagination-block" v-if="realTotal > 24">
          <div class="block">
            <el-pagination
              background
              prev-text="上一页"
              next-text="下一页"
              @current-change="handleCurrentChange"
              :current-page="parseInt($route.query.page || 1)"
              :page-size="24"
              layout="total, prev, pager, next, jumper"
              :total="realTotal"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articleLists } from '@/api/article';
export default {
  name: 'ShareArticle',
  data() {
    return {
      lists: '',
      realTotal: '',
    };
  },
  created() {
    this.articleLists({
      searchWord: this.$route.query.searchWord || '',
      pageNumber: parseInt(this.$route.query.page || 1),
    });
  },
  methods: {
    articleLists(query) {
      articleLists(query)
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
    toUser(id) {
      this.$router.push({ path: 'personal', query: { id } });
    },
  },
  watch: {
    '$route.query'(query) {
      // console.log(query);
      this.articleLists({
        searchWord: query.searchWord || '',
        pageNumber: parseInt(query.page || 1),
      });
    },
  },
};
</script>

<style lang="less" scoped>
#particles-js {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -100;
}

.nothing {
  width: 500px;
  text-align: center;
  margin: 100px auto;
  font-size: 30px;
}
.share-article {
  padding-top: 80px;
}
.share-center {
  width: 1000px;
  margin: 0 auto;

  h1 {
    font-weight: 500;
  }

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
      margin-left: 26px;
      margin-top: 15px;
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
}

@media screen and (max-width: 1000px) {
  .share-center {
    width: 758px;
  }
}
</style>
