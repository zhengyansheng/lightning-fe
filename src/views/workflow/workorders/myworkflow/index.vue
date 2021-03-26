<template>
<div class="myworkflow">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单系统</el-breadcrumb-item>
        <el-breadcrumb-item>工单</el-breadcrumb-item>
        <el-breadcrumb-item>我的工单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-main">
        <div class="search">
            <el-input clearable placeholder="请输入工单名" :size="size" v-model.trim="params.search" @keyup.enter.native="searchData" style="width: 192px"></el-input>
            <el-button type="primary" @click="searchData" :size="size">搜索</el-button>
        </div>
        <div class="clear"></div>
        <div class="list">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column label="工单名" min-width="150">
                    <template slot-scope="scope"><span style="cursor: pointer;" @click="handleDetail(scope.row)">{{ scope.row.cname }}</span></template>
                </el-table-column>
                <el-table-column label="角色">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cur_role_detail!=null&&scope.row.cur_user_detail!=null">{{ scope.row.cur_user_detail.username+"/"+scope.row.cur_role_detail.cname}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="执行状态" min-width="150">
                    <template slot-scope="scope"><span>{{ scope.row.exec_status|execStatusFilter}}</span></template>
                </el-table-column>
                <el-table-column label="工单状态" min-width="150">
                    <template slot-scope="scope"><span>{{ scope.row.status|woStatusFilter}}</span></template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="update_time" label="更新时间" width="180"></el-table-column>
                <el-table-column label="操作" fixed="right" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button plain size="mini" @click="handleRevoke(scope.row)" v-if="scope.row.status==2 ||scope.row.status==3">撤回</el-button>
                        <el-button plain size="mini" @click="handleFeedBack(scope.row)" v-if="scope.row.status==4">反馈</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.pagesize" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
        </div>
    </div>
    <WorkorderForm :isShow.sync="isShowWorkorderForm" />
</div>
</template>

<script>
import {
    Workflow,
    Workflowgroup,
    Workorder
} from '@services/workflow'
import {
    workorderStatusOptions,
    workorderExecStatusOptions,
    reviewOptions,
    feedbackOptions,
    auditRecordOptions
} from '@utils/dict'
// import workflow from '@mixins/workflow.js'
import WorkorderForm from '@components/workflow/WorkorderForm'
const statusKeyValue = workorderStatusOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})
const execStatusKeyValue = workorderExecStatusOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})
export default {
    name: '',
    // mixins: [workflow],
    components: {
        WorkorderForm
    },
    data() {
        return {
            params: {
                action: 'sent',
                page: 1,
                pagesize: 10,
                ordering: '-id',
                search: ''
            },
            total: 0,
            tableData: [],
            isDisabled: false,
            size: 'medium',
            menuSize: 'mini',
            loading: false,
            isShowWorkorderForm: false
        }
    },
    filters: {
        woStatusFilter(status) {
            return statusKeyValue[status]
        },

        execStatusFilter(status) {
            return execStatusKeyValue[status]
        },
        reviewFilter(opinion) {
            for (var i = 0; i < auditRecordOptions.length; i++) {
                if (opinion == auditRecordOptions[i].key) {
                    return auditRecordOptions[i].display_name
                }
            }
        },
    },
    created() {
        this.getTableList();
    },
    methods: {
        // 获取列表
        getTableList() {
            if (this.loading) return false;
            this.loading = true;
            Workorder.list(this.params).then(response => {
                this.tableData = response.results
                this.total = response.count
                this.loading = false
            })
        },
        // 页码切换
        currentPageChange() {
            this.getTableList();
        },
        // 搜索
        searchData() {
            this.params.page = 1;
            this.getTableList();
        },
        // 反馈
        handleFeedBack(row) {
            this.isShowWorkorderForm = true;
        },
        // 撤回
        handleRevoke(row) {
            this.$confirm('是否确认撤回工单？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                var params = {}
                params.id = row.id
                params.opinion = 10
                Workorder.revoke(params.id, params).then(response => {
                    response['opinion'] === 1 ? this.$message.error('当前工单状态无法撤回') : this.$message.success('撤回成功')
                    this.getTableList()
                })
            }).catch(() => {});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
