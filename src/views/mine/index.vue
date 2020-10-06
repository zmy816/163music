<template>
  <div class="content">
    <div class="personalInformation" v-if="showLogin">
      <img
        class="head_portrait"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2389998747,3300817372&fm=26&gp=0.jpg"
        alt
      />
      <p class="title" @click="login">立即登录</p>
      <span class="iconfont icon-right"></span>
    </div>
    <div id="infoBox" v-else>
      <div id="info" v-if="userInfo">
        <img :src="userInfo.profile.avatarUrl" alt="" />
        <div>
          <h3 id="nickName">{{ userInfo.profile.nickname }}</h3>
          <i id="level">Lv.{{ userInfo.level }}</i>
        </div>
      </div>
      <button @click="loginOut">退出登录</button>
    </div>
    <div class="applicationList">
      <ul>
        <li>
          <span class="iconfont icon-wodeguanzhu"></span>
          <p>我的关注</p>
        </li>
        <li>
          <span class="iconfont icon-xingzhuang60kaobei2"></span>
          <p>收藏和赞</p>
        </li>
        <li>
          <span class="iconfont icon-diantai"></span>
          <p>我的电台</p>
        </li>
        <li>
          <span class="iconfont icon-zuijinbofang-xuanting"></span>
          <p>最近播放</p>
        </li>
        <li>
          <span class="iconfont icon-yigoumai"></span>
          <p>已购</p>
        </li>
        <li>
          <span id="musicapp">+</span>
          <p>音乐应用</p>
        </li>
      </ul>
    </div>
    <div class="favorite">
      <div class="icon">
        <span class="iconfont icon-xin1-copy"></span>
      </div>
      <p>
        <span class="favorite_title">我喜欢的音乐</span>
        <span class="number" v-if="myMusic">{{ myMusic.trackCount}} 首</span>
      </p>
    </div>
    <div class="songlist">
      <div class="songlist_header">
        <p class="checked" @click="checked(1)" ref="collect">
          <span>收藏歌单</span>
        </p>
        <p @click="checked(2)" ref="recommend">
          <span>推荐歌单</span>
        </p>
      </div>
      <div class="songlist_main">
        <div class="collect" v-if="showflag">
          <div class="collect_header">
            <h3>收藏歌单</h3>
            <span class="iconfont icon-sangedian"></span>
          </div>
          <div class="collect_content">
            <ul class="noList" v-if="myPlayList.length==0">
              <li>暂无收藏的歌单</li>
            </ul>
            <ul v-else>
              <li v-for="(item) in myPlayList" :key="item.id">
                <img :src="item.coverImgUrl" alt />
                <div>
                  <p>{{ item.name }}</p>
                  <span>
                    {{ item.trackCount }}
                    <em>首</em>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="recommend" v-else>
          <div class="recommend_header">
            <h3>推荐歌单</h3>
            <span class="iconfont icon-sangedian"></span>
          </div>
          <div class="recommend_content">
            <ul>
              <li v-for="(item, index) in recommendlist" :key="index">
                <img :src="item.picUrl" alt />
                <div>
                  <p>{{ item.name }}</p>
                  <span>
                    {{ item.trackCount }}
                    <em>首</em>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from "../../util/auth";
export default {
  data() {
    return {
      showflag: true,
      recommendlist: [],
      userInfo: null,
      // uid: "",
      showLogin: true,
      myPlayList: [],
      myMusic: null,
    };
  },
  created() {
    // this.uid = this.$store.getters.uid; //设置用户id
    if(this.uid){
      this.showLogin = false;
    }
    this.getUserInfo();
    this.getrecommend();
    this.getMyPlayList();
  },
  computed: {
    uid(){
      return this.$store.getters.uid;
    }
  },
  methods: {
    checked(type) {
      if (type == 1) {
        this.showflag = true;
        this.$refs.collect.className = "checked";
        this.$refs.recommend.className = "";
      } else {
        this.showflag = false;
        this.$refs.recommend.className = "checked";
        this.$refs.collect.className = "";
      }
    },
    // 获取用户信息
    getUserInfo(){
      if(this.uid){
        this.$http.get("/user/detail?uid="+this.uid).then(res=>{
          if(res){
            this.userInfo = res;
          }
        })
      }
    },
    //获取收藏的歌单
    getMyPlayList(){
      if(this.uid){
        this.$http.get("/user/playlist?uid="+this.uid).then(res=>{
          // console.log(res);
          this.myMusic = res.playlist[0];
          
          this.myPlayList = res.playlist.slice(1);
        })
      }
    },
    //调用推荐歌单
    getrecommend() {
      this.$http.get("/personalized?limit=5&userid=" + this.uid).then((res) => {
        if (res.code == 200) {
          this.recommendlist = res.result;
        }
      });
    },
    // 跳转登录页面
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    // 退出登录
    loginOut() {
      this.showLogin = true;
      removeToken(); //移除cookie中的Token
      this.$store.dispatch("setToken", ""); //清空vuex中存的token
      this.$store.dispatch("setUid", "");   //清空vuex中存的uid
      this.myPlayList = [];
      this.myMusic = null;
    }
  },
};
</script>

