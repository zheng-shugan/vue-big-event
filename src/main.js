import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/global.less'

// 引入富文本编辑器组件
import VueQuillEditor from 'vue-quill-editor'

// 引入富文本编辑者样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 引入格式化时间函数
import dayjs from 'dayjs'

Vue.config.productionTip = false

// 此方法内会用 Vue.component 注册一个叫 quillEditor 的全局组件
Vue.use(VueQuillEditor)

// 注册 Element UI
Vue.use(ElementUI)

// 基于 dayjs 注册全局函数来格式化时间
Vue.prototype.$formatDate = (dataObj) => {
  // 借助 dayjs 内置的方法把日期对象格式化成指定的格式
  // 并返回格式化好的字符串
  return dayjs(dataObj).format('YYYY-MM-DD HH:mm:ss')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
