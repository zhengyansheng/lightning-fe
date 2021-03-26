<template>
    <div class="appkey-manage">
        <el-button style="float:right;" type="primary" plain size="small" @click="addAppkey">添加</el-button>
        <el-table :data="tableData" v-loading="loading" stripe tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="en_name" label="英文" min-width="100"></el-table-column>
            <el-table-column prop="cn_name" label="中文" min-width="120"></el-table-column>
            <el-table-column prop="platform" label="平台" min-width="60"></el-table-column>
            <el-table-column prop="access_key_id" label="密钥 - KeyId" min-width="200"></el-table-column>
            <el-table-column prop="secret_key_id" label="密钥 - KeySecret" min-width="200"></el-table-column>
            <el-table-column prop="root_id" label="主账号ID" min-width="100"></el-table-column>
            <el-table-column label="操作" fixed="right" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <AddAppkey :isShow.sync="showAddDia" />
    </div>
</template>
<script>
    import AddAppkey from './AddAppkey'
    export default {
        name: '',
        components: {
            AddAppkey
        },
        props: {
            nodes: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                currentNode: {},
                tableData: [],
                loading: false,
                showAddDia: false
            }
        },
        watch: {
            nodes(newVal) {
                if (newVal) {
                    this.currentNode = Object.assign({}, newVal)
                    this.getTableData();
                }
            }
        },
        created() {
            this.currentNode = Object.assign({}, this.nodes)
            if (Object.keys(this.currentNode).length) {
                this.getTableData();
            }
        },
        methods: {
            addAppkey() {
                this.showAddDia = true
            },
            getTableData() {
                this.loading = true;
                this.api.appkey.fetchMultiCloudAccount().then(res => {
                    this.tableData = res.data
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            },
            deleteData(row) {
                let id = row.id;
                if (!id) return false
                this.$confirm('是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.appkey.deleteMultiCloudAccount(id).then(res => {
                        if (res.code !== 0) {
                            this.$message.error(res.message);
                            return false;
                        }
                        this.$message.success('删除成功');
                        this.getTableData()
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');          
                });
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
