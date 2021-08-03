<template>
    <div class="data-center-tablemanage">
        <div class="tablemanage-operate">
            <el-button type="primary" size="small" plain @click="editTableData('')">新增</el-button>
        </div>
        <div class="meta"></div>
        <div class="tablemanage-container">
            <el-table :data="tableData" row-key="path" border lazy :load="loadChildrenData"
                :tree-props="{ hasChildren: 'hasChildren' }">
                <!-- <el-table-column type="index" width="50" label="序号"></el-table-column> -->
                <el-table-column show-overflow-tooltip prop="name" label="名称"></el-table-column>
                <el-table-column show-overflow-tooltip prop="path" label="路径"></el-table-column>
                <el-table-column show-overflow-tooltip prop="component" label="VUE文件路径"></el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="路由名"></el-table-column>
                <el-table-column show-overflow-tooltip label="图标">
                    <template #default="{ row }">
                    <span v-if="row.meta">
                        <vab-icon
                            v-if="row.meta.icon"
                            :icon="['fas', row.meta.icon]"
                        ></vab-icon>
                    </span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="order" label="排序"></el-table-column>
                <el-table-column show-overflow-tooltip prop="redirect" label="重定向"></el-table-column>
                <el-table-column show-overflow-tooltip label="是否固定">
                    <template #default="{ row }">
                        <span v-if="row.meta">
                            {{ row.meta.affix ? '是' : '否' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="是否隐藏">
                    <template #default="{ row }">
                        <span v-if="row.meta">
                            {{ row.meta.hidden ? '是' : '否' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="操作" width="200">
                    <template #default="{ row }">
                        <el-button type="text" @click="editTableData(row)">编辑</el-button>
                        <el-button type="text" @click="deleteData(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <MenuManagementEdit :isShow.sync="isShow" :editData="editData" />
    </div>
</template>
<script>
    import MenuManagementEdit from '@components/auth/MenuManagementEdit'
    export default {
        name: '',
        components: {
            MenuManagementEdit
        },
        data() {
            return {
                tableData: [],
                search: '',
                isShow: false,
                editData: {},
            }
        },
        created() {
            this.fetchTableData()
        },
        methods: {
            fetchTableData() {
                this.api.auth.fetchParentMenuList().then(res => {
                    console.log(res);
                    this.tableData = res.data
                    this.tableData.map(item => {
                        item['hasChildren'] = true;
                        return item
                    })
                })
            },
            loadChildrenData(tree, treeNode, resolve) {
                console.log(tree, treeNode, resolve)
                let params = {
                    pid: tree.id,
                    ordering: 'order'
                }
                this.api.auth.fetchChildrenMenuList(params).then(res => {
                    console.log(res);
                    resolve(res.data.results)
                })
            },
            editTableData(row) {
                console.log(row)
                this.editData = typeof row === 'string' ? {} : Object.assign({}, row)
                this.isShow = true;
            },
            deleteData(data) {
                this.$confirm('是否确认删除当前菜单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.auth.deleteRequestMenu(data.id).then(res => {
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
        justify-content: flex-end;
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
