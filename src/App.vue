<!--
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2021-09-08 15:10:54
 * @Description : 根组件
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',

  created() {
    /* 初始化localStorage中的波特率 */
    if (!window.localStorage.getItem('scmBaudRate')) {
      window.localStorage.setItem('scmBaudRate', '115200')
    }
    /* 初始化localStorage中的负重值 */
    if (!window.localStorage.getItem('trainWeight')) {
      window.localStorage.setItem('trainWeight', '1')
    }
    // 初始化localStorage中的人员设定的峰值功率百分比
    if (!window.localStorage.getItem('maxPowerPercent')) {
      window.localStorage.setItem('maxPowerPercent', '90')
    }
  }
}
</script>

<style lang="scss">
@import '@/style/index.scss';
</style>