<style scoped>
.content {
  background-color: #f8f8f8;
}
.personalInformation {
  width: 6.84rem;
  height: 2.1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.head_portrait {
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 50%;
  margin: 0 0.34rem 0 0.26rem;
}
.title {
  font-size: 0.34rem;
  font-weight: 600;
  margin-right: 0.15rem;
}
.icon-right {
  font-size: 0.36rem;
  font-weight: 600;
}
.applicationList {
  width: 6.84rem;
  min-height: 3rem;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 0.2rem;
}
.applicationList ul {
  display: flex;
  margin-left: 0.2rem;
  flex-wrap: wrap;
  align-items: center;
}
.applicationList ul li {
  width: 25%;
  height: 1.65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.applicationList .iconfont {
  font-size: 0.55rem;
  color: #ff4a3c;
}
.applicationList ul li p {
  font-size: 0.24rem;
  color: #585858;
}
#musicapp {
  width: 0.58rem;
  height: 0.58rem;
  font-size: 0.48rem;
  color: #c2c2c2;
  background-color: #f5f5f5;
  border-radius: 50%;
  text-align: center;
  line-height: 0.58rem;
}
.favorite {
  width: 6.84rem;
  height: 1.7rem;
  background-color: #ffffff;
  margin: 0.34rem auto;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
}
.icon {
  width: 1.05rem;
  height: 1.05rem;
  background-color: #fce7e6;
  border-radius: 0.1rem;
  margin: 0 0.2rem 0 0.34rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon .iconfont {
  font-size: 0.5rem;
  color: #fe5a4e;
}
.favorite p {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.favorite_title {
  font-size: 0.28rem;
  color: #232323;
}
.number {
  font-size: 0.2rem;
  color: #9e9e9e;
}
.songlist_header {
  display: flex;
  width: 6.84rem;
  height: 0.86rem;
  margin: 0 auto;
  align-items: center;
}
.songlist_header p {
  font-size: 0.34rem;
  color: #585858;
  line-height: 1;
  width: 49.5%;
  text-align: center;
}
.songlist_header p:nth-child(1) {
  border-right: solid 1px #e0e0e0;
}
.songlist_header .checked span {
  color: #323232;
  font-weight: 600;
  padding-bottom: 0.1rem;
  border-bottom: solid 2px red;
}
.collect {
  width: 6.84rem;
  min-height: 2.4rem;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 0.2rem;
}
.recommend {
  width: 6.84rem;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 0.2rem;
}
.recommend_header,
.collect_header {
  width: 6.2rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
}
.recommend_header span,
.collect_header span {
  color: #aeaeae;
  font-size: 0.28rem;
}
.recommend_header h3,
.collect_header h3 {
  font-size: 0.32rem;
  color: #262626;
  font-weight: 600;
}
.recommend_content ul, .collect_content ul{
  width: 6.2rem;
  margin: 0.2rem auto;
  padding-bottom: 0.2rem;
}
.recommend_content ul li, .collect_content ul li {
  margin: 0.1rem auto;
  display: flex;
  align-items: center;
}
.recommend_content img, .collect_content img {
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 0.1rem;
  margin-right: 0.2rem;
}
.recommend_content li div, .collect_content li div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.recommend_content li div p, .collect_content li div p {
  font-size: 0.28rem;
  color: #272727;
  width: 4.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recommend_content li div span,.collect_content li div span {
  font-size: 0.2rem;
  color: #7a7a7a;
}
.collect_content ul.noList li {
  height: 1.05rem;
  margin: 0.1rem auto;
  color: #989898;
  line-height: 1.05rem;
  text-align: center;
}
#infoBox {
  margin-top: 0.5rem;
  margin-bottom: .4rem;
  padding: 0 .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#info{
  display: flex;

}
#info>img{
  width: 1.04rem;
  height: 1.04rem;
  border-radius: 50%;
}
#info>div{
  margin-left: .32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#nickName{
  font-size: .27rem;
  color: #323232;
  font-weight: 700;
}
#level{
  margin-top: .1rem;
  height: .34rem;
  width: .68rem;
  text-align: center;
  line-height: .34rem;
  border-radius: .17rem;
  color: #666;
  font-size: .16rem;
  font-weight: 700;
  font-family: STXingkai;
  background: #fff;
}
#infoBox>button{
  background-color: #ee362d;
  height: .5rem;
  width: 1.5rem;
  border-radius: .25rem;
  color: #fff;
  line-height: .5rem;
  font-size: .17rem;
}
</style>