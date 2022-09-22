import Vue from 'vue'
import Vuex from 'vuex'
// 自动持久化保存 vuex 的插件～，需要 3.2.1 版本的配合 Vue2 使用
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 用来保存登陆 token 字符串
  },
  getters: {
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
