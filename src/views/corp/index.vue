<template>
    <div class="framework-container">
        <div class="list-main">
            <OrginationTree @handleNodeClick="handleNodeClick" />
            <div class="table-container">
                <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="date_joined" label="加入时间" width="170"></el-table-column>
                    <el-table-column prop="last_login" label="最后一次登陆时间" width="170"></el-table-column>
                </el-table>
                <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import OrginationTree from '@components/corp/OrginationTree.vue'
    export default {
        name: '',
        data() {
            return {
                currentNode: {},
                tableData: [],
                loading: false,
                total: 0,
                params: {
                    page: 1,
                    page_size: 10
                }
            }
        },
        components: {
            OrginationTree
        },
        created() {
        },
        methods: {
            getTableData() {
                let id = this.currentNode.id;
                this.api.corp.fetchOrganizationsUserTable(id, this.params).then(res => {
                    console.log(res);
                    this.tableData = res.data
                    this.total = res.data.count
                })
            },
            handleNodeClick(data) {
                this.currentNode = data;
                this.getTableData()
            },
            currentPageChange() {
                this.getTableData()
            }
        }
    }
</script>
<style lang="scss" scoped>
.framework-container {
    .list-main {
        overflow: hidden;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        .table-container {
            width: calc( 100% - 320px );
            background-color: #fff;
            height: 100%;
            padding: 12px;
        }
    }
}
</style>
