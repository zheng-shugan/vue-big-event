<template>
  <el-card class='box-card'>
    <div slot='header' class='clearfix'>
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if='avatar' :src='avatar' class='the_img'>
      <img v-else class='the_img' src='../assets/images/avatar.jpg' alt='user avatar' />

      <!-- 按钮区域 -->
      <div class='btn-box'>
        <input type='file' accept='image/*' style='display: none' ref='iptRef' @change='onFileChange' />
        <el-button type='primary' icon='el-icon-plus' @click='chooseImg'>选择图片</el-button>
        <el-button type='success' icon='el-icon-upload' :disabled="avatar === ''" @click='uploadAvatarFn'>上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatar } from '@/api'

export default {
  name: 'UserAvatar',
  data() {
    return {
      avatar: null, // 保存图片链接/base64 字符串
    }
  },
  methods: {
    // 上传头像 -> 点击事件
    async uploadAvatarFn() {
      const { data: res } = await updateUserAvatar(this.avatar)
      if (res.code !== 0) { // 上传头像失败
        return  this.$message.error(res.message)
      } else { // 上传头像成功
        // 重新获取用户数据，更新前端用户头像
        this.$store.dispatch('getUserInfoActions')
        return this.$message.success(res.message)
      }
    },
    // 选择图片 -> 点击事件
    chooseImg() {
      // 模拟点击事件
      this.$refs.iptRef.click()
    },
    // 上传文件 -> 点击事件
    // e 是原生事件对象
    onFileChange(e) {
      // 拿到选择的文件数组
      let files = e.target.files
      if (files.length === 0) { // 没有选择文件
        this.avatar = null
      } else { // 选择了文件
        // 将文件转化成临时内存地址（不能发送给后台）
        // this.avatar = URL.createObjectURL(files[0])

        /* 将文件专成 base64 字符串（可以发送给后台） */
        const fr = new FileReader() // 定义个 FileReader 对象
        fr.readAsDataURL(files[0]) // 调用 readAsDataURL 函数，读取文件信息
        // 监听 fr 的 onload 对象
        // onload 等待把文件读成 base64 字符串给后台会触发 onload 事件函数
        fr.onload = (e) => {
          // e.target.result 就是读到的结果，值是 base64 的字符串
          this.avatar = e.target.result
        }
      }
    }
  }
}
</script>

<style scoped>
.the_img {
  width: 300px;
  height: 300px;
}
</style>
