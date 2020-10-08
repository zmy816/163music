<template>
  <div class="content">
    <div id="topWrap">
      <div class="titleBox">
        <p @click="$router.push('/find')"></p>
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
    <transition mode="out-in" name="my">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: "PlayList",
}
</script>

<style>
.content{
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
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
.listWrap{
  flex: 1;
  overflow-y: auto;
}
.listWrap>.van-list{
  padding: .32rem .12rem 0 .32rem;
  display: flex;
  flex-wrap: wrap;
}
.listWrap>.van-list>.van-cell{
  width: 2.15rem;
  margin-bottom: .25rem;
  margin-right: .2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.listWrap .van-cell .van-cell__value>p{
  width: 2.15rem;
  margin-top: .15rem;
  color: #333;
  font-size: .23rem;
  line-height: .35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.van-cell::after{
  border: none;
}
.van-list__finished-text{
  margin: 0 auto;
}
.van-list__loading{
  margin: 0 auto;
}
.imgBox>img{
  width: 2.15rem;
  height: 2.15rem;
  border-radius: .08rem;
}
.imgBox{
  position: relative;
}
.imgBox p{
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
  font-size: .18rem;
}
.imgBox p>.iconfont{
  color: #fff;
  font-size: .16rem;
}
.imgBox p>i{
  color: #fff;
  margin-left: .05rem;
}
.my-enter{
    opacity: 0;
    transform: translateX(100%); 
}
.my-enter-active{
      transition: all .3s ease;
}
</style>