<template>
    <div class="data-center-tablemanage">
        <div class="tablemanage-operate">
            <el-input v-model="search" size="small" prefix-icon="el-icon-search" placeholder="请输入内容" style="width: 200px; margin-left:10px;" @keyup.enter.native="fetchTableData"></el-input>
            <el-button type="primary" size="small" plain @click="editTableData('')">新增</el-button>
        </div>
        <div class="meta"></div>
        <div class="tablemanage-container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column prop="update_time" label="更新时间"></el-table-column>
                <el-table-column label="操作" fixed="right" width="160">
                    <template slot-scope="scope">
                        <el-button plain type="primary" size="mini" @click="editTableData(scope.row)">编辑</el-button>
                        <el-button plain type="danger" size="mini" @click="deleteData(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background :total="total" @current-change="currentPageChange" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
        </div>
        <AddRole :isShow.sync="isShow" :editData="editData" />
    </div>
</template>
<script>
    import AddRole from '@components/auth/AddRole'
    export default {
        name: '',
        components: {
            AddRole
        },
        data() {
            return {
                tableData: [],
                search: '',
                isShow: false,
                editData: {},
                total: 0,
                currentPage: 1
            }
        },
        created() {
            this.fetchTableData()
        },
        methods: {
            // 页码切换
            currentPageChange(val) {
                this.currentPage = val
                this.fetchTableData()
            },
            fetchTableData() {
                this.api.auth.fetchRoleList({search: this.search, page: this.currentPage}).then(res => {
                    console.log(res);
                    this.tableData = res.data.results;
                    this.total = res.data.count;
                })
            },
            editTableData(row) {
                this.editData = typeof row === 'string' ? {} : Object.assign({}, row)
                this.isShow = true;
            },
            deleteData(data) {
                this.$confirm('是否确认删除当前角色?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.auth.deleteRequestRole(data.id).then(res => {
                        if (res.code === 0) {
                            this.$message.success('删除成功')
                            this.fetchTableData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }).catch(() => {});
            },
        }
    }
</script>
<style lang="scss" scoped>
.data-center-tablemanage {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    background-color: #fff;
    .tablemanage-operate {
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .meta {
        background-color: #fafafa;
        border-top: 1px solid #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height .2s;
    }
    .tablemanage-container {
        padding: 24px;
        box-sizing: border-box;
        .type-header {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
            margin-top: 10px;
            .title {
                border-left: 2px solid #409EFF;
                padding-left: 4px;
                box-sizing: border-box;
                margin-right: 10px;
            }
        }
        .card-tablemanage {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            cursor: pointer;
            position: relative;
            height: 102px;
            .image {
                width: 100px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
                flex: 1;
                &>img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .right {
                width: calc( 100% - 110px );
                .card-title {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                .card-info {
                    .infos {
                        font-size: 12px;
                        &>span {
                            color: #606266;
                            &:first-child {
                                color: #909399;
                            }
                        }
                    }
                }
                .desc {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    white-space: nowrap;
                }
                .one-line {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
            }
            .card-buttons {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
}
</style>
