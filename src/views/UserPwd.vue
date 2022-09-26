<template>
  <el-form :model='ruleForm' status-icon :rules='rules' ref='ruleForm' label-width='100px' class='pwd-form'>
    <el-form-item label='原密码' prop='old_pwd'>
      <el-input type='password' v-model='ruleForm.old_pwd' autocomplete='off'></el-input>
    </el-form-item>
    <el-form-item label='新密码' prop='new_pwd'>
      <el-input type='password' v-model='ruleForm.new_pwd' autocomplete='off'></el-input>
    </el-form-item>
    <el-form-item label='确认密码' prop='re_pwd'>
      <el-input v-model='ruleForm.re_pwd' type='password'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click='submitForm'>修改密码</el-button>
      <el-button @click='resetForm'>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updatePasswordAPI } from '@/api'

export default {
  name: 'UserPwd',
  data() {
    const isSamePassword = (rule, value, callback) => {
      if (value === this.ruleForm.old_pwd) {
        return callback(new Error('新旧密码不能相同'))
      }
      callback()
    }

    const checkRePassword = (rule, value, callback) => {
      if (value !== this.ruleForm.new_pwd) {
        return callback(new Error('两次新密码不一致'))
      }
      callback()
    }

    return {
      ruleForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: isSamePassword, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: checkRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      await this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { data: res } = await updatePasswordAPI(this.ruleForm)
          if (res.code !== 0) {
            this.$message.error('原密码不正确')
          } else {
            this.$message.success('更新密码成功')
          }
          this.resetForm()
          await this.$router.push('/login')
          this.$store.commit('updateUserInfo', {})
          this.$store.commit('updateToken', '')
        } else {
          return false
        }
      })
    },
    // 重置表单 -> 点击事件
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped>
.pwd-form {
  height: 100vh;
  width: 500px;
}
</style>
