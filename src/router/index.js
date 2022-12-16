/*
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2022-12-16 11:12:43
 * @Description : 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    redirect: '/train',
    children: [
      // 运动页
      {
        path: 'train',
        name: 'train',
        component: () => import('@/views/train')
      },
      // 配置页
      {
        path: 'configure',
        name: 'configure',
        component: () => import('@/views/configure')
      },
      // 数据记录页
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/record')
      },
      // 数据迁移
      {
        path: 'data-migration',
        name: 'data-migration',
        component: () => import('@/views/data-migration')
      },
      // 刷新中转页
      {
        path: 'refresh',
        name: 'refresh',
        component: () => import('@/views/refresh')
      }
    ]
  },

  {
    path: '*',
    redirect: '/train' // 匹配不到路由时，路由重定向至运动页
  }
]

const router = new VueRouter({
  routes,
  /* 自定义路由切换时页面如何滚动 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 } // 回到顶部
  }
})

export default router
