<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-02 12:56:11
 * @FilePath: \food-sharing-community\src\views\user\Personal.vue
 * @LastEditTime: 2021-03-03 22:15:24
-->
<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\User.vue
 * @LastEditTime: 2021-03-02 12:48:57
-->
<template>
  <div class="personal">
    <div>
      <div id="user-photo">
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
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            title="点击更改头像"
          />
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            title="点击更改头像"
          ></i>
        </el-upload>
      </div>
      <div id="user-name">
        <h1 class="user-name">{{ name }}</h1>
        <span id="user-sex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 1024 1024"
            width="20"
            height="20"
            t="1591059409153"
            p-id="785"
            version="1.1"
            data-spm-anchor-id="a313x.7781069.0.i4"
          >
            <path
              class="selected"
              fill="#1296db"
              d="M 810 202.91 H 581.61 v 18.19 h 195 L 593.45 404.27 a 238 238 0 0 0 -149.28 -52.6 c -131.93 0 -239.24 107.33 -239.24 239.26 s 107.31 239.26 239.24 239.26 s 239.25 -107.34 239.25 -239.26 c 0 -68.93 -29.47 -131 -76.27 -174.65 l 185.36 -185.37 v 200.38 h 18.19 V 202.91 Z m -144.75 388 C 665.24 712.84 566.08 812 444.17 812 s -221.06 -99.16 -221.06 -221.07 s 99.16 -221.08 221.06 -221.08 S 665.24 469 665.24 590.93 Z"
              p-id="786"
              data-spm-anchor-id="a313x.7781069.0.i5"
            />
          </svg>
        </span>
      </div>
      <div id="user-introduce">{{ introduce }}</div>
    </div>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称:" prop="formName">
          <el-input
            placeholder="请输入用户名称"
            v-model="ruleForm.formName"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="formRealName">
          <el-input
            placeholder="请输入真实姓名"
            v-model="ruleForm.formRealName"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人介绍:" prop="formIntroduce">
          <el-input
            placeholder="请介绍下自己吧"
            v-model="ruleForm.formIntroduce"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮件地址:" prop="formEmail">
          <el-input
            placeholder="请输入邮件地址"
            v-model="ruleForm.formEmail"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="formCall">
          <el-input
            placeholder="请输入联系电话"
            v-model="ruleForm.formCall"
            :disabled="show"
          ></el-input>
        </el-form-item>

        <el-form-item label="生日:" prop="formDay">
          <el-input
            type="date"
            v-model="ruleForm.formDay"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客地址:" prop="formUrl">
          <el-input
            placeholder="请输入博客地址"
            v-model="ruleForm.formUrl"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址:" prop="formAddress">
          <el-input
            placeholder="请输入详细地址"
            v-model="ruleForm.formAddress"
            :disabled="show"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮政编码:" prop="formPostCode">
          <el-input
            placeholder="请输入邮政编码"
            v-model="ruleForm.formPostCode"
            :disabled="show"
          ></el-input>
        </el-form-item>
        <el-form-item label="国 家:" prop="formCountry">
          <el-select
            v-model="ruleForm.formCountry"
            placeholder="请选择国家"
            :disabled="show"
          >
            <el-option label="美国" value="美国"></el-option>
            <el-option label="中国" value="中国"></el-option>
            <el-option label="日本" value="日本"></el-option>
            <el-option label="英国" value="英国"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" prop="formSex">
          <el-radio-group v-model="ruleForm.formSex" :disabled="show">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性取向:" prop="formSexx">
          <el-radio-group v-model="ruleForm.formSexx" :disabled="show">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="gs-foot">
          <el-button
            :loading="loading"
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="
              $route.query.id === id ||
                Object.keys($route.query).length === 0 ||
                $route.query.id === undefined
            "
            >保存个人资料</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { imgUpload, userUrl } from '@/api/article';
import { userInfo, postUserinfo } from '@/api/user';

export default {
  name: 'Personal',
  data() {
    return {
      id: '',
      loading: false,
      imageUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      name: '',
      introduce: '',
      ruleForm: {
        introduce: '',
        formName: '',
        formRealName: '',
        formEmail: '',
        formCall: '',
        formDay: '',
        formUrl: '',
        formSex: '',
        formSexx: '',
        formIntroduce: '',
        formAddress: '',
        formPostCode: '',
        formCountry: '',
      },
      rules: {
        formName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    show() {
      return (
        this.$route.query.id !== this.id &&
        Object.keys(this.$route.query).length !== 0 &&
        this.$route.query.id !== undefined
      );
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    //头像
    upload(f) {
      let formData = new FormData();
      formData.append('file', f.file);
      imgUpload(formData)
        .then((res) => {
          this.imageUrl = res.url;
          userUrl({ userUrl: this.imageUrl }).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '修改头像成功!',
                offset: 80,
                type: 'success',
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message({
          message: '上传头像图片大小不能超过 1MB!',
          offset: 80,
          type: 'error',
        });
      }
      return isLt1M;
    },

    //修改个人信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          postUserinfo(this.ruleForm)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success({
                  offset: 80,
                  message: '个人资料修改成功',
                });
                this.loading = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    userInfo(query) {
      userInfo(query)
        .then((res) => {
          this.ruleForm.formName = res.name;
          this.ruleForm.formRealName = res.realname;
          this.ruleForm.formEmail = res.email;
          this.ruleForm.formCall = res.call;
          this.ruleForm.formDay = res.day;
          this.ruleForm.formUrl = res.url;
          this.ruleForm.formSex = res.sex;
          this.ruleForm.formSexx = res.sexx;
          this.ruleForm.formIntroduce = res.introduce;
          this.ruleForm.formAddress = res.address;
          this.ruleForm.formPostCode = res.postcode;
          this.ruleForm.formCountry = res.country;
          this.ruleForm.name = res.name;
          this.ruleForm.introduce = res.introduce;
          this.imageUrl = res.userUrl;
          this.introduce = res.introduce;
          this.name = res.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMineInfo() {
      userInfo()
        .then((res) => {
          this.id = res._id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.$route);
    const userId = this.$route.query.id;
    this.userInfo({ userId });
    this.getMineInfo();
  },
  components: {},
};
</script>

<style lang="less" scoped>
.el-select {
  width: 305px;
}
.personal {
  background-color: #f5f7fa;
  padding-top: 10px;
  text-align: center;
}

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
  width: 100px;
  height: 100px;
  line-height: 100px !important;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}

#user-name {
  height: 25px;
}

#user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-name {
  padding-left: 20px;
  line-height: 25px;
  font-size: 22px;
  font-weight: 600;
  display: inline;
  text-align: center;
  color: #303133;
}

#user-introduce {
  // width: 920px;
  height: 20px;
  margin-top: 4px;
  text-align: center;
  color: #303133;
  line-height: 18px;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  font-size: 12px;
}

.form {
  width: 405px;
  margin: 20px 0 0 170px;
  padding-bottom: 20px;
}
</style>
