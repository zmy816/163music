<template>
  <div class="content">
    <div id="topWrap">
      <div class="titleBox">
        <p></p>
        <h2>歌单广场</h2>
      </div>
      <div>
        <ul class="category">
          <router-link tag="li" to="/playlist/recommend"><p>推荐</p><i></i></router-link>
          <router-link tag="li" to="/playlist/official"><p>官方</p><i></i></router-link>
          <router-link tag="li" to="/playlist/highquality"><p>精品</p><i></i></router-link>
          <router-link tag="li" to="/playlist/chinese"><p>华语</p><i></i></router-link>
          <router-link tag="li" to="/playlist/popular"><p>流行</p><i></i></router-link>
          
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "PlayList",
}
</script>

<style>
.titleBox{
  height: 1rem;
  display: flex;
  align-items: center;
}
.titleBox>p{
  margin: 0 .38rem;
  width: .64rem;
  height: .64rem;
  background: url(../../assets/back.png) 0 center/ .40rem .40rem no-repeat;
}
.titleBox>h2{
  font-size: .34rem;
}
.category{
  display: flex;
  height: .75rem;
  overflow-x: auto;
  border-bottom: solid 1px #cecece;
}
.category>li{
  margin: 0 .4rem;
  width: .64rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
}
.category>li>p{
  width: .64rem;
  margin-bottom: .2rem;
  color: #aba8a1;
  font-size: .26rem;
}
.category>li>i{
  width: .64rem;
  height: .06rem;
  background: #ff3839;
  border-radius: .03rem;
  display: none;
}
.category>li.active p{
  color: #ff3839;
  font-weight: 700;
}
.category>li.active i{
  display: block;
}
.listWrap>ul{
  padding-top: .32rem;
  display: flex;
  flex-wrap: wrap;
}
.listWrap>ul>li{
  width: 33.3%;
  margin-bottom: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imgBox>img{
  width: 2.15rem;
  height: 2.15rem;
}
.imgBox{
  position: relative;
}
.imgBox p{
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
}
</style>