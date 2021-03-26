<template>
    <el-dialog :title="title" :visible="isShow" width="450px" @close="closeDia">
        <div class="tags-container">
            <el-tag
                :key="index"
                v-for="(item, index) in dynamicTags"
                closable
                size="small"
                :disable-transitions="false"
                @close="deleteNodesTag(item)">
                {{item.key}}: {{item.value}}
            </el-tag>
        </div>
        <div class="key-value">
            <label for="">键</label>
            <el-input v-model="key" size="small" />
            <label for="">值</label>
            <el-input v-model="value" size="small" />
            <el-button size="small" @click="confirmAddTag">确认</el-button>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="closeDia">确 定</el-button>
        </span> -->
    </el-dialog>
</template>
<script>
    export default {
        name: '',
        props: {
            isShow: {
                type: Boolean
            },
            nodeId: {
                type: Number
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.getTagList(this.nodeId);
                    this.currentNodeId = this.nodeId;
                }
            }
        },
        data() {
            return {
                title: '编辑标签',
                dynamicTags: [],
                key: '',
                value: '',
                currentNodeId: ''
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.$emit('update:isShow', false)
            },
            confirmAddTag() {
                let params = {
                    node: this.currentNodeId,
                    key: this.key,
                    value: this.value
                }
                this.api.serviceTree.addNodesTag(params).then(res => {
                    this.key=''
                    this.value=''
                    this.getTagList(this.currentNodeId)
                })
            },
            getTagList(id) {
                this.api.serviceTree.fetchNodesTag(id).then(res => {
                    this.dynamicTags = res.data.tag;
                })
            },
            deleteNodesTag(tag) {
                this.api.serviceTree.deleteNodesTag(tag.id).then(res => {
                    this.$message.success('删除成功')
                    this.getTagList(this.currentNodeId)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.tags-container {
    width: 100%;
    height: 150px;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 15px;
}
.key-value {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    label {
        // margin-right: 10px;
    }
    .el-input {
        width: 100px;
        margin: 0 10px;
    }
}
</style>
