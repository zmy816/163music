<template>
  <div class="content">
    <form>
      <van-search
        v-model="value"
        show-action
        placeholder="搜索歌手或者歌曲"
        @input="onSearch"
        @cancel="onCancel"
      />
      <div class="searchResult" v-show="showSearchList">
        <ul v-if="hasData" class="searchList">
          <li class="header">搜索&nbsp;&nbsp;“{{value}}”&nbsp;&nbsp;</li>
          <li v-for="(item,index) in searchResult" :key="index" @click="play(item.id)">
            <span class="iconfont icon-sousuo"></span>
            <span class="keys">{{item.name}}—{{item.artists[0].name}}</span>
          </li>
        </ul>
        <div v-else class="searchList">
          <p class="tit">抱歉，没有搜到哦~</p>
        </div>
      </div>
    </form>
    <div class="hotsearch">
      <p class="hotsearch_header">热搜榜</p>
      <div class="hotsearch_main">
        <ul>
          <li v-for="(item,index) in hotSearchList" :key="index">
            <span class="number">{{index+1}}</span>
            <span class="con">{{item.first}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      hasData: true,
      searchResult: {},
      showSearchList: false,
      hotSearchList: []
    };
  },
  methods: {
    //搜索时下拉框请求数据
    onSearch(value) {
      //通过拿到的value调取搜索单曲接口
      if (value == "") {
        this.showSearchList = false;
      } else {
        this.showSearchList = true;
        this.$http.get("/search?keywords=" + value).then(res => {
          if (res.code == 200) {
            // console.log(res);
            //如果拿不到数据，显示没有搜索到
            if (res.result.songCount != 0) {
              this.hasData = true;
              this.searchResult = res.result.songs;
            } else {
              this.hasData = false;
            }
          }
        });
      }
    },
    //点击取消返回之前的路由
    onCancel() {
      this.$router.go(-1);
    },
    //获取热搜列表
    getHotSearch() {
      this.$http.get("/search/hot").then(res => {
        this.hotSearchList = res.result.hots;
        // console.log(this.hotSearchList);
      });
    },
    // 播放音乐
    play(id){
      this.$store.dispatch("setSongid", id);
    }
  },
  mounted() {
    this.getHotSearch();
  }
};
</script>

<style scoped>
.searchResult {
  position: absolute;
  top: 1.1rem;
  left: 0.2rem;
  background-color: #ffffff;
}
.searchList {
  width: 7rem;
  margin: 0 auto;
  min-height: 3rem;
  max-height: 11rem;
  overflow: hidden;
  box-shadow: #dfdfdf 0 0 0, #dfdfdf 0.05rem 0 0.1rem, #dfdfdf 0 0.05rem 0.1rem,
    #dfdfdf -0.05rem 0 0.1rem;
}
.tit {
  line-height: 3rem;
  text-align: center;
  font-size: 0.28rem;
  color: #ccc;
}
.searchList li {
  font-size: 0.28rem;
  color: #333;
  height: 0.99rem;
  border-bottom: #f4f4f4 solid 0.01rem;
}
.iconfont {
  line-height: 0.99rem;
  padding: 0 0.25rem;
  vertical-align: middle;
}
.keys {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 0.5rem;
  width: 5rem;
  text-overflow: ellipsis;
  line-height: 0.99rem;
  vertical-align: middle;
}
.header {
  line-height: 0.99rem;
  color: #4a79ad !important;
  font-size: 0.28rem;
}

.hotsearch {
  width: 6.85rem;
  margin: 0 auto;
}
.hotsearch_header {
  font-size: 0.28rem;
  color: #303030;
  line-height: 0.96rem;
  border-bottom: solid 0.01rem #eeeeee;
}
.hotsearch_main ul{
  display: flex;
  flex-wrap: wrap;
}
.hotsearch_main li{
  width: 50%;
  line-height: 0.76rem;
  font-size: 0.26rem;
}
.number{
  color: #979797;
  padding-right: 0.28rem;
}
.con{
  color: 303030;
}
</style>

