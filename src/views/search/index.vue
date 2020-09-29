<template>
  <div class="content">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="搜索歌手或者歌曲"
        @input="onSearch"
        @cancel="onCancel"
      />
      <div class="searchResult">
        <ul v-if="hasData" class="searchList">
          <li v-for="(item,index) in searchResult" :key="index">{{item.name}}</li>
        </ul>
        <div v-else class="searchList">
          <p class="tit">抱歉，没有搜到哦~</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      hasData: true,
      searchResult: {}
    };
  },
  methods: {
    onSearch(value) {
      //通过拿到的value调取搜索单曲接口
      if (value != "") {
        this.$http.get("/search?keywords=" + value).then(res => {
          if (res.code == 200) {
            // console.log(res);
            //如果拿不到数据，显示没有搜索到
            if (res.result.songCount != 0) {
              this.hasData = true;
              this.searchResult = res.result.songs;
              console.log(this.searchResult)
            } else {
              this.hasData = false;
            }
          }
        });
      }
    },
    onCancel() {}
  }
};
</script>

<style scoped>
.searchList {
  width: 7.08rem;
  margin: 0 auto;
  border-radius: 0.05rem;
  background-color: #f7f8f8;
  min-height: 3rem;
  max-height: 6rem;
  overflow: hidden;
}
.tit {
  line-height: 3rem;
  text-align: center;
  font-size: 0.28rem;
  color: #ccc;
}
.searchList li{
  margin: 0 0.3rem;
  font-size: 0.28rem;
  color: #333;
  line-height: 0.8rem;
  border-bottom: solid 1px #cecece;
}
</style>