<template>
  <div class="last">
    <footer>
      <ul class="list-unstyled">
        <li class="list-inline-item">
          <a href="javascript:void">美食分享</a>
        </li>
        <li class="list-inline-item">
          <a href="javascript:void" style="padding-left:10px;">加入我们</a>
        </li>
      </ul>
      <p>
        ©2020 HiChat Entertainment. All Rights Reserved. HiChat, hichat.com, and the HiChat logo are
        trademarks of HiChat Entertainment in the CN. and/or other countries.
      </p>
      <p>Gourmet Share</p>
      <p>
        川网文（2016）0067-067号
        <a href="javascript:void">蜀ICP备2021002429号-1</a> | 增值电信业务经营许可证: B2-20100039
      </p>
      <p>
        <a href="javascript:void">
          <img src="http://cdn.hommk.com/pcgame/images/gameRFID.png?1485326505" alt />
        </a>
      </p>
      <p style="padding-bottom: 4px;">
        <img src="http://ubicdn.com/beian.png" />川公网安备 31010402002119号
      </p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
footer {
  /* height: 171px;; */
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.15);
  // background-color: #fff;
  padding: 0;
  p {
    margin: 0;
  }
}
.list-unstyled {
  padding-top: 16px;
  list-style: none;
  display: flex;
  justify-content: center;
}

.last {
  position: relative;
  background-color: #faf5f0;
  text-align: center;
  color: #9d9d9d;
  font-size: 14px;
  padding-top: 20px;
  margin-top: 20px;
}
footer:before {
  content: "";
  position: absolute;
  left: 0;
  top: -3%;
  display: block;
  height: 3rem;
  width: 100%;
  background: var(--clr-sourdough);
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 70 500 60' preserveAspectRatio='none'%3E%3Cpath fill='%23faf5f0' d='M0 0h500v500H0z'/%3E%3Cpath d='M0 100c150 100 350-100 500 0V0H0z' fill='%23fff'/%3E%3C/svg%3E");
  background-size: 100% 100%;
}

@media screen and (max-width: 860px) {
  footer:before {
    width: 860px;
  }
}

.last li a {
  color: #353535;
  text-decoration: none;
  padding-right: 10px;
}

.last li:first-child::after {
  content: "/";
}

.last p a {
  color: #9d9d9d;
  text-decoration: none;
}

.last p > img {
  margin-right: 10px;
}

.dropdown-button {
  background-color: transparent;
  border: none;
  color: #fff;
}

.dropdown-button:focus {
  outline: none;
}
</style>