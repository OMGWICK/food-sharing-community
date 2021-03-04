<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-03 09:24:36
 * @FilePath: \food-sharing-community\src\components\indexArticle\index.vue
 * @LastEditTime: 2021-03-04 22:56:48
-->
<template>
  <div class="article">
    <div class="center">
      <div class="article-new">
        <div class="title1">
          最新分享<span @click="$router.push('/share')">查看全部</span>
        </div>
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
                <span class="name" @click.stop="toUser(item.writer._id)">{{
                  item.writer.name
                }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="article-good">
        <div class="title1">
          推荐分享<span @click="$router.push('/share')">查看全部</span>
        </div>
        <div class="personal">
          <el-card
            v-for="(item, index) in goodlists"
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
        </div>
      </div>

      <div class="article-good">
        <div class="title1">
          经年累月<span @click="$router.push('/share')">查看全部</span>
        </div>
        <div class="personal">
          <el-card
            v-for="(item, index) in oldList"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articleLists, goodArticleList, oldLists } from '@/api/article';
export default {
  data() {
    return {
      lists: '',
      goodlists: '',
      oldList: '',
    };
  },
  created() {
    this.getNewArt();
    this.goodArticleList();
    this.oldArticleLists();
  },
  methods: {
    getNewArt() {
      articleLists({ pageSize: 8 }).then((res) => {
        this.lists = res.data;
      });
    },
    goodArticleList() {
      goodArticleList().then((res) => {
        this.goodlists = res.docs;
      });
    },
    oldArticleLists() {
      oldLists().then((res) => {
        this.oldList = res.docs;
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
};
</script>

<style lang="less" scoped>
.article {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
}
.center {
  width: 865px;
  font-weight: 600;
  margin: auto;
}
// .article-new {
//   height: 350px;
//   width: 865px;
//   font-weight: 600;
//   margin: auto;
// }
.article-good {
  margin-top: 50px;
}
.title1 {
  font-size: 20px;
  font-family: TT Commons, Arial, Helvetica Neue, sans-serif;
  span {
    font-size: 12px;
    font-weight: 500;
    margin-left: 20px;
    color: #33319f;
    cursor: pointer;
  }
  span:hover {
    text-decoration-line: underline;
  }
}

.personal {
  background-color: #f5f7fa;
  display: flex;
  // justify-content: flex-start;
  overflow-x: auto;
  padding-bottom: 20px;
  min-height: 340px;
  .el-card {
    flex-shrink: 0;
    padding: 0px;
    // position: relative;
    width: 216px;
    cursor: pointer;
    margin-left: 15px;
    margin-top: 15px;
    height: 320px;
    border-radius: 10px;
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
