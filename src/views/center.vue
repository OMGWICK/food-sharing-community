<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\center.vue
 * @LastEditTime: 2021-03-03 10:07:48
-->
<template>
  <div class="create-center">
    <div class="header">
      <el-page-header @back="goBack" content="创作中心"></el-page-header>
    </div>
    <div class="edit_container">
      <div style="display: none">
        <el-upload
          :http-request="uploadImg"
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
          multiple
          action="string"
        >
          <Button>点击上传</Button>
        </el-upload>
      </div>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @change="onEditorChange($event)"
      ></quill-editor>
      <span class="content-count" v-show="count">你已输入{{ count }}字</span>
    </div>
    <!-- <div v-html="str" class="ql-editor">{{str}}</div> -->
    <div class="bottom">
      <el-input
        :minlength="2"
        :maxlength="11"
        v-model="title"
        placeholder="请输入文章标题"
      ></el-input>
      <el-button @click="publish" type="primary" :round="true"
        >发表内容</el-button
      >
    </div>
    <div class="cover-upload">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="upload"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          id="user-img"
          v-if="coverImgUrl"
          :src="coverImgUrl"
          class="avatar"
          title="点击更改封面"
        />
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
          title="点击上传封面"
        ></i>
      </el-upload>
      <span>请设置文章封面图片</span>
    </div>
  </div>
</template>

<script>
import { addArticle, imgUpload, articleLists } from '@/api/article';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const toolbar = {
  container: [
    ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
    ['blockquote', 'code-block'], //引用，代码块
    [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
    [{ list: 'ordered' }, { list: 'bullet' }], //列表
    [{ script: 'sub' }, { script: 'super' }], // 上下标
    [{ indent: '-1' }, { indent: '+1' }], // 缩进
    [{ direction: 'rtl' }], // 文本方向
    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
    [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
    [{ font: [] }], //字体
    [{ align: [] }], //对齐方式
    ['clean'], //清除字体样式
    ['image', 'video'], //上传图片、上传视频
  ],
  handlers: {
    image: function(value) {
      if (value) {
        // 调用Element图片上传
        document.querySelector('.el-upload').click();
      } else {
        this.quill.format('image', false);
      }
    },
  },
};

export default {
  name: 'Center',
  data() {
    return {
      str: '',
      content: '',
      title: '',
      editorOption: {
        placeholder: '请在这里输入内容',
        modules: {
          toolbar,
          // handlers: {
          //   'image': function(value) {
          //     if (value) {
          //     }
          //   }
          // }
        },
      },
      coverImgUrl: '',
      count: '',
    };
  },
  methods: {
    onEditorChange(e) {
      // console.log(e)
      this.count = e.text.length - 1;
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      return str;
    },
    goBack() {
      this.$router.push({ path: '/' });
    },
    publish() {
      if (this.title.length < 2) {
        this.$message({
          showClose: true,
          message: '标题请输入2 - 24个字符',
          type: 'error',
          center: true,
          offset: 60,
        });
        return;
      }
      if (this.content.length === 0) {
        this.$message({
          showClose: true,
          message: '内容不能为空',
          type: 'error',
          center: true,
          offset: 60,
        });
        return;
      }
      if (this.coverImgUrl.length === 0) {
        this.$message({
          showClose: true,
          message: '请设置一个封面',
          type: 'error',
          center: true,
          offset: 60,
        });
        return;
      }
      let data = {
        title: this.title,
        content: this.content,
        coverImgUrl: this.coverImgUrl,
      };
      addArticle(data)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '发表成功！',
              offset: 60,
              type: 'success',
            });
            this.$router.push('/index');
          } else {
            this.$message.error('发表失败!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //上传封面图片
    handleAvatarSuccess(res, file) {
      this.coverImgUrl = URL.createObjectURL(file.row);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: '上传封面图片大小不能超过 2MB!',
          offset: 60,
          type: 'error',
        });
      }
      return isLt2M;
    },
    upload(f) {
      let formData = new FormData();
      formData.append('file', f.file);
      imgUpload(formData)
        .then((res) => {
          this.coverImgUrl = res.url;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //上传内容图片
    handleSuccess(res) {},
    uploadImg(f) {
      console.log('123');
      let formData = new FormData();
      formData.append('file', f.file);
      imgUpload(formData)
        .then((res) => {
          let quill = this.$refs.myQuillEditor.quill;
          // 如果上传成功
          if (res) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片，res为服务器返回的图片链接地址
            quill.insertEmbed(length, 'image', res.url);
            // 调整光标到最后
            quill.setSelection(length + 1);
          } else {
            // 提示信息，需引入Message
            this.$message.error('插入图片失败!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // mounted() {
  //   articleLists().then((res) => {
  //     let content = res.data[0].content; // 请求后台返回的内容字符串
  //     this.str = this.escapeStringHTML(content);
  //   });
  // },
  components: {
    quillEditor,
  },
};
</script>

<style lang="less" socped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.cover-upload {
  text-align: center;
  margin-top: 20px;
  span {
    font-size: 12px;
  }
}

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
.edit_container {
  position: relative;
  .content-count {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
  }
}
</style>
