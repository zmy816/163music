<template>
  <div class="login-form">
    <div class="logo"></div>
    <input type="tel" placeholder="请输入手机号" class="tel" />
    <input type="password" placeholder="请输入密码" class="psd" />
    <input type="button" value="登录" class="loginBtn" @click="tologin"/>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style  scoped>
.login-form {
  width: 100%;
  height: 100%;
  background-color: #ff0000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.login-form input {
  background-color: #fff;
  width: 3.75rem;
  height: 0.7rem;
  margin: 0.2rem;
  border-radius: 0.4rem;
}
.psd,
.tel {
  padding-left: 0.3rem;
}
.login-form .loginBtn {
  width: 4.05rem;
  font-size: 0.3rem;
  letter-spacing: 0.1rem;
}
#app {
  height: 100%;
}
.logo {
  width: 7.5rem;
  height: 3.5rem;
  position: absolute;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601374277535&di=893ceca1b5f0a83a4b0ccdfe3e977b7a&imgtype=0&src=http%3A%2F%2Fimg.cnmo-img.com.cn%2F1731_600x1000%2F1730637.png);
  background-position: 0 0;
  background-size: cover;
  top: 0;
  left: 0;
}
</style>