<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <transition
          enter-active-class="animated bounceIn"
          :duration="{ enter: 500 }"
        >
        <div class="login" v-if="loginDialog">
          <div class="gs-head">
            <div>
              <img src="../assets/img/2d6f01ce410c475cb5736efed230b8f9.gif" alt />
            </div>
            <div class="gs-gs">Gourmet Share</div>
            <div class="gs-mine">登陆我的账号</div>
          </div>
          <div class="gs-content">
            <el-form
              :model="loginfrom"
              :rules="rules"
              status-icon
              ref="loginfrom"
              label-width="100px"
              class="demo-loginfrom"
            >
              <el-form-item label="账号" prop="username">
                <el-input v-model="loginfrom.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginfrom.password"></el-input>
              </el-form-item>

              <el-form-item class="gs-foot">
                <el-button :loading="loading" type="primary" @click="submitForm('loginfrom')">登陆</el-button>
                <el-button @click="resetForm('loginfrom')">重置</el-button>
                <div class="gs-register">
                  还没有账号？
                  <a href="javascript:void(0)" @click="changeLoginDialog">立即注册</a>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        </transition>
        <transition
          enter-active-class="animated bounceIn"
          :duration="{ enter: 500 }"
        >
          <Register v-if="!loginDialog" />
        </transition>
        <!-- <transition enter-active-class="animated bounceIn" 
        leave-active-class="animated bounceOut"
        :duration="{ enter: 200, leave: 300 }">
        </transition>-->
      </div>
      <video
        ref="videos"
        :style="fixStyle"
        loop
        autoplay
        muted
        class="fillWidth"
        v-on:canplay="canplay"
      >
        <source :src="bgvideo[bgindex]" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器!
        <!-- <source src="../assets/video/bg1.mp4" type="video/webm"/>
        浏览器不支持 video 标签，建议升级浏览器。-->
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <!-- 无video图片 -->
        <!-- <img :style="fixStyle" src="../assets/img/pexels-ella-olsson-1640777.jpg" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
import Register from "@/components/Register";
import { getToken } from '@/utils/jsToken'
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loading:false,
      vedioCanPlay: false,
      fixStyle: "",
      bgvideo: [require("../assets/video/bg0.mp4")],
      bgindex: 0,
      flag: false,
      loginfrom: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["loginDialog"])
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.login(this.loginfrom).then(()=>{
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
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //播放end时
    // ended(){
    //   this.$nextTick(function(){
    //   this.$refs.videos.load()
    //   this.bgindex++
    //   if(this.bgindex >= this.bgvideo.length){
    //     this.bgindex = 0 ;
    //   }
    //   })
    // }
    ...mapMutations("user", ["changeLoginDialog"]),
    ...mapActions("user",["login"])
  },
  mounted: function() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial"
        };
      }
    };
    window.onresize();
  },
  components: {
    Register
  }
};
</script>

<style lang="less" scoped>
@import "../styles/login.less"; //引入背景css

.login {
  overflow: auto;
  margin: 5% auto;
  width: 450px;
  height: 550px;
  background-color: #ffffff;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  border-radius: 10px;

  .gs-head {
    // display: inline-block;
    // width: 100%;
    // height: 500px;
    text-align: center;
    height: 200px;

    img {
      margin-top: 30px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    .gs-gs {
      margin-top: 10px;
      font: italic 2em Georgia, serif;
    }
    .gs-mine {
      font-size: 20px;
      font-weight: 500;
      margin-top: 20px;
    }
  }

  .gs-content {
    margin-top: 10px;

    .el-input {
      width: 280px;
    }
  }

  .gs-foot {
    margin-top: 40px;
    padding-left: 10px;
    .el-button {
      margin-left: 30px;
    }
    .gs-register {
      margin-top: 40px;
      padding-left: 36px;
      font-size: 16px;
    }
  }
}

@media screen and (max-width: 749px) {
  .login {
    height: 450px;
  }
}
</style>

<style lang="less">
.el-form-item__content {
  margin-left: 0;
}
</style>