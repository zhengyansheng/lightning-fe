<template>
<el-dialog title="绑定CMDB" :visible.sync="isShow" @close="closeDia">
    <el-form :model="cmdbForm" label-width="100px">
        <el-form-item label="资产分类">
            <el-select v-model="cmdbForm.classify" placeholder="请选择资产分类" style="width: 100%" @change="getClassifyTables">
                <el-option v-for="item in classifyOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="资产模型">
            <el-select v-model="cmdbForm.table" placeholder="请选择资产模型" style="width: 100%" @change="getTableData">
                <el-option v-for="item in tableOptions" :key="item.id" :label="item.alias" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="资产列表">
            <el-table v-if="tableData.length !== 0" ref="multipleTable" :data="tableData" border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column v-for="(tableItem, tableIndex) in tableDetails.fields" :key="tableIndex" :prop="tableItem.name" :label="tableItem.alias" />
            </el-table>
            <div v-else style="border-radius: 4px; border: 1px solid #ddd; height: 100px; line-height: 100px; text-align: center; color: #999; font-size: 25px;">
                暂无数据
            </div>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia">取 消</el-button>
        <el-button type="primary" @click="closeDia">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    name: '',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default() {
                return {}
            }
        },
        currentNode: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            cmdbForm: {},
            classifyOptions: [],
            tableOptions: [],
            tableDetails: {},
            tableData: []
        }
    },
    created() {
        // this.getClassificationList();
    },
    methods: {
        // 获取cmdb资产分类列表
        getClassificationList() {
            // 获取cmdb资产分类列表
            this.api.cmdb.getClassificationList().then(response => {
                this.classifyOptions = response.data.list
                this.dialogCmdbVisible = true
                // 清空之前的处理
                this.cmdbForm = {}
                this.tableData = []
            })
        },
        // 获取分类对应的模型列表
        getClassifyTables() {
            this.api.cmdb.classificationTable({
                id: this.cmdbForm.classify
            }).then(response => {
                this.tableOptions = response.data
            })
        },
        getTableData() {
            this.tableData = []
            this.api.serviceTree.cmdbTableDetails({ table_id: this.cmdbForm.table }).then(response => {
                this.tableDetails = response.data
                this.api.cmdb.dataList({
                    limit: 99999,
                    table_id: this.cmdbForm.table
                }).then(response => {
                    for (var d of response.data.list) {
                        d.value.data_id = d.id
                        this.tableData.push(d.value)
                    }
                })
            })
        },
        handleSelectionChange(selection) {
            if (this.currentNode.id === undefined || this.currentNode.id === null) {
                this.$message({ type: 'error', message: '未选中节点' })
            } else {
                var params = {
                    service_tree: this.currentNode.id,
                    classification: this.cmdbForm.classify,
                    table: this.cmdbForm.table,
                    data: selection[selection.length - 1].data_id
                }
                this.api.serviceTree.bindCmdbData(params).then(response => {
                    console.log(response);
                })
            }
        },
        closeDia() {
            this.$emit('update:isShow', false)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
