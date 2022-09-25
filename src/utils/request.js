// 基于 axios 封装的网络请求函数
import axios from "axios";
import store from '@/store'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL: baseURL
})

// 每次使用 axios 发送请求的时候都会触发这个请求拦截器
/**
 * 定义请求拦截器
 *
 * @param config 配置对象（要请求的后台参数都在这个参数上）
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

export default myAxios
