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

// 无需登陆可以访问的路由地址
let whitelist = ['/login', '/reg']

// 全局前置路由守卫
// 浏览器第一次打开项目页面会触发一次前置路由守卫
router.beforeEach((to, from, next) => {
  // 有用户的登陆 token 才去请求用户信息
  const { token } = store.state

  if (token) {  // 如果已经登陆
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActions')
    }
    next()
  } else { // 如果没有登陆
    // 使用 next 强制切换到登陆页面
    // next 强制切换地址也会触发路由守卫
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
