<template>
<div class="workorders-history">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单系统</el-breadcrumb-item>
        <el-breadcrumb-item>工单历史</el-breadcrumb-item>
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
                <el-table-column label="创建人" min-width="150">
                    <template slot-scope="scope"><span>{{ scope.row.creator_detail.username}}</span></template>
                </el-table-column>
                <el-table-column label="下一个角色" min-width="150">
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
            </el-table>
            <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.pagesize" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import { Workorder, Workflow } from '@services/workflow'
import { workorderStatusOptions, workorderExecStatusOptions, reviewOptions, auditRecordOptions } from '@utils/dict'
import workflow from '@mixins/workflow.js'
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
    mixins: [workflow],
    data() {
        return {
            params: {
                page: 1,
                pagesize: 50,
                ordering: '-id',
                search: '',
                cur_user: undefined
            },
            total: 0,
            tableData: [],
            isDisabled: false,
            size: 'medium',
            menuSize: 'mini',
            loading: false
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
            // this.api.workflow.getWorkordersHistoryList(this.params).then(res => {
            //     if (Number(res.code) === 20000) {
            //         this.total = res.count
            //         this.tableData = res.results;
            //     }
            //     this.loading = false;
            // }).catch(err => {
            //     this.loading = false;
            //     console.log(err);
            // })
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
