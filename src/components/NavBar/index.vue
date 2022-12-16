<!--
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 15:00:05
 * @LastEditTime: 2022-12-16 11:12:06
 * @Description : 导航栏-公共组件
-->
<template>
  <div class="container">
    <el-menu
      :default-active="this.$route.path ? this.$route.path : '/train'"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      mode="horizontal"
      router
    >
      <el-menu-item index="/train">
        <i class="el-icon-s-home"></i>
        <span>运 动 页 面</span>
      </el-menu-item>

      <el-menu-item index="/configure">
        <i class="el-icon-edit"></i>
        <span>配 置 页</span>
      </el-menu-item>

      <el-menu-item index="/record">
        <i class="el-icon-date"></i>
        <span>数 据 查 看 页</span>
      </el-menu-item>

      <el-menu-item index="/data-migration">
        <i class="el-icon-s-data"></i>
        <span>数 据 迁 移</span>
      </el-menu-item>

      <el-menu-item>
        <el-button icon="el-icon-refresh" @click="handleRefresh" plain round
          >刷 新 页 面
        </el-button>
      </el-menu-item>

      <el-menu-item>
        <span class="project-name">速度与功率反馈系统-蓝牙版 v1.0.0</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavBar',

  methods: {
    /**
     * @description: 刷新页面，通过路由跳转的技巧
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: this.$route.path
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  /* 软件名 */
  .project-name {
    margin-left: 100px;
    color: #ffffff;
    font-size: 22px;
  }
}
</style>
