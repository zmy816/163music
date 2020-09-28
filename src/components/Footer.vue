<template>
  <footer class="footer">
    <div class="footer_left">
      <img src alt="歌曲名" class="songImg" />
      <p class="songName">歌曲名</p>
    </div>
    <div class="playerComponents">
      <span class="iconfont icon-bofang1-copy playbtn" @click="flag=!flag" v-if="flag"></span>
      <span class="iconfont icon-bofang2 playbtn" @click="flag=!flag" v-else></span>
      <span class="iconfont icon-sanheng playlist"></span>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    //获取当前播放歌曲信息
    getPlayingSong() {
      
    }
  }
};
</script>

<style>
.footer {
  justify-content: space-between;
  align-items: center;
}
.footer_left {
  margin-left: 0.12rem;
  flex: 7;
  display: flex;
  align-items: center;
}
.songImg {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 50%;
  margin-right: 0.12rem;
}
.songName {
  font-size: 0.32rem;
  color: #181818;
  overflow: hidden;
}
.playerComponents {
  margin-right: 0.12rem;
  flex: 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.playbtn {
  font-size: 0.66rem;
  color: #363636;
}
.playlist {
  font-size: 0.56rem;
  color: #363636;
}
</style>