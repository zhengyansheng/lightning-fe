<template>
    <div class="assets-center-container">
        <div class="assets-center-operate">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="主类型">
                    <el-select v-model="formInline.pid" @change="getSecondList" clearable>
                        <el-option v-for="item in mainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子类型">
                    <el-select v-model="formInline.table_classify_id" @change="getTabeList" clearable>
                        <el-option v-for="item in secondList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formInline.search" placeholder="" @keyup.enter.native="searchData"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchData">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="small" plain @click="addNewData">新增</el-button>
        </div>
        <div class="meta"></div>
        <div class="assets-center-container">
            <template v-if="tableColumns.length">
                <el-table :data="tableList" border style="width: 100%;">
                    <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
                    <el-table-column
                        v-for="(item, index) in tableColumns"
                        v-bind="item" :key="index" :label="item.label" :prop="item.props" >
                        <template slot-scope="scope">
                            <span>{{ scope.row[item.props] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="160">
                        <template slot-scope="scope">
                            <el-button plain type="primary" size="mini" @click="editTableData(scope.row)">编辑</el-button>
                            <el-button plain type="danger" size="mini" @click="deleteData(scope.row.id, scope.$index, tableList)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </template>
            <div v-else-if="noSelect" class="no-data">请选择主类型和子类型，来加载数据</div>
            <div v-else class="no-data">暂无数据</div>
        </div>
        <AddTableData :isShow.sync="showAddTableData" :fields="tableColumns" :table_classify_id="formInline.table_classify_id" />
        <EditTableData :isShow.sync="showEditDia" :fields="tableColumns" :table_classify_id="formInline.table_classify_id" :rowData="rowData" />
    </div>
</template>
<script>
    import AddTableData from '@components/datacenter/assetsCenter/AddTableData'
    import EditTableData from '@components/datacenter/assetsCenter/EditTableData'
    export default {
        name: '',
        components: {
            AddTableData,
            EditTableData
        },
        data() {
            return {
                formInline: {
                    pid: '',
                    table_classify_id: '',
                    search: ''
                },
                tableObj: {},
                tableColumns: [],
                tableList: [],
                mainList: [],
                secondList: [],
                showAddTableData: false,
                showEditDia: false,
                rowData: {},
                noSelect: true,
                total: 0,
                currentPage: 1
            }
        },
        created() {
            this.getMainList();
        },
        methods: {
            // 获取主列表
            getMainList() {
                this.api.assetscenter.fetchAssetsMainList().then(res => {
                    this.mainList = res.results;
                })
            },
            // 获取子列表
            getSecondList(val) {
                this.formInline.table_classify_id = '';
                const params = { pid: val }
                this.api.assetscenter.fetchAssetsSecondList(params).then(res => {
                    this.secondList = res.data.results
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.searchData()
            },
            searchData() {
                if (this.formInline.table_classify_id === '') {
                    this.$message.error('请选择类型')
                    return false;
                }
                const params = {
                    table_classify_id: this.formInline.table_classify_id,
                    search: this.formInline.search,
                    page: this.currentPage
                }
                this.api.assetscenter.fetchAssetsTableList(params).then(res => {
                    if (res.code === -1) {
                        this.$message.error(res.message)
                    } else {
                        this.tableObj = res.results;
                        this.total = res.count;
                        this.formatTableData(this.tableObj)
                    }
                    this.noSelect = false
                })
            },
            // 获取table列表
            getTabeList(val) {
                if (!val) return false;
                const params = { table_classify_id: val }
                this.api.assetscenter.fetchAssetsTableList(params).then(res => {
                    if (res.code === -1) {
                        this.$message.error(res.message)
                    } else {
                        this.tableObj = res.results;
                        this.total = res.count;
                        this.formatTableData(this.tableObj)
                    }
                    this.noSelect = false
                })
            },
            formatTableData(tableObj) {
                const fields = tableObj ? tableObj.fields : {};
                let theadList = [];
                for (const key in fields) {
                    theadList.push({
                        props: key,
                        label: tableObj.fields[key]['name'],
                        order: tableObj.fields[key]['order']
                    })
                }
                theadList.sort((a, b) => a.order - b.order)
                // 规则校验
                const rules = tableObj ? tableObj.rules : {};
                for (const key in rules) {
                    theadList = theadList.map(item => {
                        if (item.props === key) {
                            item = { ...item, ...rules[key] }
                        }
                        return item
                    })
                }
                console.log('theadList', theadList);
                this.tableColumns = theadList;

                const data = tableObj ? tableObj.data : [];
                this.tableList = data.map(item => {
                    const obj = { ...item, ...item.data }
                    return obj
                })
            },
            addNewData() {
                if (this.formInline.table_classify_id === '') {
                    this.$message.error('请选择类型')
                    return false;
                }
                this.showAddTableData = true;
            },
            deleteData(id, index, tableList) {
                this.$confirm('是否确认删除当前行?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.assetscenter.deleteTableData(id).then(res => {
                        if (res.code === 0) {
                            this.$message.success('删除成功')
                            tableList.splice(index, 1);
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }).catch(() => {});
            },
            editTableData(row) {
                console.log('row', row);
                this.showEditDia = true;
                this.rowData = Object.assign({}, row)
            }
        }
    }
</script>
<style lang="scss" scoped>
.assets-center-container {
    border-radius: 3px;
    transition: .2s;
    background-color: #fff;
    .assets-center-operate {
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
    /deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }
    .meta {
        background-color: #fafafa;
        border-top: 1px solid #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height .2s;
    }
    .assets-center-container {
        padding: 24px;
        box-sizing: border-box;
    }
    /deep/ .el-pagination {
        margin-top: 10px;
        text-align: center;
    }
}

</style>
