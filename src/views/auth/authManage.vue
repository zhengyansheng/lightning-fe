<template>
  <div class="authManagement-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" style="padding-left: 10px; padding-right: 10px;">
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="['root']"
          @node-click="handleNodeClick"
        ></el-tree>
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
      </el-col>
    </el-row>
    <AuthLeftEdit :isShow="isShowLeftEdit" :editData="editDataLeftEdit" />
    <AuthManagementEdit :isShow="isShowTableEdit" :editData="editDataTableEdit" />
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
        data: [],
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
      }
    },
    created() {
        this.getLeftRuleList()
    },
    methods: {
        getLeftRuleList() {
            this.api.auth.fetchRuleInfoList().then(res => {
                console.log(res);
                this.tableData = res.data.data
            })
        },
        handleNodeClick(node) {
            console.log('node', node)
            this.ruleClassifyId = node.id;
            this.fetchTableData()
        },
        fetchTableData() {
            this.api.auth.fetchRuleInfoList({rule_classify_id: this.ruleClassifyId}).then(res => {
                console.log(res);
                this.tableData = res.data.data
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
                    if (res.code === 2000) {
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
}
</style>