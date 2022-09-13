<!--
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 14:56:18
 * @LastEditTime: 2021-09-09 15:46:42
 * @Description : 布局组件
-->
<template>
  <div class="container">
    <!-- 导航栏 -->
    <div class="nav-wrapper">
      <nav-bar />
    </div>

    <!-- 内容区 -->
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'layout',

  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  /* 导航栏 */
  .nav-wrapper {
    width: 100%;
    height: 8vh;
  }

  /* 内容区 */
  .content-wrapper {
    width: 100%;
    height: 92vh;
  }
}
</style>
