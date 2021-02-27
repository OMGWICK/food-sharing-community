<template>
  <div class="create-center">
    <div class="header">
      <el-page-header @back="goBack" content="创作中心"></el-page-header>
    </div>
    <div class="edit_container">
      <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        <span class="title_r" v-show="count">{{count}}/10</span>

    </div>
    <div v-html="str" class="ql-editor">{{str}}</div>
    <div class="bottom">
      <el-input :minlength="2" :maxlength="24" v-model="title" placeholder="请输入文章标题"></el-input>
      <el-button @click="publish" type="primary" :round="true">发表内容</el-button>
    </div>
  </div>
</template>

<script>
import { addArticle } from "@/api/article";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const toolbar = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  [{ list: "ordered" }, { list: "bullet" }], //列表
  [{ script: "sub" }, { script: "super" }], // 上下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ["image", "video"] //上传图片、上传视频
];

export default {
  name: "Center",
  data() {
    return {
      str: "",
      content: "",
      title: "",
      editorOption: {
        placeholder: "请在这里输入内容",
        modules: {
          toolbar
        }
      },
      coverImgUrl: "",
      count: "1"
    };
  },
  methods: {
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    publish() {
      if(this.title.length<2){
        this.$message({
        showClose: true,
        message: "标题请输入2 - 24个字符",
        type: "error",
        center: true,
        offset: 60
      });
      return
      }
      if(this.content.length===0){
        this.$message({
        showClose: true,
        message: "内容不能为空",
        type: "error",
        center: true,
        offset: 60
      });
       return
      }
      let data = {
        title: this.title,
        content: this.content,
        coverImgUrl: this.coverImgUrl
      };
      addArticle(data)
        .then(res => {})
        .catch(err => {});
    }
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
  },
  components: {
    quillEditor
  }
};
</script>

<style lang="less" socped>
.header {
  width: 100%;
  height: 60px;
  background-color: #f3f3f3;
  position: relative;
  .el-page-header {
    line-height: 60px;
    padding-left: 30px;
  }
}
.bottom {
  display: flex;
  top: 10px;
  right: 20px;
  position: absolute;
  .el-input {
    width: 34vw;
    margin-right: 10px;
    position: relative;
  }
}
.ql-container {
  height: 600px;
  // background-color: #F3F3F3;
}
.create-center {
  position: relative;
}
</style>