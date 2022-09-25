// 基于 axios 封装的网络请求函数
import axios from "axios";
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL: baseURL
})

// 每次使用 axios 发送请求的时候都会触发这个请求拦截器
/**
 * 定义请求拦截器
 *
 * @param config 配置对象（要请求的后台参数都在这个参数上）
 * @param error 错误对象
 * */
myAxios.interceptors.request.use((config) => {
  // 在请求前会触发一次
  // 返回给 axios 内源码，根据配置项发起请求

  // 发起请求的时候统一携带 Authorization 和 token 值
  // 有 token 值的时候
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }

  return config
}, (error) => {
  // 请求前发起的代码，如果有异常会直接进入这里
  return Promise.reject(error)
})

/**
 * 定义响应拦截器
 *
 * @param response 响应成功的结果
 * @param error 响应失败的对象
 * */
myAxios.interceptors.response.use((response) => {
  // http 响应状态码为 2xx 或 3xx 触发处理成功的回调
  // response 是响应成功的结果
  return response
}, (error) => {
  // http 响应状态码为 4xx 或 5xx 触发处理失败的回调
  // error 是响应错误的结果

  // token 过期
  if (error.response.status === 401) {
    // 清除 Vuex 里的 store
    store.commit('updateToken', '')
    store.commit('updateUserInfo', { })

    // 切换到登陆页
    router.push('/login')

    // 弹窗提示
    Message.error('用户过期，请重新登陆！')
  }

  return Promise.reject(error)
})

export default myAxios
