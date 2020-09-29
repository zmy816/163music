<template>
  <div class="login-form">
    <div>
      <input type="tel" placeholder="请输入手机号" class="tel" />
      <input type="password" placeholder="请输入密码" class="psd" />
      <input type="button" value="登录" class="loginBtn" @click="tologin" />
    </div>
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
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601390235858&di=48ad48c3e27a9e83ac7ac317ed27da9c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff9e384f776dc405bf85b37e8ba466a9f21cf9bfd5726-GmXGrw_fw658);
  background-size: cover;
  background-position: 0 0;
  position: relative;
}
.login-form > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8rem auto 0;
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
</style>