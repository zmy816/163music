<template>
  <footer class="footer">
    <aplayer repeat="repeat-one" shullfe="false" v-if="music.title&&music.artist&&music.src&&music.pic" :music="{title:`${music.title}`,artist:`${music.artist}`,src:`${music.src}`,pic:`${music.pic}`}"/>
  </footer>
</template>
<script>
import aplayer from "vue-aplayer";

export default {
  components: {
    aplayer
  },
  data() {
    return {
      ids: "523250334",
      music: { title: "", artist: "", src: "", pic: "" }
    };
  },
  methods: {
    // 获取当前播放歌曲信息
    getPlayingSong() {
      this.$http.get("song/detail?ids=" + this.ids).then(res => {
        this.music.title = res.songs[0].name;
        this.music.pic = res.songs[0].al.picUrl;
        this.music.artist = res.songs[0].ar[0].name;
        // console.log(res);
      });
    },
    //获取当前播放歌曲url
    getSongUrl() {
      this.$http.get("song/url?id=" + this.ids).then(res => {
        this.music.src = res.data[0].url;
        // console.log(res);
      });
    }
  },
  created() {
    this.getPlayingSong();
    this.getSongUrl();
  },
  computed: {
    // 未完成
    id(){
      return this.$store.getters.songid;
    }
  }
};
</script>

<style>
.aplayer {
  width: 100%;
  height: 100%;
  margin: 0 !important;
}
.aplayer-body {
  width: 100%;
  height: 100%;
  justify-content: space-around !important;
  align-items: center !important;
}
.aplayer-body audio {
  width: 100%;
  height: 100%;
}
.aplayer-pic {
  width: 0.86rem !important;
  height: 0.86rem !important;
  margin: 0 0 0 0.12rem;
}
/* .aplayer-pic{
  margin-left: 12rem;
} */
.aplayer-info {
  padding: 0 !important;
  flex-direction: row !important;
  height: 100% !important;
}
.aplayer-music {
  display: flex;
  flex-direction: column !important;
  justify-content: space-around;
  padding-left: 0.2rem;
}
.aplayer-title {
  margin-top: 0.1rem;
  font-size: 0.28rem !important;
}
.aplayer-author {
  margin-bottom: 0.1rem;
  font-size: 0.2rem !important;
}
.aplayer-bar-wrap {
  width: 1.2rem;
}
.aplayer-controller {
  margin-right: 0.12rem;
}
.aplayer-icon-mode {
  width: 0.28rem !important;
  height: 0.28rem !important;
}
.aplayer-time-inner {
  font-size: 0.24rem;
}
</style>