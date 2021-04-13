<template>
<div class="nav-tree">
    <div class="operate-group">
        <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input> -->
        <el-input placeholder="输入关键字进行过滤" v-model="keyword" class="input-with-select" size="small" @keyup.enter.native="getServiceTreeList">
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px">
                <el-option label="节点名称" value="node"></el-option>
                <el-option label="主机信息" value="host"></el-option>
            </el-select>
        </el-input>
        <!-- <el-button type="primary" size="small" @click="addNewTopNode">新建节点</el-button> -->
    </div>
    <el-divider></el-divider>
    <el-tree ref="tree" node-key="name"
        :data="dataList"
        :filter-node-method="filterNode"
        :default-expand-all="false"
        :expand-on-click-node="true"
        :default-expanded-keys="expandedKeys"
        @node-click="handleNodeClick"
        @node-contextmenu="handleContextMenu">
        <span class="custom-tree-node" @mouseover="nodeId = node.id" slot-scope="{ node, data }">
            <span class="tree-label"><img class="tree-icon" :src="levelIcon(node.data.level)" alt="">{{ node.data.name }}</span>
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
                        <li>
                            <el-link :underline="false" @click="tagManage(node, data)">标签管理</el-link>
                        </li>
                    </ul>
                    <i class="el-icon-circle-plus-outline" v-show="nodeId === node.id" slot="reference"></i>
                </el-popover>
            </span>
        </span>
    </el-tree>
    <AddNewTreeNode :isShow.sync="isShow" :editData="editData" />
    <TagManageDia :isShow.sync="isShowTagManage" :nodeId="nodeId" />
</div>
</template>

<script>
import AddNewTreeNode from './AddNewTreeNode';
import TagManageDia from './TagManageDia';
import firstIcon from '@assets/images/first.svg'
import secondIcon from '@assets/images/second.svg'
import thirdIcon from '@assets/images/third.svg'
import forthIcon from '@assets/images/forth.svg'
import fifthIcon from '@assets/images/fifth.svg'
// let id = 1000;
export default {
    name: '',
    data() {
        return {
            firstIcon,
            secondIcon,
            thirdIcon,
            forthIcon,
            fifthIcon,
            filterText: '',
            dataList: [{
                children: [{ id: 3, label: 'Python 实战', parent: 1, level: 2 }, { id: 4, label: 'Golang 企业级实战', parent: 1, level: 2 }],
                id: 1,
                label: '51Reboot',
                level: 1,
                parent: 0
            }],
            loading: false,
            isShow: false,
            editData: null,
            nodeId: null,
            select: 'node',
            keyword: '',
            expandedKeys: [],
            isShowTagManage: false
        }
    },
    inject: ['serviceTree'],
    components: {
        AddNewTreeNode,
        TagManageDia
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    created() {
        this.getServiceTreeList();
    },
    methods: {
        levelIcon(level) {
            const obj = {
                0: this.firstIcon,
                1: this.secondIcon,
                2: this.thirdIcon,
                3: this.forthIcon,
                4: this.fifthIcon
            }
            return obj[level]
        },
        getServiceTreeList() {
            this.loading = true;
            const params = {
                node: '',
                host: ''
            };
            if (this.select === 'node') {
                params.node = this.keyword;
                params.host = '';
            } else { // host
                params.node = '';
                params.host = this.keyword;
            }
            this.api.serviceTree.fetchServiceTree(params).then(res => {
                this.dataList = res.data;
                this.$emit('handleContextMenu', this.dataList[0])
                this.expandedKeys.push(this.keyword)
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        addNewTopNode() {
            this.isShow = true;
            this.editData = {
                id: undefined,
                parent: 0,
                level: 1
            }
        },
        addNode(node, data) {
            console.log(node, data);
            this.isShow = true;
            this.editData = {
                type: 'add',
                parent: data.pk,
                remark: '',
                name: '',
                name_cn: ''
            }
            this.expandedKeys = []
            this.expandedKeys.push(data.name)
        },
        editNode(node, data) {
            this.isShow = true;
            this.editData = Object.assign({}, data)
            this.editData.type = 'edit';
            this.expandedKeys = []
            this.expandedKeys.push(node.parent.data.name)
        },
        // 删除节点
        deleteNode(node, data) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.api.serviceTree.deleteTreeNode(data.pk).then(response => {
                    if (response.code === 0) {
                        this.getServiceTreeList()
                        this.$message.success('删除成功!')
                        this.expandedKeys = []
                        this.expandedKeys.push(node.parent.data.name)
                    }
                })
            })
        },
        handleNodeClick(data) {
            this.$emit('handleNodeClick', data)
        },
        handleContextMenu(data) {
            this.$emit('handleContextMenu', data)
        },
        tagManage(row) {
            this.isShowTagManage = true;
            this.nodeId = row.data.pk
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-tree {
    width: 300px;
    height: 100%;
    background-color: #fff;
    margin-right: 20px;
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        padding-right: 8px;
        // .operate {
        //     display: none;
        // }
    }
    .show-operate {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        .operate {
            display: inline;
        }
    }
    .tree-icon {
        width: 13px;
        height: 13px;
        margin-right: 2px;
    }
}
.operate-group {
    padding: 10px 10px 0;
    box-sizing: border-box;
    .el-input {
        // width: 180px;
    }
    .el-button {
        margin-left: 15px;
    }
}
/deep/ .el-tree {
    padding: 0 10px 20px;
    box-sizing: border-box;
}
/deep/ .el-divider--horizontal {
    margin: 10px 0;
}
.optionMenu {
    li {
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        padding: 0 5px;
        color: #647787;
        &:hover {
            background: #F7F8FA;
        }
        a {
            color: #647787;
            display: block;
        }
        /deep/ .el-link {
            font-weight: 400 !important;
        }
    }
}
</style>
