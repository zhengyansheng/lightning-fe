<template>
    <div class="task-manage">
        <div>
            <el-input v-model="params.search" placeholder="请输入关键信息" style="width:300px" size="small" @keyup.enter.native="getTableData"></el-input>
            <el-button style="float:right;" type="primary" plain size="small" @click="createTask">创建任务</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading" stripe tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="task_id" label="任务ID" min-width="200">
                <template slot-scope="scope">
                    <el-link @click="showDrawerDetails(scope.row)">{{scope.row.task_id}}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="task_name" label="任务名称" min-width="100"></el-table-column>
            <el-table-column prop="script_file" label="脚本/剧本" min-width="100"></el-table-column>
            <el-table-column prop="task_state" label="任务状态" width="80"></el-table-column>
            <el-table-column prop="exec_interval" label="执行时间" width="80"></el-table-column>
            <el-table-column prop="create_user" label="操作用户"></el-table-column>
        </el-table>
        <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
        <CreateTask :isShow.sync="showTaskDia" :nodes="nodes" />
        <TaskDetail :isShow.sync="showTaskDetailDia" :taskData="taskData" />
    </div>
</template>
<script>
    import CreateTask from './CreateTask.vue'
    import TaskDetail from './TaskDetail.vue'
    export default {
        name: '',
        props: {
            nodes: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                tableData: [],
                params: {
                    page: 1,
                    page_size: 10,
                    search: ''
                },
                total: 0,
                loading: false,
                showTaskDia: false,
                taskData: {},
                showTaskDetailDia: false
            }
        },
        components: {
            CreateTask,
            TaskDetail
        },
        created() {
            this.getTableList();
        },
        methods: {
            getTableList() {
                this.api.homework.getTaskHistory(this.params).then(res => {
                    console.log(res);
                    this.tableData = res.data.results;
                })
            },
            currentPageChange() {
                this.getTableList()
            },
            showDrawerDetails(row) {
                this.showTaskDetailDia = true;
                this.taskData = Object.assign({}, row)
            },
            createTask() {
                this.showTaskDia = true
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
