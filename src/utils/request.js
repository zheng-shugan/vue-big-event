// 基于 axios 封装的网络请求函数
import axios from "axios";

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL: baseURL
})

export default myAxios
