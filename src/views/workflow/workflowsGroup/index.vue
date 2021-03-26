<template>
<div class="workorders-history">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单系统</el-breadcrumb-item>
        <el-breadcrumb-item>添加工作组</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-main">
        <div class="search">
            <el-input clearable placeholder="请输入关键字" :size="size" v-model.trim="params.name" @keyup.enter.native="searchData" style="width: 192px"></el-input>
            <el-button type="primary" @click="searchData" :size="size">搜索</el-button>
            <el-button class="add-btn" type="primary" :size="size" @click="handleUpdate('add')">新建</el-button>
        </div>
        <div class="clear"></div>
        <div class="list">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe>
                <el-table-column :label="'英文名'">
                    <template slot-scope="scope">
                        <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'中文名'">
                    <template slot-scope="scope">
                        <span>{{ scope.row.cname }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'备注 '">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'创建时间'">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column class-name="small-padding fixed-width" fixed="right" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.pagesize" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
        </div>
    </div>
    <AddWorkflowGroup :isShow.sync="isShow" :editData="editData" />
</div>
</template>

<script>
import { Workflowgroup } from '@services/workflow'
import AddWorkflowGroup from '@components/workflow/AddWorkflowGroup'
export default {
    name: '',
    data() {
        return {
            params: {
                page: 1,
                pagesize: 10,
                name: undefined,
                ordering: '-id',
                search: ''
            },
            total: 0,
            tableData: [],
            isDisabled: false,
            size: 'medium',
            menuSize: 'mini',
            loading: false,
            editData: {},
            isShow: false
        }
    },
    components: {
        AddWorkflowGroup
    },
    created() {
        this.getTableList();
    },
    methods: {
        // 获取列表
        getTableList() {
            if (this.loading) return false;
            this.loading = true;
            Workflowgroup.list(this.params).then(res => {
                this.total = res.count
                this.tableData = res.results;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                console.log(err);
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
        // 删除
        handleDelete(row) {
            this.$confirm('是否删除此工作组？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                Workflowgroup.delete(row.id).then(data => {
                    this.$message.warning(data.message);
                    this.getTableList();
                })
            }).catch(() => {});
        },
        // 编辑/添加
        handleUpdate(row) {
            this.isShow = true;
            if (row === 'add') {
                this.editData = {
                    name: '',
                    cname: '',
                    remark: ''
                }
            } else {
                this.editData = Object.assign({}, row);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
