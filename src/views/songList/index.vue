<template>
  <div class="content">
    <div class="top">
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="main">
      <div class="main_top">
        <div class="playAll">
          <span class="iconfont icon-bofang1-copy"></span> 播放全部
          <span class="snum">(共{{ songsNum }}首)</span>
        </div>
      </div>
      <ul>
        <li
          class="main-container"
          v-for="(item, index) in songs"
          :key="item.id"
        >
          <p class="playing" v-if="item.id == songId"></p>
          <p class="order" v-else>{{ index + 1 }}</p>
          <div class="songwrap" @click="play(item.id)">
            <div class="songName">{{ item.name }}</div>
            <div class="singer">
              <span class="exclusive">独家</span>
              <span class="sq">SQ</span>
              <div class="singername">{{ item.ar[0].name }}</div>
            </div>
          </div>
          <span class="iconfont icon-sangedian"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      title: "标题",
      songsNum: "",
      trackIds: [],
      songlistID: "",
      songs: [],
      uid: "",
      songId: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    //返回按钮点击方法
    onClickLeft() {
      this.$router.go(-1);
    },
    //请求歌单列表
    async getSongList() {
      Toast.loading({  //显示加载中提示
        message: "努力加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
      if (this.$route.query.title == "每日歌曲推荐") {
        //如果是每日推荐列表，直接请求歌曲数据
        var songsRes = await this.$http.get("/recommend/songs?uid=" + this.uid);
        Toast.clear(); //关闭提示
        this.songs = songsRes.data.dailySongs;
      } else {
        //如果是歌单详情列表，先请求歌曲id，再通过id请求歌曲名称
        var playListRes = await this.$http.get(
          "/playlist/detail?id=" + this.songlistID
        );

        this.trackIds = playListRes.playlist.trackIds;
        var str = "";
        for (let i = 0; i < this.trackIds.length; i++) {
          if (i == 0) {
            str += this.trackIds[0].id;
          } else {
            str += "," + this.trackIds[i].id;
          }
        }
        songsRes = await this.$http.get("/song/detail?ids=" + str);
        Toast.clear(); //关闭提示
        this.songs = songsRes.songs;
      }
      this.songsNum = this.songs.length;
    },
    // 播放歌曲
    play(id) {
      this.songId = id;
      this.$store.dispatch("setSongid", id);
    },
  },
  created() {
    this.songId = this.$store.getters.songid;
    this.uid = this.$store.getters.uid;
    this.title = this.$route.query.title;
    if (this.$route.query.id) {
      this.songlistID = this.$route.query.id;
    }
    this.getSongList();
  },
  mounted() {},
};
</script>
<style scoped>
.van-nav-bar {
  height: 1rem;
}
.van-nav-bar .van-icon {
  color: #303030 !important;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.main_top {
  margin-top: 1rem;
  height: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.playAll {
  font-size: 0.32rem;
  color: #323232;
  display: flex;
  align-items: center;
}
.playAll .iconfont {
  color: #2a2a2a;
  font-size: 0.43rem;
  margin: 0 0.3rem;
}
.snum {
  font-size: 0.3rem;
  color: #a3a3a3 !important ;
}
.addCollections {
  width: 1.98rem;
  height: 0.84rem;
  display: flex;
  align-items: center;
  margin-right: 0.1rem;
  background-color: #fe3a3b;
  color: #ffffff;
  border-radius: 0.38rem;
  justify-content: center;
}
.addCollections .add {
  margin-right: 0.1rem;
}
.main-container {
  height: 1.2rem;
  display: flex;
  align-items: center;
}
.main-container .iconfont {
  margin-right: 0.35rem;
  font-size: 0.5rem;
  color: #b3b3b3;
}
.main-container p {
  width: 1.16rem;
  font-size: 0.36rem;
  color: #939393;
  text-align: center;
}
.songwrap {
  flex: 1;
}
.singer {
  display: flex;
}
.songName {
  font-size: 0.3rem;
  color: #2f2f2f;
  margin-bottom: 0.15rem;
  width: 3.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.exclusive {
  font-size: 0.12rem;
  color: #ff4d4e;
  border: solid 1px #ff4d4e;
  line-height: 1;
  padding: 1px;
}
.sq {
  font-size: 0.12rem;
  color: #e66c3e;
  border: solid 1px #e66c3e;
  line-height: 1;
  padding: 1px;
  margin-left: 0.05rem;
  margin-right: 0.08rem;
}
.singername {
  font-size: 0.2rem;
  color: #8a8a8a;
}
.playing {
  height: 0.96rem;
  background: url(../../assets/playing.gif) no-repeat center;
}
</style>