<template>
    <div class="container">
        <div v-for="(items, index) in tableData" :key="index">
            <div class="table-head">
                <span>{{items.table_name}}</span>
                <el-button plain type="primary" size="mini" @click="openRelationDia(items.table_id)">绑定</el-button>
            </div>
            <el-table :data="items.tableList" border style="width: 100%">
                <el-table-column
                    v-for="(item, i) in items.theadList"
                    v-bind="item" :key="i" :label="item.label" :prop="item.props" >
                    <template slot-scope="scope">
                        <span>{{ scope.row[item.props] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button plain type="danger" size="mini" @click="cancelBD(scope.row.id, scope.$index, items.tableList)">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-divider v-if="index+1 !== tableData.length"></el-divider>
        </div>

        <el-dialog
            title="绑定"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="80%">
            <div style="margin-bottom:10px;">
                <el-input v-model="search" size="small" style="width: 180px;" @keyup.enter.native="searchData" />
                <el-button plain type="primary" size="small" @click="searchData" style="margin-left: 10px;">查询</el-button>
            </div>

            <el-table :data="innerTableData" border style="width: 100%" v-if="innerTableColumns.length">
                <el-table-column
                    v-for="(item, index) in innerTableColumns"
                    v-bind="item" :key="index" :label="item.label" :prop="item.props" >
                    <template slot-scope="scope">
                        <span>{{ scope.row[item.props] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button plain type="primary" size="mini" @click="confirmSetRelationSubmit(scope.row.id)">绑定</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: '',
        props: ['parent_asset_id'],
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                search: '',
                selectLists: [],
                innerTableColumns: [],
                innerTableData: [],
                currentTableId: '',
            }
        },
        created() {
            this.fetchBDRelationList()
        },
        methods: {
            fetchBDRelationList() {
                if (!this.parent_asset_id) return false;
                this.api.assetscenter.fetchBDRelationList(this.parent_asset_id).then(res => {
                    console.log('res', res.data.children);
                    if (res.code === 0) {
                        this.tableData = this.formatTableList(res.data.children);
                    } else {
                        this.$message.error(res.message)
                    }
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
                        table_name: items.table_name,
                        table_id: items.table_id
                    }
                    allTableData.push(tableObj)
                })
                return allTableData
            },
            cancelBD(id, index, tableData) {
                let params = {
                    parent_asset_id: this.parent_asset_id,    // 数据的 id
                    child_asset_id: id     // 绑定页面数据的id 
                }
                this.api.datacenter.cancelBDRelation(params).then(res => {
                    if (res.code === 0) {
                        this.$message.success('解绑成功');
                        tableData.splice(index, 1);
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            openRelationDia(tableId) {
                this.dialogVisible = true;
                this.currentTableId = tableId;
                this.searchData()
            },
            searchData() {
                let params = {
                    table_classify_id: this.currentTableId,
                    search: this.search
                }
                this.api.assetscenter.fetchNeedBDRelationList(params).then(res => {
                    console.log('res', res.results);
                    if (res.code === -1) {
                        this.$message.error(res.message)
                    } else {
                        this.tableData = this.formatInnerTableData(res.results);
                    }
                })
            },
            formatInnerTableData(tableObj) {
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

                this.innerTableColumns = theadList;

                let data = tableObj ? tableObj.data : [];
                this.innerTableData = data.map(item => { 
                    let obj = {...item, ...item.data}
                    return obj
                })
            },
            confirmSetRelationSubmit(id) {
                let params = {
                    parent_asset_id: this.currentTableId,    // 数据的 id
                    child_asset_id: id     // 绑定页面数据的id 
                }
                this.api.assetscenter.setBDRelation(params).then(res => {
                    if (res.code === 0) {
                        this.$message.success('绑定成功');
                        this.dialogVisible = false;
                        this.fetchBDRelationList();
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.table-head {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
