<template>
  <footer class="footer">
    <aplayer repeat="repeat-one"  shullfe="false" v-if="music.title&&music.artist&&music.pic&&music.src" :music="{title:`${music.title}`,artist:`${music.artist}`,src:`${music.src}`,pic:`${music.pic}`}" ref="player" @canplay="play"/>
  </footer>
</template>
<script>
import aplayer from "vue-aplayer";
import { Toast } from "vant";
export default {
  components: {
    aplayer
  },
  data() {
    return {
      music: { title: "", artist: "", src: "", pic: "" },
    };
  },
  methods: {
    // 初始化
    init(){
      // 获取歌曲信息
      this.$http.get("song/detail?ids=" + this.id).then(res => {
        this.music.title = res.songs[0].name;
        this.music.pic = res.songs[0].al.picUrl;
        this.music.artist = res.songs[0].ar[0].name;
      });
      // 获取歌曲url
      this.$http.get("song/url?id=" + this.id).then(res => {
        this.music.src = res.data[0].url;
        if(!res.data[0].url){
          Toast("此歌曲需要付费！");
          this.music.src = "111"
        }
      });
      
    },
    // 歌曲就绪时播放
    play(){
      if(this.music.src){
        this.$refs.player.play();
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    // 第一次加载时不播放
    if(this.$refs.player){
      this.$refs.player.pause();
    }
  },

  computed: {
    id(){
      return this.$store.getters.songid;
    },
  },
  watch: {
    // 监听歌曲id的改变，当歌曲id改变时重新获取歌曲信息
    id: {
      handler: async function(){
        this.init();
      }
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