<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-05 16:20:21
 * @FilePath: \food-sharing-community\src\views\Chat.vue
 * @LastEditTime: 2021-03-05 19:33:36
-->
<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\Index.vue
 * @LastEditTime: 2021-03-04 22:06:23
-->
<template>
  <div>
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
    <div id="wrapper">
      <div id="messagewindow">
        <span id="loading" v-show="!this.lists">
          无内容......
        </span>
        <p v-for="(item, index) in lists" :key="index + 3">
          {{ item.content }}
        </p>
      </div>
      <div id="chatform" style="margin-top:20px">
        <div>
          <label for="content">内容：</label>
          <input
            type="text"
            v-model="content"
            name="content"
            id="content"
            size="20"
          />
          <input
            style="margin-left:20px"
            @click="chatSend"
            type="button"
            value="发送"
            id="btnSend"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chatData, chatSend } from '@/api/chat';
export default {
  name: 'Chat',
  data() {
    return {
      content: '',
      timestamp: 0,
      lists: '',
    };
  },
  mounted() {
    this.beginChat();
  },
  methods: {
    beginChat() {
      this.freshMessage();
    },
    freshMessage() {
      chatData({ timestamp: this.timestamp }).then((res) => {
        this.addMessage(res);
      });
    },
    chatSend() {
      chatSend({ content: this.content }).then((res) => {
        this.freshMessage();
        this.content = '';
      });
    },
    addMessage(msg) {
      this.timestamp = msg.timestamp;
      // console.log(msg);
      this.lists = msg.messages;
    },
  },
  components: {},
};
</script>

<style lang="less">
#particles-js {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -10;
}
#messagewindow {
  height: 500px;
  border: 1px solid;
  padding: 5px;
  overflow: auto;
}

#wrapper {
  margin: auto;
  width: 300px;
  padding-top: 120px;
  min-height: 700px;
}
</style>
