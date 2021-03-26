<template>
<div class="service-tree">
    <div class="list-main">
        <NavTree @handleNodeClick="handleNodeClick" @handleContextMenu="handleContextMenu" />
        <div class="table-container">
            <div class="tables">
                <el-tabs type="card" v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane name="1" label="节点详情">
                        <SectionDetail :nodes="currentNode" v-if="activeName=='1'" />
                    </el-tab-pane>
                    <el-tab-pane name="2" label="机器管理">
                        <el-tabs v-model="activeTabs" v-if="activeName=='2'">
                            <el-tab-pane label="主机信息" name="info">
                                <MachineInfo :nodes="currentNode" />
                            </el-tab-pane>
                            <el-tab-pane label="主机交付" name="paid">
                                <MachinePaid :nodes="currentNode" />
                            </el-tab-pane>
                            <el-tab-pane label="密钥管理" name="appkey">
                                <AppkeyManage :nodes="currentNode" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane name="3" label="权限管理">
                        <AuthManage :nodes="currentNode" v-if="activeName=='3'" />
                    </el-tab-pane>
                    <el-tab-pane name="4" label="作业平台">
                        <Homework :nodes="currentNode" v-if="activeName=='4'" />
                    </el-tab-pane>
                    <el-tab-pane name="5" label="配置管理"></el-tab-pane>
                    <el-tab-pane name="6" label="发布系统"></el-tab-pane>
                    <el-tab-pane name="7" label="域名管理"></el-tab-pane>
                    <el-tab-pane name="8" label="监控管理"></el-tab-pane>
                    <el-tab-pane name="9" label="流量调度"></el-tab-pane>
                    <el-tab-pane name="10" label="成本管理"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NavTree from '@components/serviceTree/NavTree.vue';
import SectionDetail from '@components/serviceTree/SectionDetail.vue';
import MachineInfo from '@components/serviceTree/MachineInfo.vue';
import AuthManage from '@components/serviceTree/AuthManage.vue';
import Homework from '@components/serviceTree/Homework.vue';
import MachinePaid from '@components/serviceTree/machineManage/MachinePaid.vue';
import AppkeyManage from '@components/serviceTree/machineManage/AppkeyManage.vue';
export default {
    name: '',
    data() {
        return {
            menuSize: 'mini',
            loading: false,
            currentNode: {},
            activeName: '1',
            activeTabs: 'info'
        }
    },
    provide() {
        return {
            serviceTree: this
        };
    },
    components: {
        NavTree,
        SectionDetail,
        MachineInfo,
        AuthManage,
        Homework,
        MachinePaid,
        AppkeyManage
    },
    created() {},
    methods: {
        handleNodeClick(data) {
            this.currentNode = data;
        },
        handleContextMenu(data) {
            this.currentNode = data;
        },
        handleTabClick(data) {
            this.activeName = data.name;
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tag {
    margin-right: 5px;
}
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
        padding: 12px 0;
        .table-header {
            height: 52px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .tables {
            padding: 0 20px 10px;
            box-sizing: border-box;
        }
    }
}
</style>
