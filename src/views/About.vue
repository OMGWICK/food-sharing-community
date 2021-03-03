<!--
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\src\views\About.vue
 * @LastEditTime: 2021-03-03 22:18:20
-->
<template>
  <div class="about">
    <div class="mine">
      <h2>关于我们</h2>
      <p>
        致力于打造顶尖的免费的美食社区分享平台，让各地的人们分享自己的美食！
      </p>
      <p>
        <img
          src="https://food-1300857246.cos.ap-chengdu.myqcloud.com/aboutimg/pexels-ella-olsson-1640777ss.jpg"
          alt=""
          style="width:500px;"
        />
        <img
          src="https://food-1300857246.cos.ap-chengdu.myqcloud.com/aboutimg/pexels-adonyi-g%C3%A1bor-1414651.jpg"
          alt=""
          style="width:400px;"
        />
        <img
          src="https://food-1300857246.cos.ap-chengdu.myqcloud.com/aboutimg/pexels-ella-olsson-3026808.jpg"
          alt=""
          style="width:800px;"
        />
        <img
          src="https://food-1300857246.cos.ap-chengdu.myqcloud.com/aboutimg/1.jpg"
          alt
        />
        <img
          src="https://food-1300857246.cos.ap-chengdu.myqcloud.com/aboutimg/2.png"
          alt
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="less" scoped>
.about {
  padding-top: 60px;
  // text-align: center;
  .mine {
    width: 900px;
    margin: auto;
    font-size: 18px;
  }
}
</style>
