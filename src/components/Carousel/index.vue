<template>
  <div>
    <el-carousel :interval="6000" indicator-position="outside">
      <el-carousel-item class="carousel-item" v-for="(item, index) in carouselItem" :key="index+'a'">
        <img :src="item.imgUrl" class="carousel-img" alt />
        <div class="carousel-content">
          <div class="carousel-content-t">
            <p class="carousel1-p1">{{item.title}}</p>
            <p class="carousel1-p2">{{item.content}}</p>
            <p class="carousel1-p3">{{item.content2}}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselItem: [
        {
          imgUrl: require("../../assets/carousel_img/pexels-nerfee-mirandilla-3186654.jpg"),
          title: "纽西兰牛肉",
          content: "新西兰天然牛肉！分外香甜",
          content2: "低脂低热量深受人们喜爱"
        },
        {
          imgUrl: require("../../assets/carousel_img/pexels-christel-jensen-628776.jpg"),
          title: "爱尔兰小龙虾",
          content: "从海洋到陆地！绝妙的美味",
          content2: "简单做法，贯穿喉咙的真实体验"
        },
        {
          imgUrl: require("../../assets/carousel_img/pexels-lumn-1410236.jpg"),
          title: "东南亚特色饭",
          content: "一日三餐均衡搭配！秀色可餐",
          content2: "既能填饱肚子，又能满足食欲"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.carousel-img {
  width: 55%;
  min-height: 314px;
}
.carousel-content {
  width: 45%;
}
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-content-t {
  text-align: center;
  .carousel1-p1 {
    color: #646260;
    font-weight: 600;
  }
  .carousel1-p2 {
    color: #212121;
    font-weight: 500;
    font-size: 55px;
  }
  .carousel1-p3 {
    color: #212121;
    font-weight: 500;
    font-size: 18px;
  }
}
</style>

<style>
.el-carousel__container {
  height: 37vw !important;
}

@media screen and (max-width: 880px) {
  .el-carousel__container {
    height: 312px !important;
  }
}
</style>