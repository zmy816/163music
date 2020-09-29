import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    token: "",
    uid: "",
    songid: ""
  },
  getters: {
    token: state=>{
      return state.token;
    },
    uid: state=>{
      return state.uid;
    },
    songid: state=>{
      return state.songid;
    }
  },
  mutations:{
    SET_TOKEN: (state,token)=>{
      state.token = token;
    },
    SET_UID: (state, uid)=>{
      state.uid = uid;
    },
    SET_SONGID: (state, songid)=>{
      state.songid = songid;
    }
  },
  actions: {
    setToken(context,token){
      context.commit("SET_TOKEN", token);
    },
    setUid(context, uid){
      context.commit("SET_UID", uid);
    },
    setSongid(context, songid){
      context.commit("SET_SONGID",songid);
    }
  }
})
export default store;