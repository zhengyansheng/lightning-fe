<template>
<el-dialog :title="title" :visible="isShow" width="800px" @close="closeDia">
    <el-input v-model="params.search" placeholder="请输入关键字" style="width:200px" size="small" @keyup.enter.native="getTableData"></el-input>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" fixed="left" align="center"></el-table-column>
        <el-table-column prop="hostname" label="主机名" min-width="200"></el-table-column>
        <el-table-column prop="private_ip" label="私有IP" width="170"></el-table-column>
    </el-table>
    <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
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
        }
    },
    data() {
        return {
            title: '节点关联资源',
            tableData: [],
            multipleSelection: [],
            total: 0,
            params: {
                page: 1,
                page_size: 8,
                search: ''
            }
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.getTableData();
            }
        }
    },
    created() {},
    methods: {
        closeDia() {
            this.multipleSelection = [];
            this.$emit('update:isShow', false);
        },
        getTableData() {
            this.api.serviceTree.fetchCmdbInstances(this.params).then(res => {
                this.total = res.data.count
                this.tableData = res.data.results;
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        confirmAdd() {
            if (!this.multipleSelection.length) {
                this.$message.error('请选择关联数据');
                return false
            }
            const data = [];
            this.multipleSelection.forEach(v => {
                data.push(v.id)
            })
            this.$emit('handleSelection', data);
            this.closeDia();
        },
        currentPageChange() {
            this.getTableData()
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
    padding-top: 5px;
}
</style>
