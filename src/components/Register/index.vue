<template>
  <div class="register">
    <div class="gs-head">
      <div>
        <img src="../../assets/img/hands.svg" />
      </div>
      <div class="gs-gs">欢迎来到美食分享！</div>
      <div class="gs-mine">创建一个账号</div>
    </div>
    <div class="gs-content">
      <el-form
        :model="loginfrom"
        :rules="rules"
        status-icon
        ref="loginfrom"
        label-width="100px"
        class="demo-loginfrom"
        :label-position="labelPosition"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginfrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginfrom.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="loginfrom.checkpass"></el-input>
        </el-form-item>

        <el-form-item class="gs-foot">
          <el-button :loading="loading" type="primary" @click="submitForm('loginfrom')">注册</el-button>
          <el-button @click="resetForm('loginfrom')">重置</el-button>
          <div class="gs-register">
            已有账号？
            <a href="javascript:void(0)" @click="$store.commit('user/changeLoginDialog')">立即登陆</a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/jsToken'

export default {
  name: "Register",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginfrom.password) {
        callback(new Error("两次输入的密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      labelPosition: "top",
      loginfrom: {
        username: "",
        password: "",
        checkpass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        checkpass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/register',this.loginfrom).then(()=>{
            if(getToken()){
            this.$router.push({path: "/"})
            this.loading = false
            }else{
            this.loading = false
            }
          }).catch(()=>{
            this.loading = false
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
.register {
  overflow: auto;
  margin: 5% auto;
  width: 450px;
  height: 600px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  .gs-head {
    text-align: center;
    height: 130px;

    img {
      margin-top: 15px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    .gs-gs {
      margin-top: 10px;
      font-size: 1.25rem;
      font-family: TT Commons, Arial, Helvetica Neue, sans-serif;
      font-weight: 500;
    }
    .gs-mine {
      font-size: 18px;
      font-weight: 500;
      margin-top: 20px;
    }
  }

  .gs-content {
    // margin-top: 10px;
    padding-left: 65px;
    .el-input {
      width: 325px;
    }
  }

  .gs-foot {
    margin-top: 20px;
    padding-left: 55px;
    .el-button {
      margin-left: 30px;
    }
    .gs-register {
      margin-top: 15px;
      padding-left: 40px;
      font-size: 16px;
    }
  }
}
@media screen and (max-width: 749px) {
  .register {
    height: 450px;
  }
}
</style>
