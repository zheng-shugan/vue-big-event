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

/**
 * 获取用户信息
 *
 * @return 一个 Promise 对象
 * */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',
    method: 'GET'
  })
}

/**
 * 获取侧边栏信息
 *
 * @return 一个 Promise 对象
 * */
export const getMenusListAPI = () => {
  return request({
    url: '/my/menus',
    method: 'GET'
  })
}

/**
 * 更新用户信息
 *
 * @param id 用户 id
 * @param  nickname 用户昵称
 * @param username 用户名
 * @param email 用户邮箱
 * @param user_pic 用户头像
 * */
export const updateUserInfoAPI = ({ id, nickname, username, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      nickname,
      username,
      email,
      user_pic
    }
  })
}

/**
 * 更新用户头像
 *
 * @param avatar 头像的 base64 字符串
 *
 * @return Promise 对象
 * */
export const updateUserAvatar = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

/**
 * 用户修改密码
 *
 * @param old_pwd 旧密码
 * @param new_pwd 新密码
 * @param re_pwd 重新输入的新密码
 *
 * @return Promise 对象
 * */
export const updatePasswordAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}
