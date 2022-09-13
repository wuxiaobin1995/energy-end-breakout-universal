<!--
 * @Author      : 吴晓斌
 * @Date        : 2020-09-11 16:19:06
 * @LastEditTime: 2021-09-08 15:52:04
 * @Description : 配置页
-->
<template>
  <div class="container">
    <el-tabs
      v-model="activeName"
      :tab-position="tabPosition"
      :before-leave="handleBeforeSelectTab"
    >
      <!-- 用户管理 -->
      <el-tab-pane name="user-manage">
        <span slot="label"><i class="el-icon-user-solid"></i> 用户管理</span>
        <user-manage />
      </el-tab-pane>

      <!-- 训练动作 -->
      <el-tab-pane name="training-action">
        <span slot="label"><i class="el-icon-s-help"></i> 训练动作</span>
        <action-manage />
      </el-tab-pane>

      <!-- 通用配置 -->
      <el-tab-pane name="general-configuration">
        <span slot="label"><i class="el-icon-s-help"></i> 通用配置</span>
        <general-configuration />
      </el-tab-pane>

      <!-- 开发者页 -->
      <el-tab-pane name="developer">
        <span slot="label"><i class="el-icon-s-promotion"></i> 开发者页</span>
        <developer />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* 引入子组件 */
import UserManage from '@/views/configure/components/UserManage'
import ActionManage from '@/views/configure/components/ActionManage'
import GeneralConfiguration from '@/views/configure/components/GeneralConfiguration'
import Developer from '@/views/configure/components/Developer'

export default {
  name: 'configure',

  components: {
    UserManage,
    ActionManage,
    GeneralConfiguration,
    Developer
  },

  data() {
    return {
      activeName: 'user-manage', // 默认显示的tag页
      tabPosition: 'left' // tag标签页位置
    }
  },

  methods: {
    /**
     * @description: [权限管理]切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换
     * @param {String} tab 标签名字
     */
    handleBeforeSelectTab(tab) {
      if (tab === 'developer') {
        return new Promise((resolve, reject) => {
          this.$prompt(
            '该页面用于程序开发者调试使用，普通用户无权限进入',
            '警告',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^htpm$/,
              inputErrorMessage: '密码错误',
              inputPlaceholder: 'Please enter password',
              closeOnClickModal: false
            }
          )
            .then(() => {
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
      }
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
