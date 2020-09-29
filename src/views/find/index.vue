<template>
  <div class="content">
    <div id="find-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
          <img :src="item.pic" alt="">
        </van-swipe-item>
       
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Find",
  data() {
    return {
      bannerList: []
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.$http.get("/banner?type=1").then(res=>{
        // console.log(res);
        this.bannerList = res.banners;
      })
    },
  },
};
</script>

<style>
.my-swipe .van-swipe-item {
  height: 2.58rem;
}
.my-swipe img{
  height: 2.58rem;
  width: 6.83rem;
  border-radius: .1rem;
}
#find-banner {
  margin-top: 0.2rem;
  padding: 0 0.32rem;
}
</style>