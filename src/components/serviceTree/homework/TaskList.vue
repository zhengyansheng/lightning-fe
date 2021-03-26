<template>
    <div class="task-list-container">
        <el-input v-model="params.search" placeholder="请输入关键信息" style="width:200px" size="small" @keyup.enter.native="getTableData"></el-input>
        <el-table :data="tableData" v-loading="loading" stripe tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="hostname" label="任务ID">
                <template slot-scope="scope">
                    <el-link @click="showDrawerDetails(scope.row)">{{scope.row.hostname}}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="private_ip" label="任务名称"></el-table-column>
            <el-table-column prop="mem_total" label="命令类型"></el-table-column>
            <el-table-column prop="cpu_total" label="执行用户"></el-table-column>
            <el-table-column prop="type" label="任务状态"></el-table-column>
            <el-table-column prop="remark" label="执行时间"></el-table-column>
        </el-table>
        <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [],
                params: {
                    page: 1,
                    page_size: 10,
                    search: ''
                },
                total: 0,
                loading: false
            }
        },
        created() {
        },
        methods: {
            currentPageChange() {
                this.getTableList()
            },
        }
    }
</script>
<style lang="scss" scoped>
.task-list-container {

}
</style>
