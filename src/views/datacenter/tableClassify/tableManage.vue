<template>
    <div class="data-center-tablemanage">
        <div class="tablemanage-operate">
            <el-input v-model="search" prefix-icon="el-icon-search" placeholder="请输入内容" style="width: 200px; margin-left:10px;" @keyup.enter.native="fetchTableClassifyTree"></el-input>
            <el-button type="primary" plain @click="addNewType('')">新增分类</el-button>
        </div>
        <div class="meta"></div>
        <div class="tablemanage-container">
            <div v-for="(items, indexs) in mainData" :key="indexs">
                <div class="type-header">
                    <h3 class="title">{{items.name}}</h3>
                    <el-button plain type="danger" size="mini" icon="el-icon-plus" circle @click="addNewTable(items.id)"></el-button>
                    <el-button plain type="primary" size="mini" icon="el-icon-edit" circle @click="addNewType(items)"></el-button>
                    <el-button plain type="danger" size="mini" icon="el-icon-delete" circle @click="deleteTableType(items)"></el-button>
                </div>
                <el-row :gutter="20">
                    <el-col :span="8" v-for="(item, i) in items.children" :key="i">
                        <el-card :body-style="{ padding: '10px' }" style="margin-bottom:10px;" shadow="hover">
                            <div class="card-tablemanage" @click="checkDetails(item.id)">
                                <div class="image"><img :src="item.icon"></div>
                                <div class="right">
                                    <p class="card-title">{{item.name}}</p>
                                    <div class="card-info one-line">
                                        <div class="infos"><span>别名: </span><span>{{item.alias}}</span></div>
                                        <div class="infos"><span>创建时间: </span><span>{{item.create_time}}</span></div>
                                    </div>
                                    <div class="card-info">
                                        <div class="infos desc"><span>描述: </span><span>{{item.remark}}</span></div>
                                    </div>
                                </div>
                                <div class="card-buttons">
                                    <el-button plain type="primary" size="mini" icon="el-icon-edit" circle @click.stop="editCard(item.id)"></el-button>
                                    <el-button plain type="danger" size="mini" icon="el-icon-delete" circle @click.stop="deleteCard(item.id)"></el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <AddNewTableClassify :isShow.sync="isShowAddTable" :pid="tablePid" />
        <AddNewTableType :isShow.sync="isShowAddType" :editData="editTypeData" />
        <EditCard :isShow.sync="isShowEditCard" :pid="pidForCardData" />
    </div>
</template>
<script>
    import AddNewTableClassify from '@components/datacenter/AddNewTableClassify'
    import AddNewTableType from '@components/datacenter/AddNewTableType'
    import EditCard from '@components/datacenter/EditCard'
    export default {
        name: '',
        components: {
            AddNewTableClassify,
            AddNewTableType,
            EditCard
        },
        data() {
            return {
                search: '',
                mainData: [],
                isShowAddTable: false,
                isShowAddType: false,
                tablePid: 0,
                editTypeData: {},
                isShowEditCard: false,
                pidForCardData: 0
            }
        },
        created() {
            this.fetchTableClassifyTree()
        },
        methods: {
            fetchTableClassifyTree() {
                this.api.datacenter.fetchTableClassifyTree({search: this.search}).then(res => {
                    console.log(res);
                    this.mainData = res.data
                })
            },
            addNewTable(pid) {
                this.isShowAddTable = true
                if (typeof pid === 'number') {
                    this.tablePid = pid;
                }
            },
            addNewType(data) {
                this.isShowAddType = true
                if (Object.keys(data).length) this.editTypeData = Object.assign({}, data);
            },
            deleteTableType(data) {
                this.$confirm('是否确认删除当前分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.datacenter.deleteTableClassify(data.id).then(res => {
                        if (res.code === 0) {
                            this.$message.success('删除成功')
                            this.fetchTableClassifyTree()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }).catch(() => {});
                
            },
            editCard(data) {
                this.isShowEditCard = true
                this.pidForCardData = data
            },
            deleteCard(data) {
                this.$confirm('是否确认删除当前卡片?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.datacenter.deleteTableClassify(data).then(res => {
                        if (res.code === 0) {
                            this.$message.success('删除成功')
                            this.fetchTableClassifyTree()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }).catch(() => {});
            },
            checkDetails(data) {
                this.$router.push({name: 'tableinfo', query: {pid: data}})
            }
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
