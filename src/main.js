/*
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2021-09-08 17:02:22
 * @Description : 渲染进程入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 引入element-ui库 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 引入Echarts */
import * as Echarts from 'echarts'
/* 引入moment时间日期库 */
import moment from 'moment'
/* 引入进度条插件 */
import QProgress from 'qier-progress'
/* 引入初始化数据库 */
import { initDB } from '@/db/index.js'

Vue.use(ElementUI)
Vue.prototype.$echarts = Echarts
Vue.prototype.$moment = moment

initDB()
  .open()
  .catch(() => {
    alert('打开数据库失败，请重启软件')
  })

Vue.config.productionTip = false

const qprogress = new QProgress()
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  qprogress.start()
  // 这个一定要加，没有next()页面不会跳转的
  next()
})
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  qprogress.finish()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
