<!--
 * @Author      : 吴晓斌
 * @Date        : 2020-09-11 16:19:06
 * @LastEditTime: 2021-09-08 16:13:32
 * @Description : 用户管理
-->
<template>
  <div class="container">
    <!-- 按钮组 -->
    <div class="btn-wrapper">
      <!-- 添加用户按钮 -->
      <el-button class="btn" type="success" @click="handleShowAddDialog"
        >添加用户</el-button
      >
      <!-- 导出Excel -->
      <el-button
        class="btn"
        :loading="exportLoading"
        type="success"
        icon="el-icon-upload"
        @click="handleExportExcel"
        >导出用户配置Excel</el-button
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
      <!-- 用户名 -->
      <el-table-column
        align="center"
        prop="userId"
        label="用户名"
        width="160"
        sortable
      />
      <!-- 分组 -->
      <el-table-column
        align="center"
        prop="userGroup"
        label="分组"
        width="160"
        sortable
      />
      <!-- 出生日期 -->
      <el-table-column
        align="center"
        prop="birthday"
        label="出生日期"
        width="120"
        sortable
      />
      <!-- 性别 -->
      <el-table-column
        align="center"
        prop="sex"
        label="性别"
        width="80"
        sortable
      />
      <!-- 身高 -->
      <el-table-column
        align="center"
        prop="bodyHeight"
        label="身高[cm]"
        width="120"
        sortable
      />
      <!-- 体重 -->
      <el-table-column
        align="center"
        prop="bodyWeight"
        label="体重[kg]"
        width="120"
        sortable
      />
      <!-- 备注 -->
      <el-table-column align="center" prop="description" label="备注" />
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
      title="添加用户信息"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      top="6vh"
      @close="handleCloseAddDialog"
    >
      <!-- 表单 -->
      <el-form
        ref="formAdd"
        :model="formAdd"
        :rules="rulesAdd"
        label-width="80px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="userId">
          <el-input
            type="text"
            placeholder="请输入用户名称，字数不能超过40个字符，且不能为空"
            v-model.trim="formAdd.userId"
            :maxlength="40"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <!-- 带输入建议的分组 -->
        <el-form-item label="分组" prop="userGroup">
          <el-autocomplete
            placeholder="请输入分组"
            v-model.trim="formAdd.userGroup"
            :maxlength="30"
            show-word-limit
            clearable
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
        </el-form-item>
        <!-- 出生日期 -->
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="formAdd.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :editable="false"
            :clearable="false"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formAdd.sex" placeholder="请选择性别">
            <el-option
              v-for="(item, index) in sexOptions"
              :key="index"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 身高 -->
        <el-form-item label="身高" prop="bodyHeight">
          <el-input
            type="text"
            placeholder="请输入身高"
            v-model.trim="formAdd.bodyHeight"
            :maxlength="3"
            show-word-limit
          >
            <template slot="append">cm</template>
          </el-input>
        </el-form-item>
        <!-- 体重 -->
        <el-form-item label="体重" prop="bodyWeight">
          <el-input
            type="text"
            placeholder="请输入体重"
            v-model.trim="formAdd.bodyWeight"
            :maxlength="3"
            show-word-limit
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入备注，字数不能超过120个字符"
            v-model.trim="formAdd.description"
            :maxlength="120"
            show-word-limit
            :rows="6"
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 按钮组 -->
        <el-form-item>
          <el-button type="primary" @click="handleAddUser('formAdd')"
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
      title="更新用户信息"
      :visible.sync="dialogVisibleUpdate"
      :close-on-click-modal="false"
      top="6vh"
      @close="handleCloseUpdateDialog"
    >
      <!-- 表单 -->
      <el-form
        ref="formUpdate"
        :model="formUpdate"
        :rules="rulesUpdate"
        label-width="80px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="userId">
          <el-input
            type="text"
            placeholder="请输入用户名称，字数不能超过40个字符，且不能为空"
            v-model.trim="formUpdate.userId"
            :maxlength="40"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <!-- 带输入建议的分组 -->
        <el-form-item label="分组" prop="userGroup">
          <el-autocomplete
            placeholder="请输入分组"
            v-model.trim="formUpdate.userGroup"
            :maxlength="30"
            show-word-limit
            clearable
            :fetch-suggestions="querySearch"
          ></el-autocomplete>
        </el-form-item>
        <!-- 出生日期 -->
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="formUpdate.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :editable="false"
            :clearable="false"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formUpdate.sex" placeholder="请选择性别">
            <el-option
              v-for="(item, index) in sexOptions"
              :key="index"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 身高 -->
        <el-form-item label="身高" prop="bodyHeight">
          <el-input
            type="text"
            placeholder="请输入身高"
            v-model.trim="formUpdate.bodyHeight"
            :maxlength="3"
            show-word-limit
          >
            <template slot="append">cm</template>
          </el-input>
        </el-form-item>
        <!-- 体重 -->
        <el-form-item label="体重" prop="bodyWeight">
          <el-input
            type="text"
            placeholder="请输入体重"
            v-model.trim="formUpdate.bodyWeight"
            :maxlength="3"
            show-word-limit
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入备注，字数不能超过120个字符"
            v-model.trim="formUpdate.description"
            :maxlength="120"
            show-word-limit
            :rows="6"
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 按钮组 -->
        <el-form-item>
          <el-button type="primary" @click="handleUpdateUser('formUpdate')"
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
  name: 'UserManage',

  data() {
    return {
      /* 表格数据 */
      tableData: [],
      loading: true, // 表格加载动画
      exportLoading: false, // 导出表格按钮加载动画
      dialogVisibleAdd: false, // 控制添加弹窗的显隐
      dialogVisibleUpdate: false, // 控制更新弹窗的显隐
      lastUserId: '', // 当前选中行的用户id
      lastUserGroup: '', // 当前选中行的分组
      sexOptions: ['男', '女'], // 性别下拉框
      adviceUserGroup: [], // 分组建议列表
      /* 表单数据 */
      formAdd: {
        userId: '', // 用户id
        userGroup: '', // 分组
        birthday: '', // 出生日期
        sex: '', // 性别
        bodyHeight: 0, // 身高
        bodyWeight: 0, // 体重
        description: '' // 备注
      },
      formUpdate: {
        userId: '', // 用户id
        userGroup: '', // 分组
        birthday: '', // 出生日期
        sex: '', // 性别
        bodyHeight: 0, // 身高
        bodyWeight: 0, // 体重
        description: '' // 备注
      },
      /* 表单验证规则 */
      rulesAdd: {
        userId: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        userGroup: [
          {
            required: true,
            message: '分组不能为空',
            trigger: 'blur'
          }
        ]
      },
      rulesUpdate: {
        userId: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        userGroup: [
          {
            required: true,
            message: '分组不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created() {
    this.getUserData() // 从user表获取数据，用户初始化表格
  },

  methods: {
    /**
     * @description: 带输入建议的分组逻辑方法
     */
    querySearch(queryString, cb) {
      const restaurants = this.adviceUserGroup
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    // 从tableData获取分组建议列表
    loadAll() {
      this.adviceUserGroup = []
      const obj = {} // 用于去重复
      for (let i = 0; i < this.tableData.length; i++) {
        if (!obj[this.tableData[i].userGroup]) {
          this.adviceUserGroup.push({ value: this.tableData[i].userGroup })
          obj[this.tableData[i].userGroup] = true
        }
      }
    },

    /**
     * @description: 从user表获取数据，用户初始化表格
     */
    getUserData() {
      const db = initDB()
      this.loading = true
      db.user
        .toArray()
        .then(res => {
          this.tableData = res
        })
        .catch(() => {
          this.$message({
            message: '初始化用户表格失败，请刷新页面或重启设备',
            type: 'error'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },

    /**
     * @description: 同步更新train_data表中的用户名或分组
     */
    updateTrainDataUserOrUserGroup() {
      // 只改用户
      if (
        this.lastUserId !== this.formUpdate.userId &&
        this.lastUserGroup === this.formUpdate.userGroup
      ) {
        const db = initDB()
        db.train_data
          .where('userId')
          .anyOf(this.lastUserId)
          .modify({ userId: this.formUpdate.userId })
          .then(() => {
            this.$message({
              message: '同步更新train_data表中的用户名成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '同步更新train_data表中的用户名失败',
              type: 'error'
            })
          })
      }
      // 只改分组
      if (
        this.lastUserId === this.formUpdate.userId &&
        this.lastUserGroup !== this.formUpdate.userGroup
      ) {
        const db = initDB()
        db.train_data
          .where('userId')
          .anyOf(this.lastUserId)
          .modify({ userGroup: this.formUpdate.userGroup })
          .then(() => {
            this.$message({
              message: '同步更新train_data表中的分组成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '同步更新train_data表中的分组失败',
              type: 'error'
            })
          })
      }
      // 用户、分组均改
      if (
        this.lastUserId !== this.formUpdate.userId &&
        this.lastUserGroup !== this.formUpdate.userGroup
      ) {
        const db = initDB()
        db.train_data
          .where('userId')
          .anyOf(this.lastUserId)
          .modify({
            userId: this.formUpdate.userId,
            userGroup: this.formUpdate.userGroup
          })
          .then(() => {
            this.$message({
              message: '同步更新train_data表中的用户名和分组成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '同步更新train_data表中的用户名和分组失败',
              type: 'error'
            })
          })
      }
    },

    /**
     * @description: 显示添加动作弹窗按钮
     */
    handleShowAddDialog() {
      this.loadAll() // 获取分组输入建议
      this.formAdd.userId = ''
      this.formAdd.userGroup = '' // 分组
      this.formAdd.birthday = '' // 出生日期
      this.formAdd.sex = '男' // 性别
      this.formAdd.bodyHeight = 0 // 身高
      this.formAdd.bodyWeight = 0 // 体重
      this.formAdd.description = '' // 备注
      this.dialogVisibleAdd = true // 显示添加动作弹窗
    },

    /**
     * @description: 显示更新动作弹窗按钮
     * @param {Number} index 数据的下标，从0开始
     * @param {Object} row 选中的该行的数据
     */
    handleShowUpdateDialog(index, row) {
      this.loadAll() // 获取分组输入建议
      this.lastUserId = row.userId // 记录当前选中行的用户id
      this.lastUserGroup = row.userGroup // 记录当前选中行的分组
      this.formUpdate.userId = row.userId // 初始化表单的用户名
      this.formUpdate.userGroup = row.userGroup // 初始化表单的分组
      this.formUpdate.birthday = row.birthday // 初始化表单的出生日期
      this.formUpdate.sex = row.sex // 初始化表单的性别
      this.formUpdate.bodyHeight = row.bodyHeight // 初始化表单的身高
      this.formUpdate.bodyWeight = row.bodyWeight // 初始化表单的体重
      this.formUpdate.description = row.description // 初始化表单的描述
      this.dialogVisibleUpdate = true // 显示编辑弹出窗口
    },

    /**
     * @description: 确定添加用户
     * @param {String} formName 表单的名称
     */
    handleAddUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const db = initDB()
          db.user
            .add(this.formAdd)
            .then(() => {
              this.$message({
                message: '添加用户成功',
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                message: '添加用户失败，该用户已存在',
                type: 'error'
              })
            })
            .finally(() => {
              this.dialogVisibleAdd = false // 隐藏添加动作弹窗
              this.getUserData() // 重新初始化表格
            })
        } else {
          return false
        }
      })
    },

    /**
     * @description: 确定更新用户
     * @param {String} formName 表单的名称
     */
    handleUpdateUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const db = initDB()
          db.user
            .update(this.lastUserId, this.formUpdate)
            .then(() => {
              this.$message({
                message: '更新用户成功',
                type: 'success'
              })
            })
            .then(() => {
              this.updateTrainDataUserOrUserGroup() // 同步更新train_data表中的用户名或分组
            })
            .catch(() => {
              this.$message({
                message: '更新用户失败，该用户已存在',
                type: 'error'
              })
            })
            .finally(() => {
              this.dialogVisibleUpdate = false // 隐藏更新动作弹窗
              this.getUserData() // 重新初始化表格
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
          db.user
            .delete(row.userId)
            .then(() => {
              this.$message({
                message: '删除用户成功',
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                message: '删除用户失败',
                type: 'error'
              })
            })
            .finally(() => {
              this.getUserData() // 重新初始化表格
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
            userId: '用户名',
            userGroup: '分组',
            birthday: '出生日期',
            sex: '性别',
            bodyHeight: '身高[cm]',
            bodyWeight: '体重[kg]',
            description: '备注'
          }
          const tHeader = Object.values(excelTitle)
          // 会根据key键的顺序、属性值等动态变化
          const filterVal = Object.keys(excelTitle)
          const exportData = this.formatJson(filterVal, this.tableData)
          excel.export_json_to_excel({
            header: tHeader, // 表头 必填
            data: exportData, // 具体数据 必填
            filename:
              '用户配置表 ' + this.$moment().format('YYYY-MM-DD HH_mm_ss'), // 非必填
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
