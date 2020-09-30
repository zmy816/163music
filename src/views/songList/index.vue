<template>
  <div class="content">
    <div class="top">
      <van-nav-bar title="歌曲列表" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="main">
        <div class="main_top">
            <div class="playAll"> <span class="iconfont icon-bofang1-copy"></span> 播放全部 <span class="snum">(共{{songsNum}}首)</span></div>
            <div class="addCollections"><span class="add">+</span>收藏({{collectionsNum}})</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: "标题",
      songsNum:"45",
      collectionsNum:"509"
    };
  },
  computed: {},
  watch: {},
  methods: {
    //返回按钮点击方法
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.van-nav-bar .van-icon {
  color: #303030 !important;
}
.main_top{
    height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.playAll{
    font-size: 0.32rem;
    color: #323232;
}
.playAll .iconfont{
    color: #2a2a2a;
    font-size: 0.5rem;
}
.snum{
    font-size: 0.3rem;
    color: #a3a3a3;
}
</style>