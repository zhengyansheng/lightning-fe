<template>
    <div class="assets-center-container">
        <div class="assets-center-operate">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="主类型">
                    <el-select v-model="formInline.pid" @change="getSecondList" clearable>
                        <el-option v-for="item in mainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子类型" clearable>
                    <el-select v-model="formInline.table_classify_id" @change="getTabeList">
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
        </div>
        <div class="meta"></div>
        <div class="assets-center-container">
            <template v-if="tableList.length">
                <div v-for="(items, index) in tableList" :key="index" style="margin-bottom: 20px;">
                    <el-card>
                        <div slot="header" class="clearfix" style="display:flex;align-items:center;justify-content:space-between;">
                            <span style="font-weight:bold;font-size:16px;color: #303133;">{{items.name}}</span>
                        </div>
                        <el-table :data="items.tableList" border style="width: 100%">
                            <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
                            <el-table-column
                                v-for="(item, index) in items.theadList"
                                v-bind="item" :key="index" :label="item.label" :prop="item.props" >
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.props] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button plain type="primary" size="mini" @click="checkDetailInfo(scope.row)">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </template>
            <div v-else-if="noSelect" class="no-data">请选择主类型和子类型，来加载数据</div>
            <div v-else class="no-data">暂无数据</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
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
                noSelect: true
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
                let params = {pid: val}
                this.api.assetscenter.fetchAssetsSecondList(params).then(res => {
                    this.secondList = res.data.results
                })
            },
            // 查询按钮
            searchData() {
                let params = { table_classify_id: this.formInline.table_classify_id, search: this.formInline.search }
                this.api.assetscenter.fetchSCList(params).then(res => {
                    if (res.code === -1) {
                        this.$message.error(res.message)
                    } else {
                        this.tableList = this.formatTableList(res.data)
                    }
                    this.noSelect = false
                })
            },
            // 获取table列表
            getTabeList(val) {
                if (!val) return false;
                let params = {table_classify_id: val}
                this.api.assetscenter.fetchSCList(params).then(res => {
                    if (res.code === -1) {
                        this.$message.error(res.message)
                    } else {
                        this.tableList = this.formatTableList(res.data)
                    }
                    this.noSelect = false
                })
            },
            // 格式化table数据
            formatTableData(tableObj) {
                let fields = tableObj ? tableObj.fields : {};
                let theadList = [];
                for(let key in fields) {
                    theadList.push({
                        props: key,
                        label: tableObj.fields[key]['name'],
                        order: tableObj.fields[key]['order'],
                    })
                }
                theadList.sort((a, b) => a.order - b.order)
                // 规则校验
                let rules = tableObj ? tableObj.rules : {};
                for(let key in rules) {
                    theadList = theadList.map(item => {
                        if (item.props === key) {
                            item = {...item, ...rules[key]}
                        }
                        return item
                    })
                }

                this.tableColumns = theadList;

                let data = tableObj ? tableObj.data : [];
                this.tableList = data.map(item => { 
                    let obj = {...item, ...item.data}
                    return obj
                })
            },
            formatTableList(children) {
                let allTableData = []
                children.forEach(items => {
                    let fields = items ? items.fields : {};
                    let theadList = [];
                    for(let key in fields) {
                        theadList.push({
                            props: key,
                            label: items.fields[key]['name'],
                            order: items.fields[key]['order'],
                        })
                    }
                    theadList.sort((a, b) => a.order - b.order)
                    // 规则校验
                    let rules = items ? items.rules : {};
                    for(let key in rules) {
                        theadList = theadList.map(item => {
                            if (item.props === key) {
                                item = {...item, ...rules[key]}
                            }
                            return item
                        })
                    }
                    let data = items ? items.data : [];
                    let tableList = data.map(item => { 
                        let obj = {...item, ...item.data}
                        return obj
                    })
                    let tableObj = {
                        theadList,
                        tableList,
                        name: items.classify_name,
                        id: items.classify_id
                    }
                    allTableData.push(tableObj)
                })
                return allTableData
            },
            // 查看详情
            checkDetailInfo(row) {
                this.$router.push({name: 'searchinfo', query: {id: row.id}})
            }
        }
    }
</script>
<style lang="scss" scoped>
.assets-center-container {
    // border: 1px solid #ebebeb;
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
}
</style>
