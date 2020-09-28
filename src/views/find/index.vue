<template>
  <div class="content">
    <div id="find-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
          <img :src="item.pic" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div id="find-app">
      <ul>
        <li>
          <p><span class="iconfont icon-data"></span></p>
          <i>每日推荐</i>
        </li>
        <li>
          <p><span class="iconfont icon-FM"></span></p>
          <i>私人FM</i>
        </li>
        <li>
          <p><span class="iconfont icon-gedan1"></span></p>
          <i>歌单</i>
        </li>
        <li>
          <p><span class="iconfont icon-paihangbang"></span></p>
          <i>排行榜</i>
        </li>
        <li>
          <p><span class="iconfont icon-diantai"></span></p>
          <i>电台</i>
        </li>
      </ul>
    </div>
    <div id="find-playlist">
      <div id="playlist-tit">
        <h2>宝藏歌单，值得聆听</h2>
        <p>查看更多</p>
      </div>
      <ul>
        <li v-for="item in playList" :key="item.id">
          <div class="playImg">
            <img :src="item.picUrl" alt="" />
            <div>
              <p>
                <span class="iconfont icon-sanjiaoxing1"></span>
                <i>{{ item.playcount | subS }}万</i>
              </p>
            </div>
          </div>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Find",
  data() {
    return {
      uid:"",
      bannerList: [],
      playList: [],
    };
  },
  filters: {
    subS(e) {
      e = e.toString();
      console.log(typeof e);
      var l = e.toString().length - 4;
      return e.substring(0, l);
    },
  },
  created() {
    this.getBanner();
    this.getHotPlayList();
  },
  methods: {
    getBanner() {
      this.$http.get("/banner?type=1").then((res) => {
        this.bannerList = res.banners;
      });
    },
    getHotPlayList() {
      this.$http.get("/recommend/resource?userid="+this.uid).then((res) => {
        console.log(res);
        this.playList = res.recommend;
      });
    },
  },
};
</script>

<style>
.my-swipe .van-swipe-item {
  height: 2.58rem;
  border-radius: 0.1rem;
}
.my-swipe img {
  height: 2.58rem;
  width: 6.83rem;
  border-radius: 0.1rem;
}
#find-banner {
  margin-top: 0.2rem;
  padding: 0 0.32rem;
}
#find-app {
  margin-top: 0.3rem;
}
#find-app ul {
  display: flex;
}
#find-app ul > li {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#find-app > ul > li p {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background-color: #ff3f32;
  text-align: center;
  line-height: 0.9rem;
  color: #fff;
}
#find-app li .iconfont {
  font-size: 0.45rem;
}
#find-app li i {
  margin-top: 0.16rem;
  font-size: 0.23rem;
  color: #585858;
}
#find-playlist {
  margin-top: 0.6rem;
  padding-left: 0.32rem;
}
#find-playlist > ul {
  margin-top: 0.3rem;
  display: flex;
  overflow-x: auto;
}
#find-playlist > ul > li {
  width: 2.07rem;
  margin-right: 0.2rem;
  position: relative;
}
#playlist-tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.32rem;
}
#playlist-tit > h2 {
  font-size: 0.34rem;
  line-height: 1;
  color: #222;
  font-weight: 700;
}
#playlist-tit > p {
  height: .48rem;
  width: 1.38rem;
  border: 1px solid #ececec;
  border-radius: 0.25rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.22rem;
  color: #737373;
}
.playImg {
  position: relative;
  height: 2.07rem;
  width: 2.07rem;
}
.playImg > img {
  width: 2.07rem;
  height: 2.07rem;
  border-radius: 0.1rem;
}
.playImg > div {
  height: 2.07rem;
  width: 2.07rem;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.2rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}
.playImg > div > p {
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
}

#find-playlist li > p {
  line-height: 0.36rem;
  font-size: 0.24rem;
  margin-top: 0.1rem;
  color: #404040;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>