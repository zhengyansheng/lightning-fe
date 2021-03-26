<template>
    <div class="script-manage">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" fixed="left" align="center"></el-table-column>
            <el-table-column prop="hostname" label="主机名" min-width="250"></el-table-column>
            <el-table-column prop="private_ip" label="私有IP" width="170"></el-table-column>
            <el-table-column prop="mem_total" label="内存"></el-table-column>
            <el-table-column prop="cpu_total" label="CPU"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="170"></el-table-column>
            <el-table-column prop="update_time" label="变更时间" width="170"></el-table-column>
        </el-table>
        <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                total: 0,
                params: {
                    page: 1,
                    page_size: 10
                }
            }
        },
        created() {
        },
        methods: {
            getTableData() {
                
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            currentPageChange() {
                this.getTableData()
            }
        }
    }
</script>
<style lang="scss" scoped>
.script-manage {

}
</style>
