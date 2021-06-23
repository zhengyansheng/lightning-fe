<template>
    <div class="container">
        <el-button size="small" type="primary" style="margin-bottom:10px;float: right;" plain @click="setRelation">绑定</el-button>
        <el-table :data="tableData" border style="width: 100%" max-height="400">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="parent_name" label="分类名"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="alias" label="别名"></el-table-column>
            <el-table-column prop="record_log" label="日志记录">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.record_log" disabled size="mini"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="is_forbid_bind" label="禁止关联">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_forbid_bind" disabled size="mini"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="cancelData(scope.row, scope.$index, tableData)">解绑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="绑定"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="80%">
            <div style="margin-bottom:10px;">
                <el-select v-model="keyword" placeholder="请选择" size="small">
                    <el-option
                        v-for="item in selectLists"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-button plain type="primary" size="small" @click="searchData" style="margin-left: 10px;">查询</el-button>
            </div>
            <el-table :data="innerTableData" border style="width: 100%" max-height="400">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="alias" label="别名"></el-table-column>
                <el-table-column prop="record_log" label="日志记录">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.record_log" disabled size="mini"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="禁止关联｜多对多关联｜操作" fixed="right" width="250" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="forbid" size="mini"></el-switch>
                        <el-switch v-model="foreignKey" style="margin:0 10px;" size="mini"></el-switch>
                        <el-button type="primary" plain size="small" @click="editRelation(scope.row)">绑定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible=false">取 消</el-button>
                <el-button size="small" type="primary" @click="confirmSubmit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: '',
        props: {
            editData: {
                type: Array
            },
            pid: {
                type: Number
            }
        },
        data() {
            return {
                tableData: [],
                innerTableData: [],
                dialogVisible: false,
                selectLists: [],
                keyword: '',
                forbid: true,
                foreignKey: true,
            }
        },
        watch: {
            editData(newVal) {
                this.tableData = newVal
            }
        },
        created() {
            this.tableData = this.editData;
        },
        methods: {
            // 解绑
            cancelData(row, index, tableData) {
                let params = {
                    parent_table_id: this.pid,
                    child_table_id: row.id
                }
                this.api.datacenter.setUnrelation(params).then(res => {
                    if (res.code === 0) {
                        this.$message.success('解绑成功');
                        tableData.splice(index, 1);
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            setRelation() {
                this.dialogVisible=true;
                this.getSelectList()
            },
            // 提交
            confirmSubmit() {
                
            },
            getSelectList() {
                this.api.datacenter.getMainTypeList().then(res => {
                    this.selectLists = res.results;
                })
            },
            getTypeList(pid) {
                let params = {}
                if (pid) {
                    params = {
                        pid: pid,
                        is_forbid_bind: false
                    }
                }
                this.api.datacenter.getTypeList(params).then(res => {
                    if (res.code === 0) {
                        this.innerTableData = res.data.results
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            searchData() {
                this.getTypeList(this.keyword)
            },
            editRelation(row) {
                let params = {
                    parent_table_id: this.pid,
                    child_table_id: row.id,
                    is_foreign_key: this.foreignKey,
                    is_forbid_bind: this.forbid
                }
                this.api.datacenter.editRelation(params).then(res => {
                    if (res.code === 0) {
                        this.$message.success('绑定成功');
                        this.dialogVisible=false;
                        this.keyword = '';
                        this.innerTableData = [];
                        this.$emit('refresh')
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
