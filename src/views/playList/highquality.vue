<template>
  <div class="listWrap">
     <van-list
      v-model="loading"
      :finished="finished"
      offset="0"
      loading-text="努力加载中..."
      finished-text="没有更多了..."
      @load="getplayList"
    >
      <van-cell v-for="item in playList" :key="item.id" @click="goSongLists(item.name, item.id)">
        <div class="imgBox">
          <img :src="item.coverImgUrl" alt="" />
          <p>
            <span class="iconfont icon-sanjiaoxing1"></span>
            <i>{{ item.playCount | subS}}万</i>
          </p>
        </div>
        <p>{{ item.name }}</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Highquality",
  data(){
    return{
      loading: false,
      finished: false,
      pageSize: 30,
      before: "",
      playList: [],
    }
  },
  filters: {
    subS(e) {
      e = e.toString();
      var l = e.toString().length - 4;
      return e.substring(0, l);
    }
  },
  methods:{
    getplayList(){
      this.loading = true;
      this.$http.get("/top/playlist/highquality?before="+this.before+"&limit="+this.pageSize).then(res=>{
        this.playList.push(...res.playlists);
        var lastIndex = res.playlists.length-1;
        if(res.playlists.length < this.pageSize){
          this.finished = true;
        }else{
          this.loading = false;
          this.before = res.playlists[lastIndex].updateTime;
        }
      })
    },
    // 跳转歌单详情歌曲列表页
    goSongLists(title, id){
      this.$router.push({
        path: "/songlist",
        query: {
          title,
          id
        }
      })
    }
  }
}
</script>

<style>

</style>