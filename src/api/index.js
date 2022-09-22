// 封装的接口请求地址

import request from '@/utils/request'

/**
 * 注册请求 API
 *
 * @param username 注册的用户名
 * @param password 密码
 * @param repassword 重新输入的密码
 * */
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 登陆请求 API
 *
 * @param username 登陆用户名
 * @param password 登陆密码
 * */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
