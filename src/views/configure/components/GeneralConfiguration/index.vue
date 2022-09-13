<!--
 * @Author      : 吴晓斌
 * @Date        : 2020-09-11 16:19:06
 * @LastEditTime: 2021-09-08 16:10:02
 * @Description : 通用配置项
-->
<template>
  <div class="container">
    <el-divider>峰值功率百分比设置</el-divider>
    <span>峰值功率百分比（默认是90%）：</span>
    <el-input-number
      v-model="maxPowerPercent"
      @change="handleSetMaxPowerPercent"
      :min="1"
      :max="100"
      label="请输入峰值功率百分比"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  name: 'GeneralConfiguration',

  data() {
    return {
      maxPowerPercent: 90 // 人员设定的峰值功率百分比，默认90%
    }
  },

  created() {
    // 从localStorage获取峰值功率百分比
    this.maxPowerPercent = parseFloat(
      window.localStorage.getItem('maxPowerPercent')
    )
  },

  methods: {
    /**
     * @description: 人员设定的峰值功率百分比，默认90%
     * @param {Number|Undefined} value
     */
    handleSetMaxPowerPercent(value) {
      if (!value) {
        this.maxPowerPercent = 90
      }
      // localStorage缓存每次的值
      window.localStorage.setItem('maxPowerPercent', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
