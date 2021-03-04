<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-03 14:14:33
 * @FilePath: \food-sharing-community\src\views\Detail.vue
 * @LastEditTime: 2021-03-04 22:57:22
-->
<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\Index.vue
 * @LastEditTime: 2021-03-03 09:26:48
-->
<template>
  <div class="detail">
    <vue-particles
      id="particles-js"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
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
    ></vue-particles>
    <div class="center">
      <div class="header">首页 / {{ lists.title }}</div>
      <div class="coverImg">
        <img :src="lists.coverImgUrl" alt="" />
      </div>
      <div class="main-content">
        <span
          class="collection el-icon-collection-tag"
          @click="postCollection(lists._id)"
          >{{ collection == 0 ? '收藏' : '已收藏' }}</span
        >
        <div class="title">
          {{ lists.title }}
        </div>
        <div class="user">
          <el-avatar :size="100" :src="userInfo.userUrl">
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </el-avatar>
          <div class="user-right">
            <div class="time">
              {{ dateFormat('YYYY-mm-dd HH:MM', lists.created) }}
            </div>
            <div class="name" @click="toUser(userInfo._id)">
              {{ userInfo.name }}
            </div>
          </div>
        </div>
        <div class="art-content" v-html="lists.content"></div>
      </div>
      <div class="commit">
        <h2>评论</h2>
        <el-avatar :size="50" :src="url">
          <img
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </el-avatar>
        <el-input v-model="input" placeholder="请输入你想评论的内容"></el-input>
        <el-button
          style="margin-left:20px"
          type="primary"
          @click.native="addComment"
          >发送</el-button
        >
        <div
          class="commit-card"
          v-for="(item, index) in commentContents"
          :key="index + 2"
        >
          <div class="commit-card-left">
            <el-avatar :size="50" :src="item.writer.userUrl">
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </el-avatar>
          </div>
          <div class="commit-card-right">
            <div
              class="commit-card-right-name"
              @click="toUser(item.writer._id)"
            >
              {{ item.writer.name }}
            </div>
            <div class="commit-card-right-time">
              {{ dateFormat('YYYY-mm-dd HH:MM', item.created) }}
            </div>
            <div class="commit-card-right-content">
              {{ item.commentContent }}
            </div>
            <span
              class="del"
              @click="delComment(item._id)"
              v-if="item.writer._id === userId"
              >删除</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  detailArticleList,
  postCollection,
  statusCollection,
  deleteCollection,
} from '@/api/article';
import { userInfo } from '@/api/user';
import { addComment, getComment, delComment } from '@/api/comment';

export default {
  name: 'Detail',
  data() {
    return {
      collection: 0,
      lists: '',
      url: '',
      input: '',
      commentContents: '',
      commentUser: '',
      userId: '',
    };
  },
  computed: {
    userInfo() {
      return this.lists.writer || '';
    },
  },
  mounted() {
    let id = this.$route.query.id;
    this.detailArticleList(id);
    this.getHeadimg();
    this.getComment();
    this.statusCollection(id);
  },
  methods: {
    //收藏
    postCollection(id) {
      if (this.collection == 1) {
        this.deleteCollection(id);
      } else {
        postCollection({ dynamic_id: id })
          .then((res) => {
            this.collection = 1;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //取消收藏
    deleteCollection(id) {
      deleteCollection({ dynamic_id: id })
        .then((res) => {
          this.collection = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取收藏状态
    statusCollection(id) {
      statusCollection({ dynamic_id: id })
        .then((res) => {
          this.collection = parseInt(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detailArticleList(query) {
      detailArticleList({ id: query })
        .then((res) => {
          this.lists = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateFormat(fmt, date) {
      let ret = '';
      date = new Date(date);
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          );
        }
      }
      return fmt;
    },

    getHeadimg() {
      userInfo()
        .then((res) => {
          this.url = res.userUrl;
          this.userId = res._id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //发表评论
    addComment() {
      if (this.input.length === 0) {
        this.$message.error({
          message: '内容不能为空',
          offset: 80,
        });
        return;
      }
      let query = {
        dynamic_id: this.lists._id,
        commentContent: this.input,
      };
      addComment(query)
        .then((res) => {
          this.$message.success({
            message: '发表成功',
            offset: 80,
          });
          this.getComment();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取评论
    getComment() {
      getComment({ id: this.$route.query.id })
        .then((res) => {
          // console.log(res);
          this.commentContents = res || '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除评论
    delComment(id) {
      delComment({ id })
        .then((res) => {
          this.$message.success({
            message: '删除成功',
            offset: 80,
          });
          this.getComment();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //去用户个人中心
    toUser(id) {
      this.$router.push({ path: 'personal', query: { id } });
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
#particles-js {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -100;
}

.detail {
  padding-top: 80px;

  .center {
    width: 996px;
    margin: 0 auto;
    min-height: 640px;
  }

  .header {
    font-size: 14px;
  }
  .coverImg {
    border-radius: 15px;
    margin-top: 10px;
    background-color: #f5f7fa;
    text-align: center;
    padding-bottom: 10px;
  }
  img {
    // margin-top: 10px;
    border-radius: 10px;
  }

  .main-content {
    position: relative;
    padding-bottom: 20px;
    border-radius: 20px;
    margin-top: 10px;
    padding-top: 10px;
    background-color: #f2f3f5;
    padding-left: 25px;

    .collection {
      position: absolute;
      right: 20px;
      top: 20px;
      color: #7977c0;
      cursor: pointer;
    }
    .collection:hover {
      text-decoration-line: underline;
    }

    .title {
      font-size: 40px;
    }
    .user {
      margin-top: 25px;
    }
    .el-avatar {
      vertical-align: middle;
    }
    .user-right {
      display: inline-block;
      vertical-align: middle;
      margin-left: 30px;
      font-size: 20px;
      .time {
        margin-bottom: 18px;
      }
      .name {
        color: #7977c0;
      }
      .name:hover {
        text-decoration-line: underline;
        cursor: pointer;
      }
    }
    .art-content {
      margin-top: 30px;
    }
  }

  .commit {
    border-radius: 15px;
    margin-top: 10px;
    background-color: #f5f7fa;
    // text-align: center;
    padding: 15px 15px 15px 15px;

    .el-input {
      width: 500px;
      margin-left: 20px;
    }
    .el-avatar {
      vertical-align: middle;
    }
  }
  .commit-card {
    display: flex;
    padding-top: 10px;
    margin-top: 30px;
    border-top: 1px solid #e5e9ef;
    min-height: 120px;
    .commit-card-left {
      height: 100%;
    }
    .commit-card-right {
      position: relative;
      margin-left: 20px;
      .commit-card-right-name {
        line-height: 30px;
        color: #7977c0;
      }
      .commit-card-right-name:hover {
        text-decoration-line: underline;
        cursor: pointer;
      }
      .commit-card-right-content {
        padding-top: 15px;
        width: 850px;
        word-wrap: break-word;
      }
    }

    .del {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #7977c0;
      font-size: 12px;
      cursor: pointer;
    }
    .del:hover {
      text-decoration-line: underline;
    }
  }
}
</style>
