<template>
  <div class="content">
    <div class="personalInformation">
      <img
        class="head_portrait"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2389998747,3300817372&fm=26&gp=0.jpg"
        alt
      />
      <p class="title">立即登录</p>
      <span class="iconfont icon-right"></span>
    </div>
    <div class="applicationList">
      <ul>
        <li>
          <span class="iconfont icon-wodeguanzhu"></span>
          <p>我的关注</p>
        </li>
        <li>
          <span class="iconfont icon-xingzhuang60kaobei2"></span>
          <p>收藏和赞</p>
        </li>
        <li>
          <span class="iconfont icon-diantai"></span>
          <p>我的电台</p>
        </li>
        <li>
          <span class="iconfont icon-zuijinbofang-xuanting"></span>
          <p>最近播放</p>
        </li>
        <li>
          <span class="iconfont icon-yigoumai"></span>
          <p>已购</p>
        </li>
        <li>
          <span id="musicapp">+</span>
          <p>音乐应用</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.content {
  background-color: #f8f8f8;
}
.personalInformation {
  width: 6.84rem;
  height: 2.1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.head_portrait {
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 50%;
  margin: 0 0.34rem 0 0.26rem;
}
.title {
  font-size: 0.34rem;
  font-weight: 600;
  margin-right: 0.15rem;
}
.icon-right {
  font-size: 0.36rem;
  font-weight: 600;
}
.applicationList {
  width: 6.84rem;
  min-height: 3rem;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 0.2rem;
}
.applicationList ul {
  display: flex;
  margin-left: 0.2rem;
  flex-wrap: wrap;
  align-items: center;
}
.applicationList ul li {
  width: 25%;
  height: 1.65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.applicationList .iconfont {
  font-size: 0.55rem;
  color: #ff4a3c;
}
#musicapp {
  width: 0.58rem;
  height: 0.58rem;
  font-size: 0.48rem;
  color: #c2c2c2;
  background-color: #f5f5f5;
  border-radius: 50%;
  text-align: center;
  line-height: 0.58rem;
}
</style>