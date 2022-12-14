<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <ElForm :model="loginForm" :rules="loginRules" ref="loginRef">
        <!-- 用户名 -->
        <ElFormItem prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" maxlength="10" minlength="1"></el-input>
        </ElFormItem>
        <!-- 密码 -->
        <ElFormItem prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            maxlength="15"
            minlength="6"
          ></el-input>
        </ElFormItem>
        <ElFormItem>
          <el-button type="primary" class="btn-login" @click="loginFn">登录</el-button>
          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { loginAPI } from "@/api";

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单的验证规则对象
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 映射 vuex 中 mutations 的方法
    ...mapMutations(['updateToken']),
    // 登录按钮->点击事件
    async loginFn() {
      await this.$refs.loginRef.validate(async (valid) => {
        if (valid) {
          // 解构赋值，拿到返回的数据
          const { data: res } = await loginAPI(this.loginForm)
          console.log(this.loginForm)
          // 根据后台返回信息，提示用户操作
          if (res.code !== 0) { // 登陆失败
            this.$message.error(res.message)
          } else {  // 登陆成功
            this.$message.success(res.message)
            // 将登陆得到的 token 保存到 vuex 中
            this.updateToken(res.token)
            await this.$router.push('/')
          }
          console.log('res: ', res)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url('../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100vh;

  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../assets/images/login_title.png') center no-repeat;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
