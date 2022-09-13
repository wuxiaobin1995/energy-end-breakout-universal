<!--
 * @Author      : 吴晓斌
 * @Date        : 2020-09-11 16:19:06
 * @LastEditTime: 2021-09-08 16:13:01
 * @Description : 训练动作
-->
<template>
  <div class="container">
    <!-- 按钮组 -->
    <div class="btn-wrapper">
      <!-- 添加训练动作按钮 -->
      <el-button class="btn" type="success" @click="handleShowAddDialog"
        >添加训练动作</el-button
      >
      <!-- 导出Excel -->
      <el-button
        class="btn"
        :loading="exportLoading"
        type="success"
        icon="el-icon-upload"
        @click="handleExportExcel"
        >导出训练动作Excel</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%;"
      height="82vh"
      highlight-current-row
      :border="true"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- No -->
      <el-table-column align="center" type="index" label="No" width="50" />
      <!-- 编辑按钮 -->
      <el-table-column align="center" label="编辑操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleShowUpdateDialog(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <!-- 动作名称 -->
      <el-table-column
        align="center"
        prop="actionId"
        label="动作名称"
        width="300"
        sortable
      />
      <!-- 描述 -->
      <el-table-column align="center" prop="trainDescription" label="描述" />
      <!-- 删除按钮 -->
      <el-table-column align="center" label="删除操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗-添加 -->
    <el-dialog
      title="添加训练动作"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      @close="handleCloseAddDialog"
    >
      <!-- 表单 -->
      <el-form
        ref="formAdd"
        :model="formAdd"
        :rules="rulesAdd"
        label-width="80px"
      >
        <!-- 动作名称 -->
        <el-form-item label="动作名称" prop="actionId">
          <el-input
            type="text"
            placeholder="请输入动作名称，字数不能超过40个字符，且不能为空"
            v-model.trim="formAdd.actionId"
            maxlength="40"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述" prop="trainDescription">
          <el-input
            type="textarea"
            placeholder="请输入动作描述，字数不能超过300个字符"
            v-model.trim="formAdd.trainDescription"
            maxlength="300"
            show-word-limit
            :rows="10"
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 按钮组 -->
        <el-form-item>
          <el-button type="primary" @click="handleAddAction('formAdd')"
            >确 定 添 加</el-button
          >
          <el-button
            style="margin-left: 40px;"
            type="danger"
            @click="dialogVisibleAdd = false"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹窗-更新 -->
    <el-dialog
      title="更新训练动作"
      :visible.sync="dialogVisibleUpdate"
      :close-on-click-modal="false"
      @close="handleCloseUpdateDialog"
    >
      <!-- 表单 -->
      <el-form
        ref="formUpdate"
        :model="formUpdate"
        :rules="rulesUpdate"
        label-width="80px"
      >
        <!-- 动作名称 -->
        <el-form-item label="动作名称" prop="actionId">
          <el-input
            type="text"
            placeholder="请输入动作名称，字数不能超过40个字符，且不能为空"
            v-model.trim="formUpdate.actionId"
            maxlength="40"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述" prop="trainDescription">
          <el-input
            type="textarea"
            placeholder="请输入动作描述，字数不能超过300个字符"
            v-model.trim="formUpdate.trainDescription"
            maxlength="300"
            show-word-limit
            :rows="10"
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 按钮组 -->
        <el-form-item>
          <el-button type="primary" @click="handleUpdateAction('formUpdate')"
            >确 定 更 新</el-button
          >
          <el-button
            style="margin-left: 40px;"
            type="danger"
            @click="dialogVisibleUpdate = false"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/* indexDB数据库 */
import { initDB } from '@/db/index.js'

