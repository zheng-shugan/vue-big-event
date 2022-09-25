import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout')
  },
  {
    path: '/reg',
    component: () => import('@/views/Register')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 有用户的登陆 token 才去请求用户信息
  const { token } = store.state
  if (token && !store.state.userInfo.username) {
    store.dispatch('getUserInfoActions')
  }

  next()
})

export default router
