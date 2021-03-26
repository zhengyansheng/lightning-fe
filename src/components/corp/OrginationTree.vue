<template>
    <div class="orginationTree-container">
        <el-input v-model="search" placeholder="搜索成员、部门" size="small" @keyup.enter.native="getTreeList"></el-input>
        <el-divider></el-divider>
        <el-tree ref="tree" node-key="id"
            :data="dataList"
            :filter-node-method="filterNode"
            :default-expand-all="false"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            @node-contextmenu="handleNodeClick">
            <span class="custom-tree-node" @mouseover="nodeId = node.id" slot-scope="{ node, data }">
                <span>{{ node.data.node }}</span>
                <span class="operate" @click="nodeId = node.id">
                    <el-popover placement="bottom" trigger="click" @show="nodeId = node.id" @hide="nodeId = null">
                        <ul class="optionMenu">
                            <li>
                                <el-link :underline="false" @click="addNode(node, data)">添加节点</el-link>
                            </li>
                            <li>
                                <el-link :underline="false" @click="editNode(node, data)">编辑节点</el-link>
                            </li>
                            <li>
                                <el-link :underline="false" @click="deleteNode(node, data)">删除节点</el-link>
                            </li>
                        </ul>
                        <i class="el-icon-circle-plus-outline" v-show="nodeId === node.id" slot="reference"></i>
                    </el-popover>
                </span>
            </span>
        </el-tree>
    </div>
</template>
<script>
    export default {
        name: '',
        props: ['nodeId'],
        data() {
            return {
                dataList: [],
                search: ''
            }
        },
        created() {
            this.getTreeList();
        },
        methods: {
            getTreeList() {
                this.api.corp.fetchOrganizationsList({search:this.search}).then(res => {
                    this.dataList = res.data;
                    this.$emit('handleNodeClick', this.dataList[0])
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                this.$emit('handleNodeClick', data)
            }
        }
    }
</script>
<style lang="scss" scoped>
.orginationTree-container {
    width: 300px;
    height: 100%;
    background-color: #fff;
    margin-right: 20px;
    padding: 10px;
    box-sizing: border-box;
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
}
/deep/ .el-divider--horizontal {
    margin: 10px 0;
}
</style>
