<template>
  <div class="reg-container">
    <div class="reg-box">
      <div class="reg-box">
        <div class="title-box"></div>
        <ElForm ref="form" :model="form" :rules="rules">
          <ElFormItem prop="username">
            <ElInput v-model="form.username" placeholder="请输入用户名" />
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput type="password" v-model="form.password" placeholder="请输入密码" />
          </ElFormItem>
          <ElFormItem prop="repassword">
            <ElInput type="password" v-model="form.repassword" placeholder="确认密码" />
          </ElFormItem>

          <ElFormItem>
            <ElButton class="btn-reg" type="primary" @click="register">注册</ElButton>
            <ElLink type="info" @click="$router.push('/login')">去登陆</ElLink>
          </ElFormItem>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAPI } from "@/api";

export default {
  name: 'Register',
  data () {
    const checkRepassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致～'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, min: 6, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkRepassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册点击事件
    register () {
      this.$refs.form.validate(async valid => {
        if (!valid) { return false }
        const { data: res } = await registerAPI(this.form)
        console.log('res: ', res)
        if (res.code !== 0) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
          await this.$router.push('/login')
        }
      })
    }
  }
  // created() {
  //   axios({
  //     data: this.form
  //   })
  // }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url("../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100vh;

  .reg-box {
    width: 400px;
    height: 335px;
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
      background: url("../assets/images/login_title.png") center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
