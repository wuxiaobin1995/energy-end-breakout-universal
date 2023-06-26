<!--
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2023-06-26 11:28:49
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
    this.initLocalStorage()
  },

  methods: {
    /**
     * @description: 软件启动后，初始化localStorage的一些值
     */
    initLocalStorage() {
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
      /* 初始化免责声明的终端用户名称 */
      if (!window.localStorage.getItem('disclaimer_name')) {
        window.localStorage.setItem('disclaimer_name', '')
      }
      /* 初始化免责声明的设备编号 */
      if (!window.localStorage.getItem('disclaimer_device_id')) {
        window.localStorage.setItem('disclaimer_device_id', '')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/style/index.scss';
</style>
