import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    isNotFound:false
  },
  getters: {
    getLoginState(state){
      return state.isLogin;
    },
    getNotFoundState(state){
      return state.isNotFound;
    }
  },
  mutations: {
    Login(state){
      state.isLogin = true;
    },
    Signout(state){
      state.isLogin = false;
    },
    NotFound(state){
      state.isNotFound = true;
    },
    Found(state){
      state.isNotFound = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
