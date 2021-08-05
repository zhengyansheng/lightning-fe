<template>
<div class="data-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>资源管理</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-main">
        <div class="search">
            <el-select v-model="classificationValue" placeholder="请选择类型" :size="size" @change="getTableList">
                <el-option v-for="(item, index) in classificationOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="tableId" placeholder="请选择表" :size="size" @change="getTableValueFunc">
                <el-option v-for="(tableItem, tableIndex) in tableOptions" :key="tableIndex" :label="tableItem.alias" :value="tableItem.id"></el-option>
            </el-select>
        </div>
        <div class="clear"></div>
        <div class="list">
            <h3>数据管理</h3>
            <el-divider></el-divider>
            <div v-if="tableId !== ''">
                <div>
                    <el-input :size="size" placeholder="请输入内容" v-model="listQuery.searchValue" @keyup.enter.native="handleFilter" class="input-with-select" style="width:500px; margin-bottom: 10px;">
                        <el-select v-model="listQuery.searchKey" slot="prepend" placeholder="请选择" style="width:150px;">
                            <el-option v-for="(dataItem, dataIndex) in tableValue.fields" :key="dataIndex" :label="dataItem.alias" :value="dataItem.name"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
                    </el-input>
                    <el-button :size="size" class="filter-item add-btn" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新建</el-button>
                </div>
                <el-table :data="dataList" border style="width: 100%; margin-top: 12px">
                    <el-table-column v-for="(dataItem, dataIndex) in tableValue.fields" :key="dataIndex" :prop="dataItem.name" :label="dataItem.alias" />
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="{row,$index}">
                            <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='listQuery.page' :page-size="listQuery.limit" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
            </div>
            <div v-else class="no-data">
                请选择类型和表，来加载数据
            </div>
        </div>
    </div>
    <EditClassification :isShow.sync="isShow" :editData="editData" />
    <el-dialog :title="textMap[dialogStatus]==='Create'?'添加数据': '编辑数据'" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :inline="true"
        :model="tableData"
        label-width="80px"
      >
        <el-form-item
          v-for="(tableFieldsItem, tableFieldsIndex) in tableValue.fields"
          :key="tableFieldsIndex"
          :label="tableFieldsItem.alias + ': '"
          :prop="tableFieldsItem.required===true?tableFieldsItem.name:''">
          <el-input v-model="tableData[tableFieldsItem.name]" :placeholder="'请输入' + tableFieldsItem.alias" size="small" style="width: 120%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createDataFunc():updateDataFunc()">提交</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import EditClassification from '@components/cmdb/editClassification';
export default {
    name: '',
    data() {
        return {
            size: 'medium',
            menuSize: 'mini',
            editData: {},
            isShow: false,
            tableData: {},
            classificationValue: '',
            tableId: '',
            tableValue: '',
            dialogTableVisible: false,
            tableOptions: [],
            tableKey: 0,
            list: null,
            dataList: [],
            classificationOptions: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 10
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: 'Edit',
                create: 'Create'
            },
            rules: {}
        }
    },
    components: {
        EditClassification
    },
    created() {
        this.getClassificationList();
    },
    methods: {
        // 获取类型列表
        getClassificationList() {
            const params = {
                page: 1,
                limit: 999999
            }
            this.api.cmdb.getClassificationList(params).then(res => {
                if (Number(res.code) === 20000) {
                    this.classificationOptions = res.data.list;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        // 获取表列表
        getTableList() {
            this.tableOptions = []
            this.api.cmdb.classificationTable({
                id: this.classificationValue
            }).then(response => {
                this.tableOptions = response.data
            })
        },
        // 获取搜索下啦列表
        getTableValueFunc() {
            this.api.cmdb.getTableValue({
                id: this.tableId
            }).then(response => {
                this.tableValue = response.data;
                this.resetTableData()
                this.getList()
            })
        },
        // 清空表格
        resetTableData() {
            if (!this.tableValue.fields) {
                this.tableData = {};
                return false;
            } 
            for (var fieldsValue of this.tableValue.fields) {
                this.tableData[fieldsValue.name] = ''
                if (fieldsValue.required) {
                    this.rules[fieldsValue.name] = [{
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    }]
                }
            }
            this.tableData = Object.assign({}, this.tableData)
        },
        // 获取表格数据
        getList() {
            this.listLoading = true
            if (this.tableId !== '') {
                this.listQuery.table_id = this.tableId
            }
            this.api.cmdb.dataList(this.listQuery).then(response => {
                this.dataList = []
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
                for (var v of this.list) {
                    v.value.id = v.id
                    this.dataList.push(v.value)
                }
            })
        },
        // 页码切换
        currentPageChange() {
            this.getList();
        },
        handleFilter() {
            this.listQuery.page = 1
            this.getList()
        },
        handleCreate() {
            /*
              1. 清空表单数据
              2. 改变弹窗的状态，新建create或者更新update
              3. 清空验证信息
            */
            this.resetTableData()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        // 触发创建请求的。
        createDataFunc() {
            this.$refs['dataForm'].validate((valid) => { // 验证表单信息
                if (valid) {
                    // 发送请求
                    this.api.cmdb.createData({
                        table: this.tableId,
                        value: this.tableData
                    }).then(() => {
                        this.getList()
                        this.dialogFormVisible = false
                        this.$notify({
                            title: '成功',
                            message: '创建成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleUpdate(row) {
            this.tableData = JSON.parse(JSON.stringify(row)) // 将当前行数据，赋值给表单字段
            this.dialogStatus = 'update' // 改变弹窗状态
            this.dialogFormVisible = true // 弹窗开关
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate() // 清空验证信息
            })
        },
        updateDataFunc() {
            this.$refs['dataForm'].validate((valid) => { // 验证表单字段
                if (valid) {
                    // start 参数处理
                    var jsonParams = {
                        data_id: this.tableData.id,
                        table: this.tableId
                    }

                    delete this.tableData.id
                    jsonParams.value = this.tableData
                    // end 参数处理
                    this.api.cmdb.updateData(jsonParams).then(() => { // 发送请求
                        this.getList() // 获取列表
                        this.dialogFormVisible = false // 弹窗开关
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleDelete(row, index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.api.cmdb.deleteData({
                    'data_id': row.id
                }).then(() => {
                    this.getList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.data-container {
    .no-data {
        text-align: center;
        font-size: 20px;
        padding-top: 30px;
        padding-bottom: 30px
    }
}
</style>
