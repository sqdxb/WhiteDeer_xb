import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  getters: {
    getLoginState(state){
      return state.isLogin;
    }
  },
  mutations: {
    Login(state){
      state.isLogin = true;
    },
    Signout(state){
      state.isLogin = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
