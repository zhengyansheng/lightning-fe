<template>
<div class="workorders-history">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单系统</el-breadcrumb-item>
        <el-breadcrumb-item>工作流配置</el-breadcrumb-item>
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
                <el-table-column :label="'工单英文名'" min-width="150px">
                    <template slot-scope="scope">
                        <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'工单中文名'" min-width="170px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.cname }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'审批流程'" min-width="170px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.steps }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'类型'" min-width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.wftype }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'工单组'" min-width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.group_cname }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'激活状态'" min-width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.is_active_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'备注'" min-width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'创建时间'" width="170">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column class-name="small-padding fixed-width" fixed="right" label="操作" width="320">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/workflow/formfields/', query: { workflowid: scope.row.id,workflowname:scope.row.name}}">
                            <el-button type="primary" size="mini" style="width: 70px;margin-right:5px">
                                工单项
                            </el-button>
                        </router-link>
                        <router-link :to="{ path:'/workflow/auditsteps/', query: { workflowid: scope.row.id,workflowname:scope.row.name}}">
                            <el-button type="primary" size="mini" style="width: 70px;margin-right:5px">
                                审批流
                            </el-button>
                        </router-link>
                        <el-button v-if="scope.row.name!='demo'" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row.id)">编辑</el-button>
                        <el-button v-if="scope.row.name!='demo'" type="text" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
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
import { Workflow, Workflowgroup } from '@services/workflow'
import AddWorkflowGroup from '@components/workflow/AddWorkflowGroup'
import {isRealObj} from '@utils'
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
            Workflow.list(this.params).then(response => {
                this.tableData = []
                for (var i = 0; i < response.results.length; i++) {
                    var obj = response.results[i]
                    if (isRealObj(obj["script"])) {
                        obj["wftype"] = '自动'
                    } else {
                        obj["wftype"] = '人工'
                    }
                    if (obj["is_active"]) {
                        obj["is_active_name"] = "是"
                    } else {
                        obj["is_active_name"] = "否"
                    }
                    this.tableData.push(obj)
                }
                this.total = response.count
                // this.tableData = response.results;
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
            this.$confirm('是否删除此工作流配置？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                Workflow.delete(row.id).then(data => {
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
