<!--
 * @Author      : 吴晓斌
 * @Date        : 2021-07-08 11:24:18
 * @LastEditTime: 2021-09-07 10:08:38
 * @Description :刷新中转页
-->
<template>
  <div class="container">
    <el-button v-loading.fullscreen.lock="fullscreenLoading"></el-button>
  </div>
</template>

<script>
export default {
  name: 'refresh',

  data() {
    return {
      fullscreenLoading: true
    }
  },

  created() {
    setTimeout(() => {
      this.$router.push({
        path: this.$route.query.routerName
      })
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
