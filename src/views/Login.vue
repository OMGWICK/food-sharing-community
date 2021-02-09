<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">

        <!-- <transition enter-active-class="animated bounceIn" 
        leave-active-class="animated bounceOut"
        :duration="200">
        </transition> -->

      </div>
      <video ref="videos" :style="fixStyle" loop autoplay muted class="fillWidth" v-on:canplay="canplay">
        <source :src="bgvideo[bgindex]" type="video/mp4"/>
        浏览器不支持 video 标签，建议升级浏览器!
        <!-- <source src="../assets/video/bg1.mp4" type="video/webm"/>
        浏览器不支持 video 标签，建议升级浏览器。 -->
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <!-- 无video图片 -->
        <!-- <img :style="fixStyle" src="../assets/img/pexels-ella-olsson-1640777.jpg" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
      return {
        vedioCanPlay: false,
        fixStyle: '',
        bgvideo:[require('../assets/video/bg0.mp4')],
        bgindex:0,
        flag: false,
      }
    },
    methods: {
      canplay() {
        this.vedioCanPlay = true;
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
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
};
</script>

<style lang="less" scoped>
@import '../styles/login.less'; //引入背景css
</style>