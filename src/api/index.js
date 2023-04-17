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

/**
 * 获取文章分类
 *
 * @return 一个 Promise 对象
 * */
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list',
    method: 'GET'
  })
}

/**
 * 添加文章分类
 *
 * @param cate_name 类别名称
 * @param cate_alias 类别别名
 * */
export const saveArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * @param id 文章分类 id
 * @param cate_name 分类名称
 * @param cate_alias 分类别名
 *
 * @return 一个 Promise 对象
 * */
export const changeArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除文章分类
 *
 * @param id 要删除分类的 id
 *
 * @return 一个 Promise 对象
 * */
export const deleteArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

/**
 *  发布文章
 *  @param fd 表单数据对象
 *  @return 一个 Promise 对象
 *  */
export const uploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
  })
}

/**
 * 获取文章列表
 *
 * @param pagenum 当前页码
 * @param pagesize 当前页需要的数据条数
 * @param cate_id 文章分类 id
 * @param state 文章状态
 *
 * @return 一个 Promise 对象
 * */
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state, }) => {
  return request({
    url: '/my/article/list',
    method: 'GET',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state,
    }
  })
}

/**
 * 根据 id 获取文章详情
 *
 * @param id 文章的 id
 *
 * @return 一个 Promise 对象
 * */
export const getArticleByIdAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 根据 id 删除文章
 *
 * @param id 需要删除文章的 id
 *
 * @return 一个 Promise 对象
 * */
export const deleteArticleByIdAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}
