<template>
  <div class="authManagement-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" style="padding-left: 10px; padding-right: 10px;">
        <div class="tablemanage-operate" style="background:#fff;padding-top:10px;display:flex;justify-content:flex-end;">
            <el-button type="primary" plain size="small" @click="openLeftEditDia('')">新增</el-button>
        </div>
        <el-tree
          :data="leftRuleList"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="['root']"
          @node-click="handleNodeClick" >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => openLeftEditDia(data)">编辑</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18" style="padding:10px;background:#fff;">
        <div class="tablemanage-operate">
            <h3>API权限</h3>
            <el-button type="primary" plain size="small" @click="editTableData('')">新增</el-button>
        </div>
        <div class="meta" style="margin-bottom:10px;"></div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="path" label="PATH"></el-table-column>
            <el-table-column prop="method" label="请求方法"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column label="操作" fixed="right" width="160">
                <template slot-scope="scope">
                    <el-button plain type="primary" size="mini" @click="editTableData(scope.row)">编辑</el-button>
                    <el-button plain type="danger" size="mini" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :total="total" @current-change="currentPageChange" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
      </el-col>
    </el-row>
    <AuthLeftEdit :isShow.sync="isShowLeftEdit" :editData="editDataLeftEdit" />
    <AuthManagementEdit :isShow.sync="isShowTableEdit" :editData="editDataTableEdit" />
  </div>
</template>

<script>
  import AuthLeftEdit from '@components/auth/AuthLeftEdit'
  import AuthManagementEdit from '@components/auth/AuthManagementEdit'

  export default {
    name: 'MenuManagement',
    components: { AuthLeftEdit, AuthManagementEdit },
    data() {
      return {
        leftRuleList: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        tableData: [],
        ruleClassifyId: null,
        editDataLeftEdit: {},
        isShowLeftEdit: false,
        editDataTableEdit: {},
        isShowTableEdit: false,
        total: 0,
        currentPage: 1
      }
    },
    created() {
        this.getLeftRuleList()
    },
    methods: {
        // 页码切换
        currentPageChange(val) {
            this.currentPage = val
            this.fetchTableData()
        },
        getLeftRuleList() {
            this.api.auth.fetchRuleClassifyList().then(res => {
                this.leftRuleList = res.data.results
                if (this.leftRuleList.length) {
                  this.ruleClassifyId = this.leftRuleList[0].id;
                  this.fetchTableData()
                }
            })
        },
        openLeftEditDia(data) {
          this.editDataLeftEdit = typeof data === 'string' ? {} : Object.assign({rule_classify: this.ruleClassifyId}, data)
          this.isShowLeftEdit=true;
        },
        remove(node, data) {
          this.$confirm('是否确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.api.auth.deleteRequestRuleClassify(data.id).then(res => {
                  if (res.code === 0) {
                      this.$message.success('删除成功')
                      this.getLeftRuleList()
                  } else {
                      this.$message.error(res.message||'')
                  }
              })
          }).catch(() => {});
        },
        handleNodeClick(node) {
            this.ruleClassifyId = node.id;
            this.fetchTableData()
        },
        fetchTableData() {
            this.api.auth.fetchRuleInfoList({rule_classify_id: this.ruleClassifyId, page: this.currentPage}).then(res => {
                this.tableData = res.data.results;
                this.total = res.data.count;
            })
        },
        editTableData(row) {
            this.editDataTableEdit = typeof row === 'string' ? {rule_classify: this.ruleClassifyId} : Object.assign({rule_classify: this.ruleClassifyId}, row)
            this.isShowTableEdit = true;
        },
        deleteData(data) {
            this.$confirm('是否确认删除当前权限?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.api.auth.deleteRequestRuleInfo(data.id).then(res => {
                    if (res.code === 0) {
                        this.$message.success('删除成功')
                        this.fetchTableData()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }).catch(() => {});
        },
    },
  }
</script>
<style lang="scss" scoped>
.authManagement-container {
    .tablemanage-operate {
        padding: 0px 10px 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .meta {
        background-color: #fafafa;
        border-top: 1px solid #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height .2s;
    }
    /deep/ .el-tree {
        padding: 0 10px 20px;
        box-sizing: border-box;
    }
    /deep/ .el-divider--horizontal {
        margin: 10px 0;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
}
</style>