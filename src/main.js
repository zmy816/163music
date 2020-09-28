import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import Vant from 'vant';
import 'vant/lib/index.css';
import request from "./util/request";
Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$http = request;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
