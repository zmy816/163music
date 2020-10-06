<template>
  <div class="login-form">
    <div>
      <input
        type="tel"
        placeholder="请输入手机号"
        class="tel"
        @input="inputChange"
        v-model="username"
      />
      <input
        type="password"
        placeholder="请输入密码"
        class="psd"
        @input="inputChange"
        v-model="password"
      />
      <input
        type="button"
        value="登录"
        :class="btnClass"
        @click.prevent="tologin"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import { setToken } from "../../util/auth";
export default {
  components: {},
  data() {
    return {
      username: "",
      password: "",
      disabled: true,
      btnClass: "disable",
    };
  },
  computed: {},
  watch: {},
  methods: {
    inputChange() {
      if (this.username.trim().length > 0 && this.password.length > 0) {
        this.disabled = false;
        this.btnClass = "active";
      } else {
        this.disabled = true;
        this.btnClass = "disable";
      }
    },
    tologin() {
      var dt = new Date();
      var timestamp = dt.getTime();
      axios({
        url: "http://192.168.15.33:3000/login/cellphone?timestamp=" + timestamp,
        method: "post",
        data: { phone: this.username, password: this.password },
      }).then((res) => {
        var data = res.data;
          if(data.code == 200){
            setToken(data.token);  //在cookie中存入token
            this.$store.dispatch("setToken", data.token); //在vuex中存入token
            this.$store.dispatch("setUid", data.profile.userId);  //在vuex中存入userid
            Toast("登录成功");
            this.$router.replace({path: "/mine"});
          }
          
        
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style  scoped>
.login-form {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/bg.jpg);
  background-size: 7.75rem 14.2rem;
  background-repeat: no-repeat;
  background-position: -0.11rem -0.8rem;
  position: relative;
}
.login-form > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7rem auto 0;
}
.login-form input {
  background-color: #fff;
  width: 4.5rem;
  height: 0.8rem;
  margin: 0.2rem;
  border-radius: 0.4rem;
}
.psd,
.tel {
  padding-left: 0.3rem;
}
.login-form input[type="button"] {
  width: 4.8rem;
  font-size: 0.3rem;
  color: #333;
  font-weight: 700;
  letter-spacing: 0.1rem;
}
input[type="button"].disable {
  background-color: #fff;
}
input[type="button"].active {
  background-color: rgb(252, 40, 40);
  color: #fff;
}
#app {
  height: 100%;
}
</style>