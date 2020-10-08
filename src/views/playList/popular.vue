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
  name: "Popular",
  data(){
    return {
      loading: false,
      finished: false,
      currentPage: 1,
      pageSize: 30,
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
      this.loading = true;  //将loading设置为true，则表示加载中不会继续触发load方法
      var offset = (this.currentPage-1) * this.pageSize;
      this.$http.get("/top/playlist?offset=" + offset + "&limit=" + this.pageSize+"&cat=流行").then(res=>{
        this.playList.push(...res.playlists);
        if(res.playlists.length < this.pageSize){ //如果数据已经加载完毕，将finished设置为true，load方法将不会再被触发
          this.finished = true;
        }else{
          this.currentPage++; // 页码+1
          this.loading = false;  //数据没有加载完，将loading设置为false,下拉可继续加载
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