export default {
  name: 'ActionManage',

  data() {
    return {
      /* 表格数据 */
      tableData: [],
      loading: true, // 表格加载动画
      exportLoading: false, // 导出表格按钮加载动画
      dialogVisibleAdd: false, // 控制添加弹窗的显隐
      dialogVisibleUpdate: false, // 控制更新弹窗的显隐
      lastActionId: '', // 当前选中行的动作名称
      /* 表单数据 */
      formAdd: {
        actionId: '', // 动作名称
        trainDescription: '' // 动作描述
      },
      formUpdate: {
        actionId: '', // 动作名称
        trainDescription: '' // 动作描述
      },
      /* 表单验证规则 */
      rulesAdd: {
        actionId: [
          {
            required: true,
            message: '动作名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      rulesUpdate: {
        actionId: [
          {
            required: true,
            message: '动作名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created() {
    this.getActionData() // 从action表获取数据，用于初始化表格
  },

  methods: {
    /**
     * @description: 从action表获取数据，用于初始化表格
     */
    getActionData() {
      const db = initDB()
      this.loading = true
      db.action
        .toArray()
        .then(res => {
          this.tableData = res
        })
        .catch(() => {
          this.$message({
            message: '初始化训练动作表格失败，请刷新页面或重启设备',
            type: 'error'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },

    /**
     * @description: 同步更新train_data表中的训练动作
     */
    updateTrainDataAction() {
      if (this.lastActionId !== this.formUpdate.actionId) {
        const db = initDB()
        db.train_data
          .where('actionId')
          .anyOf(this.lastActionId)
          .modify({ actionId: this.formUpdate.actionId })
          .then(() => {
            this.$message({
              message: '同步更新train_data表中的训练动作成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '同步更新train_data表中的训练动作失败',
              type: 'error'
            })
          })
      }
    },

    /**
     * @description: 显示添加动作弹窗按钮
     */
    handleShowAddDialog() {
      this.formAdd.actionId = '' // 清空训练动作名称
      this.formAdd.trainDescription = '' // 清空动作描述
      this.dialogVisibleAdd = true // 显示添加动作弹窗
    },

    /**
     * @description: 显示更新动作弹窗按钮
     * @param {Number} index 数据的下标，从0开始
     * @param {Object} row 选中的该行的数据
     */
    handleShowUpdateDialog(index, row) {
      this.lastActionId = row.actionId // 记录当前选中行的动作名称
      this.formUpdate.actionId = row.actionId // 初始化表单的训练动作名称
      this.formUpdate.trainDescription = row.trainDescription // 初始化表单的动作描述
      this.dialogVisibleUpdate = true // 显示更新动作弹窗
    },

    /**
     * @description: 确定添加动作
     * @param {String} formName 表单的名称
     */
    handleAddAction(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const db = initDB()
          db.action
            .add(this.formAdd)
            .then(() => {
              this.$message({
                message: '添加动作成功',
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                message: '添加动作失败，该动作已存在',
                type: 'error'
              })
            })
            .finally(() => {
              this.dialogVisibleAdd = false // 隐藏添加动作弹窗
              this.getActionData() // 重新初始化表格
            })
        } else {
          return false
        }
      })
    },

    /**
     * @description: 确定更新动作
     * @param {String} formName 表单的名称
     */
    handleUpdateAction(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const db = initDB()
          db.action
            .update(this.lastActionId, this.formUpdate)
            .then(() => {
              this.$message({
                message: '更新动作成功',
                type: 'success'
              })
            })
            .then(() => {
              this.updateTrainDataAction() // 同步更新train_data表中的训练动作
            })
            .catch(() => {
              this.$message({
                message: '更新动作失败，该动作已存在',
                type: 'error'
              })
            })
            .finally(() => {
              this.dialogVisibleUpdate = false // 隐藏更新动作弹窗
              this.getActionData() // 重新初始化表格
            })
        } else {
          return false
        }
      })
    },

    /**
     * @description: 删除按钮
     * @param {Number} index 数据的下标，从0开始
     * @param {Object} row 选中的该行的数据
     */
    handleDelete(index, row) {
      this.$confirm('此操作将"永久删除"该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const db = initDB()
          db.action
            .delete(row.actionId)
            .then(() => {
              this.$message({
                message: '删除动作成功',
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                message: '删除动作失败',
                type: 'error'
              })
            })
            .finally(() => {
              this.getActionData() // 重新初始化表格
            })
        })
        .catch(() => {})
    },

    /**
     * @description: 关闭Dialog时触发的回调，清空整个表单的校验结果
     */
    handleCloseAddDialog() {
      this.$refs.formAdd.clearValidate()
    },
    handleCloseUpdateDialog() {
      this.$refs.formUpdate.clearValidate()
    },

    /**
     * @description: 导出Excle表逻辑
     */
    handleExportExcel() {
      if (!this.tableData.length) {
        this.$message({
          message: '表格数据不能为空',
          type: 'error'
        })
        return
      }
      this.exportLoading = true
      // 此处使用懒加载的方式
      import('@/utils/Export2Excel.js')
        .then(excel => {
          const excelTitle = {
            actionId: '动作名称',
            trainDescription: '描述'
          }
          const tHeader = Object.values(excelTitle)
          // 会根据key键的顺序、属性值等动态变化
          const filterVal = Object.keys(excelTitle)
          const exportData = this.formatJson(filterVal, this.tableData)
          excel.export_json_to_excel({
            header: tHeader, // 表头 必填
            data: exportData, // 具体数据 必填
            filename:
              '训练动作配置表 ' + this.$moment().format('YYYY-MM-DD HH_mm_ss'), // 非必填
            autoWidth: true, // 非必填
            bookType: this.exportFormat // 非必填
          })
        })
        .then(() => {
          this.$message({
            message: '导出表格成功',
            type: 'success'
          })
        })
        .catch(err => {
          this.$message({
            message: '导出表格失败：' + err,
            type: 'error'
          })
        })
        .finally(() => {
          this.exportLoading = false
        })
    },
    /**
     * @description: 数据格式化
     * @param {Array} filterVal key键
     * @param {Array} jsonData 一维数据 [{},{},...]
     * @return {Array} 二维数组 [[],[],...]
     */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  /* 按钮组 */
  .btn-wrapper {
    display: flex;
    align-items: center;
    margin: 12px 0;
    .btn {
      font-size: 18px;
      margin-right: 16px;
    }
  }
}
</style>
