<template>
  <el-container class='main-container'>
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src='../assets/images/logo.png' alt='' />
      <!-- 右侧的菜单 -->
      <el-menu
        class='el-menu-top'
        mode='horizontal'
        background-color='#23262E'
        text-color='#fff'
        active-text-color='#409EFF'
      >
        <el-submenu index='1'>
          <template slot='title'>
            <!-- 头像 -->
            <span>个人中心</span>
          </template>
          <el-menu-item index='1-1'><i class='el-icon-s-operation'></i>基本资料</el-menu-item>
          <el-menu-item index='1-2'><i class='el-icon-camera'></i>更换头像</el-menu-item>
          <el-menu-item index='1-3'><i class='el-icon-key'></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index='2' @click='loginOut'><i class='el-icon-switch-button'></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏用户信息区域 -->
      <el-aside width='200px'>
        <div class='user-box'>
          <img :src='user_pic' alt='' v-if='user_pic' />
          <img src='../assets/images/logo.png' alt='' v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边导航菜单栏 -->
        <el-menu
          :default-active='$route.path'
          class='el-menu-vertical-demo'
          @open='handleOpen'
          @close='handleClose'
          background-color='#23262E'
          text-color='#fff'
          active-text-color='#409EFF'
          router
        >
          <template v-for='menu in menus'>
            <el-menu-item v-if='!menu.children' :index='menu.indexPath' :key='menu.indexPath'>
              <i :class='menu.icon'></i>
              <span>{{ menu.title }}</span>
            </el-menu-item>

            <el-submenu v-else :index='menu.indexPath' :key='menu.indexPath'>
              <template slot='title'>
                <i :class='menu.icon'></i>
                <span>{{ menu.title }}</span>
              </template>

                <el-menu-item v-for='item in menu.children' :index='item.indexPath' :key='item.indexPath'>
                  <template slot='title'>
                    <i :class='item.icon'></i>
                    <span>{{ item.title }}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <!-- 二级路由的挂载点 -->
          <router-view />
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>
          <el-link href='https://github.com/zheng-shugan/vue-big-event'>Github</el-link>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'

export default {
  name: 'Layout',
  data() {
    return {
      menus: [] // 左侧边栏数据
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'user_pic'])
  },
  methods: {
    loginOut() {
      this.$confirm('是否退出登陆?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除 vuex
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        // 强制跳转到登陆页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    async getMenusListFn() {
      const res = await getMenusListAPI()
      this.menus = res.data.data
      console.log(this.menus)
    }
  },
  created() {
    this.getMenusListFn()
  }
}
</script>

<style lang='less' scoped>
.main-container {
  height: 100vh;

  .el-header,
  .el-aside {
    background-color: #23262e;
  }

  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }

  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>

