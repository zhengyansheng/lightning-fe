<template>
   <div class="list-main">
       <div class="search">
            <el-input clearable placeholder="请输入工单名" :size="size" v-model.trim="params.search" @keyup.enter.native="searchData" style="width: 192px"></el-input>
            <el-button type="primary" @click="searchData" :size="size">搜索</el-button>
            <el-checkbox v-model="mine" style="margin-left:10px;" @change="changeMine">Mine</el-checkbox>
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
                <el-table-column label="操作" fixed="right" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button :size="menuSize" plain @click="handleReview(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.pagesize" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
        </div>
        <ShowWorkorderDetail :isShow.sync="showWorkorderDetail" />
   </div>
</template>
<script>
    import { Workorder } from '@services/workflow'
    import workflow from '@mixins/workflow.js'
    export default {
       name: '',
       mixins: [workflow],
       data() {
           return {
                params: {
                    page: 1,
                    pagesize: 10,
                    ordering: '-id',
                    search: '',
                    action: 'waiting',
                    cur_user: undefined
                },
                total: 0,
                tableData: [],
                isDisabled: false,
                size: 'medium',
                menuSize: 'mini',
                loading: false,
                mine: false
           }
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
            // 切换Mine
            changeMine(val) {
                if (val) {
                    this.params.cur_user = this.$store.getters.user_id
                } else {
                    this.params.cur_user = undefined
                }
                this.getTableList();
            },
            // 审核
            handleReview(row) {
                console.log(row);
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
