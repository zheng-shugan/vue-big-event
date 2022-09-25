import Vue from 'vue'
import Vuex from 'vuex'
// 自动持久化保存 vuex 的插件～，需要 3.2.1 版本的配合 Vue2 使用
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 用来保存登陆 token 字符串
    userInfo: { }, // 保存登陆用户信息(id, username, nickname, email, user_pic)
  },
  getters: {
    username: state => state.userInfo.username,   // 用户名
    nickname: state => state.userInfo.nickname,   // 用户昵称
    user_pic: state => state.userInfo.user_pic,   // 用户头像
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    async getUserInfoActions(store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
