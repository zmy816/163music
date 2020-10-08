<template>
  <div class="content">
    <div id="find-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.bannerId" @click="playMusic(item.targetId)">
          <img :src="item.pic" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div id="find-app">
      <ul>
        <li @click="goSongList">
          <p>
            <span class="iconfont icon-data"></span>
          </p>
          <i>每日推荐</i>
        </li>
        <li>
          <p>
            <span class="iconfont icon-FM"></span>
          </p>
          <i>私人FM</i>
        </li>
        <li @click="goPlayList">
          <p>
            <span class="iconfont icon-gedan1"></span>
          </p>
          <i>歌单</i>
        </li>
        <li>
          <p>
            <span class="iconfont icon-paihangbang"></span>
          </p>
          <i>排行榜</i>
        </li>
        <li>
          <p>
            <span class="iconfont icon-diantai"></span>
          </p>
          <i>电台</i>
        </li>
      </ul>
    </div>
    <div id="find-playlist">
      <div id="playlist-tit">
        <h2>宝藏歌单，值得聆听</h2>
        <p @click="$router.push('/playlist')">查看更多</p>
      </div>
      <ul>
        <li
          v-for="item in playList"
          :key="item.id"
          :data-id="item.id"
          @click="toSonglist(item.id,item.name)"
        >
          <div class="playImg">
            <img :src="item.picUrl" alt />
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
    <div id="find-songs">
      <div id="songs-tit">
        <h2>新歌速递</h2>
        <p>
          <span class="iconfont icon-sanjiaoxing1"></span>
          <i>播放全部</i>
        </p>
      </div>
      <van-swipe class="my-swipe" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="(items,index) in newSongs" :key="index">
          <ul>
            <li v-for="item in items" :key="item.id" @click="playMusic(item.id)">
              <img :src="item.picUrl" alt />
              <div>
                <i class="sname">{{ item.name }}</i>
                <i class="gname">- {{ item.song.artists[0].name }}</i>
              </div>
              <span class="playing" v-if="musicId == item.id"></span>
              <span class="pause" v-else></span>
            </li>
          </ul>
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
      // uid: "",
      bannerList: [],
      playList: [],
      newSongs: [],
      musicId: "",
    };
  },
  filters: {
    subS(e) {
      e = e.toString();
      var l = e.toString().length - 4;
      return e.substring(0, l);
    }
  },
  created() {
    this.getBanner();
    this.getHotPlayList();
    this.getSongs();
  },
  computed: {
    uid() {
      return this.$store.getters.uid;
    }
  },
  methods: {
    // 获取轮播图
    getBanner() {
      this.$http.get("/banner?type=1").then(res => {
        this.bannerList = res.banners;
      });
    },
    // 获取每日推荐歌单
    getHotPlayList() {
      this.$http.get("/recommend/resource?uid=" + this.uid).then(res => {
        this.playList = res.recommend;
      });
    },
    // 新歌速递
    getSongs() {
      this.$http.get("/personalized/newsong").then(res => {
        var list = res.result;
        for (var i = 0; i < list.length; i += 3) {
          var songs = [];
          if (i + 3 > list.length) {
            songs = list.slice(i, list.length);
          } else {
            songs = list.slice(i, i + 3);
          }
          this.newSongs.push(songs);
        }
      });
    },
    // 播放音乐
    playMusic(id) {
      if(id != 0){
        this.musicId = id;
        this.$store.dispatch("setSongid", id);
      }
      
    },
    //跳转到歌曲列表页
    toSonglist(key, name) {
      this.$router.push("/songlist?id=" + key + "&title=" + name);
    },
    // 跳转每日推荐歌曲列表页
    goSongList(){
      this.$router.push("/songlist?title=每日歌曲推荐");
    },
    // 跳转到歌单广场
    goPlayList(){
      this.$router.push("/playlist");
    }
  }
};
</script>

<style>
#find-banner .my-swipe .van-swipe-item {
  height: 2.58rem;
  border-radius: 0.1rem;
}
#find-banner .my-swipe img {
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
  height: 0.48rem;
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

#find-songs {
  margin-top: 0.6rem;
  padding-left: 0.32rem;
}
#find-songs > .my-swipe {
  margin-top: 0.3rem;
}
/* #find-songs .my-swipe .van-swipe-item {
  
   
  } */
#find-songs .van-swipe-item {
  width: 6.6rem;
}
#find-songs li {
  display: flex;
  margin-bottom: 0.2rem;
  align-items: center;
  margin-right: 0.5rem;
}
#find-songs li > img {
  width: 1.14rem;
  height: 1.14rem;
  border-radius: 0.1rem;
}
#find-songs li > div {
  margin-left: 0.2rem;
  width: 4.2rem;
}
#find-songs li > div > .sname {
  font-size: 0.3rem;
  color: #333;
}
#find-songs li > div > .gname {
  font-size: 0.2rem;
  color: #666;
}
#find-songs li > span {
  margin-left: 0.3rem;
  width: 0.53rem;
  height: 0.53rem;
  /* border: 1px solid #cecece; */
  border-radius: 50%;
  background-size: 0.53rem 0.53rem;
}
#find-songs li > span.playing {
  background-image: url(../../assets/play.png);
}
#find-songs li > span.pause {
  background-image: url(../../assets/pause.png);
}
#songs-tit {
  display: flex;
  align-items: center;
  padding-right: 0.32rem;
  justify-content: space-between;
}
#songs-tit h2 {
  font-size: 0.33rem;
  color: #333;
  font-weight: 900;
}
#songs-tit .icon-sanjiaoxing1 {
  font-size: 0.19rem;
}
#songs-tit p {
  height: 0.48rem;
  width: 1.38rem;
  line-height: 0.48rem;
  text-align: center;
  border: 1px solid #ececec;
  border-radius: 0.25rem;
}
#songs-tit p > i {
  font-size: 0.22rem;
  color: #646464;
}
</style>